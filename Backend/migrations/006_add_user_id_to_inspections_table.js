export default {
  name: "006_add_user_id_to_inspections_table",

  async up(connection) {
    await connection.query(`
      ALTER TABLE inspections
      ADD COLUMN user_id BIGINT UNSIGNED NULL AFTER id,
      ADD KEY idx_inspections_user_id (user_id),
      ADD CONSTRAINT fk_inspections_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
    `);
  },

  async down(connection) {
    await connection.query(`
      ALTER TABLE inspections
      DROP FOREIGN KEY fk_inspections_user,
      DROP INDEX idx_inspections_user_id,
      DROP COLUMN user_id
    `);
  },
};