module.exports = {
  name: '002_create_users_table',

  async up(connection) {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(32) NOT NULL DEFAULT 'CUSTOMER',
        email_verified_at DATETIME NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_users_email (email),
        KEY idx_users_role (role),
        KEY idx_users_status (status),
        CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'CUSTOMER')),
        CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE', 'SUSPENDED', 'DELETED'))
      ) ENGINE=InnoDB
    `);
  },

  async down(connection) {
    await connection.query('DROP TABLE IF EXISTS users');
  }
};
