module.exports = {
  name: "009_create_car_images_table",

  async up(c) {
    await c.query(`
      CREATE TABLE IF NOT EXISTS car_images (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        car_id INT UNSIGNED NOT NULL,
        image_url VARCHAR(1000) NOT NULL,
        public_id VARCHAR(500) NOT NULL,
        sort_order TINYINT UNSIGNED NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_car_images_public_id (public_id),
        UNIQUE KEY uq_car_images_car_order (car_id, sort_order),
        KEY idx_car_images_car_id (car_id),
        CONSTRAINT fk_car_images_car
          FOREIGN KEY (car_id) REFERENCES cars(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB
    `);

    const [oldImages] = await c.query(`
      SELECT id, image
      FROM cars
      WHERE image IS NOT NULL AND image <> ''
    `);

    for (const car of oldImages) {
      await c.query(
        `
        INSERT INTO car_images
          (car_id, image_url, public_id, sort_order)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)
        `,
        [car.id, car.image, `legacy-local-image-${car.id}`],
      );
    }

    await c.query(`
      ALTER TABLE cars
      DROP COLUMN image
    `);
  },

  async down(c) {
    await c.query(`
      ALTER TABLE cars
      ADD COLUMN image VARCHAR(500) NULL
    `);

    const [rows] = await c.query(`
      SELECT car_id, image_url
      FROM car_images
      WHERE sort_order = 1
    `);

    for (const row of rows) {
      await c.query(`UPDATE cars SET image = ? WHERE id = ?`, [
        row.image_url,
        row.car_id,
      ]);
    }

    await c.query(`DROP TABLE IF EXISTS car_images`);
  },
};
