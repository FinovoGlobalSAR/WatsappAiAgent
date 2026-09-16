const fs = require("fs/promises");
const path = require("path");
const pool = require("../config/db");
const DIR = __dirname;
const TABLE = "schema_migrations";
async function loadMigrations() {
  const files = (await fs.readdir(DIR))
    .filter((f) => /^\d+_.+\.js$/.test(f))
    .sort();
  return files.map((f) => require(path.join(DIR, f)));
}
async function migrateUp() {
  const c = await pool.getConnection();
  try {
    await c.query(
      `CREATE TABLE IF NOT EXISTS ${TABLE} (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL,applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(id),UNIQUE KEY uq_schema_migrations_name(name)) ENGINE=InnoDB`,
    );
    const [r] = await c.query(`SELECT name FROM ${TABLE}`);
    const applied = new Set(r.map((x) => x.name));
    for (const m of await loadMigrations()) {
      if (applied.has(m.name)) continue;
      await c.beginTransaction();
      try {
        await m.up(c);
        await c.query(`INSERT INTO ${TABLE} (name) VALUES (?)`, [m.name]);
        await c.commit();
        console.log(`Applied migration: ${m.name}`);
      } catch (e) {
        await c.rollback();
        throw e;
      }
    }
  } finally {
    c.release();
  }
}
async function migrateDown() {
  const c = await pool.getConnection();
  try {
    const [r] = await c.query(
      `SELECT name FROM ${TABLE} WHERE name LIKE '00%' ORDER BY id DESC`,
    );
    if (!r.length) {
      console.log("No CRUD migration to roll back.");
      return;
    }
    const migrations = await loadMigrations();
    const m = migrations.find((x) => x.name === r[0].name);
    if (!m) throw new Error(`Migration source missing: ${r[0].name}`);
    await c.beginTransaction();
    try {
      await m.down(c);
      await c.query(`DELETE FROM ${TABLE} WHERE name=?`, [m.name]);
      await c.commit();
      console.log(`Rolled back migration: ${m.name}`);
    } catch (e) {
      await c.rollback();
      throw e;
    }
  } finally {
    c.release();
  }
}
if (require.main === module) {
  const cmd = process.argv[2];
  (cmd === "up" ? migrateUp : migrateDown)()
    .catch((e) => {
      console.error(e);
      process.exitCode = 1;
    })
    .finally(() => pool.end());
}
module.exports = { migrateUp, migrateDown };
