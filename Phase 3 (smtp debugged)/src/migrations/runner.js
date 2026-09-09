const fs = require('fs/promises');
const path = require('path');
const { pool } = require('../config/database');

const MIGRATIONS_DIR = __dirname;
const MIGRATION_TABLE = 'schema_migrations';

async function loadMigrations() {
  const files = (await fs.readdir(MIGRATIONS_DIR))
    .filter((file) => /^\d+_.+\.js$/.test(file))
    .sort();

  const migrations = [];
  for (const file of files) {
    const migration = require(path.join(MIGRATIONS_DIR, file));
    if (!migration.name || typeof migration.up !== 'function' || typeof migration.down !== 'function') {
      throw new Error(`Invalid migration: ${file}`);
    }
    migrations.push(migration);
  }
  return migrations;
}

async function ensureMigrationTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATION_TABLE} (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_schema_migrations_name (name)
    ) ENGINE=InnoDB
  `);
}

async function getAppliedMigrations(connection) {
  const [rows] = await connection.query(
    `SELECT name FROM ${MIGRATION_TABLE} ORDER BY id ASC`
  );
  return new Set(rows.map((row) => row.name));
}

async function migrateUp() {
  const connection = await pool.getConnection();
  try {
    await ensureMigrationTable(connection);
    const migrations = await loadMigrations();
    const applied = await getAppliedMigrations(connection);

    for (const migration of migrations) {
      if (applied.has(migration.name)) continue;

      await connection.beginTransaction();
      try {
        await migration.up(connection);
        await connection.query(
          `INSERT INTO ${MIGRATION_TABLE} (name) VALUES (?)`,
          [migration.name]
        );
        await connection.commit();
        console.log(`Applied migration: ${migration.name}`);
      } catch (error) {
        await connection.rollback();
        throw new Error(`Migration failed (${migration.name}): ${error.message}`);
      }
    }
  } finally {
    connection.release();
  }
}

async function migrateDown() {
  const connection = await pool.getConnection();
  try {
    await ensureMigrationTable(connection);
    const migrations = await loadMigrations();
    const byName = new Map(migrations.map((migration) => [migration.name, migration]));
    const [rows] = await connection.query(
      `SELECT name FROM ${MIGRATION_TABLE} ORDER BY id DESC LIMIT 1`
    );

    if (rows.length === 0) {
      console.log('No migrations to roll back.');
      return;
    }

    const name = rows[0].name;
    const migration = byName.get(name);
    if (!migration) {
      throw new Error(`Applied migration is missing from source: ${name}`);
    }

    await connection.beginTransaction();
    try {
      await migration.down(connection);
      await connection.query(
        `DELETE FROM ${MIGRATION_TABLE} WHERE name = ?`,
        [name]
      );
      await connection.commit();
      console.log(`Rolled back migration: ${name}`);
    } catch (error) {
      await connection.rollback();
      throw new Error(`Rollback failed (${name}): ${error.message}`);
    }
  } finally {
    connection.release();
  }
}

async function main() {
  const command = process.argv[2];
  if (!['up', 'down'].includes(command)) {
    console.error('Usage: node src/migrations/runner.js <up|down>');
    process.exitCode = 1;
    return;
  }

  try {
    if (command === 'up') await migrateUp();
    else await migrateDown();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadMigrations, migrateUp, migrateDown };
