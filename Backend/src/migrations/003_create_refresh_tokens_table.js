module.exports = {
  name: '004_create_refresh_tokens_table',

  async up(connection) {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL,
        revoked_at DATETIME NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_refresh_tokens_token_hash (token_hash),
        KEY idx_refresh_tokens_user_id (user_id),
        KEY idx_refresh_tokens_expires_at (expires_at),
        KEY idx_refresh_tokens_revoked_at (revoked_at),
        CONSTRAINT fk_refresh_tokens_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
          ON UPDATE RESTRICT
      ) ENGINE=InnoDB
    `);
  },

  async down(connection) {
    await connection.query('DROP TABLE IF EXISTS refresh_tokens');
  }
};
