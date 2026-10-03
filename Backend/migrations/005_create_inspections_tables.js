export default {
  name: '005_create_inspections_tables',

  async up(connection) {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inspections (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        image_path VARCHAR(500) NOT NULL,
        image_width INT UNSIGNED NOT NULL,
        image_height INT UNSIGNED NOT NULL,
        total_damages INT UNSIGNED NOT NULL DEFAULT 0,
        total_damage_area_percentage DECIMAL(6,2) NOT NULL DEFAULT 0.00,
        condition_score TINYINT UNSIGNED NOT NULL,
        condition_status VARCHAR(32) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        PRIMARY KEY (id),
        KEY idx_inspections_created_at (created_at),

        CONSTRAINT chk_inspections_condition_score
          CHECK (condition_score <= 100),

        CONSTRAINT chk_inspections_condition_status
          CHECK (
            condition_status IN (
              'excellent',
              'good',
              'fair',
              'poor'
            )
          )
      ) ENGINE=InnoDB
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS inspection_damages (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        inspection_id BIGINT UNSIGNED NOT NULL,
        damage_type VARCHAR(100) NOT NULL,
        class_id INT UNSIGNED NOT NULL,
        confidence DECIMAL(6,4) NOT NULL,
        damage_area_percentage DECIMAL(6,2) NOT NULL DEFAULT 0.00,
        severity VARCHAR(32) NOT NULL,
        severity_score INT UNSIGNED NOT NULL DEFAULT 0,
        damage_area_ratio DECIMAL(8,4) NOT NULL DEFAULT 0.0000,
        x1 DECIMAL(10,2) NOT NULL,
        y1 DECIMAL(10,2) NOT NULL,
        x2 DECIMAL(10,2) NOT NULL,
        y2 DECIMAL(10,2) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (id),

        KEY idx_inspection_damages_inspection_id (inspection_id),
        KEY idx_inspection_damages_damage_type (damage_type),

        CONSTRAINT fk_inspection_damages_inspection
          FOREIGN KEY (inspection_id)
          REFERENCES inspections(id)
          ON DELETE CASCADE
          ON UPDATE RESTRICT,

        CONSTRAINT chk_inspection_damages_confidence
          CHECK (confidence >= 0 AND confidence <= 1),

        CONSTRAINT chk_inspection_damages_area_percentage
          CHECK (damage_area_percentage >= 0),

        CONSTRAINT chk_inspection_damages_severity
          CHECK (
            severity IN (
              'light',
              'moderate',
              'severe'
            )
          )
      ) ENGINE=InnoDB
    `);
  },

  async down(connection) {
    await connection.query(
      'DROP TABLE IF EXISTS inspection_damages'
    );

    await connection.query(
      'DROP TABLE IF EXISTS inspections'
    );
  }
};