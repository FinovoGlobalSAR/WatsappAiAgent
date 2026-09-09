module.exports = {
  name: '003_create_email_verification_otps_table',

  async up(connection) {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS email_verification_otps (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        otp_hash VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL,
        attempts INT UNSIGNED NOT NULL DEFAULT 0,
        max_attempts INT UNSIGNED NOT NULL DEFAULT 5,
        consumed_at DATETIME NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_email_verification_otps_user_id (user_id),
        KEY idx_email_verification_otps_expires_at (expires_at),
        CONSTRAINT fk_email_verification_otps_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
          ON UPDATE RESTRICT,
        CONSTRAINT chk_email_verification_otps_attempts
          CHECK (attempts <= max_attempts)
      ) ENGINE=InnoDB
    `);
  },

  async down(connection) {
    await connection.query('DROP TABLE IF EXISTS email_verification_otps');
  }
};
