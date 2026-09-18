module.exports = {
  name: "007_create_cars_table",
  async up(c) {
    await c.query(
      `CREATE TABLE IF NOT EXISTS cars (id INT UNSIGNED NOT NULL AUTO_INCREMENT, brand_id INT UNSIGNED NOT NULL, category_id INT UNSIGNED NOT NULL, model VARCHAR(100) NOT NULL, year INT NOT NULL, registration_number VARCHAR(50) NOT NULL, color VARCHAR(50) NULL, transmission ENUM('Automatic','Manual') NOT NULL, fuel_type ENUM('Petrol','Diesel','Hybrid','Electric') NOT NULL, seats INT NOT NULL, doors INT NULL, mileage INT NULL, price_per_day DECIMAL(10,2) NOT NULL, status ENUM('Available','Rented','Maintenance') NOT NULL DEFAULT 'Available', description TEXT NULL, image VARCHAR(500) NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), UNIQUE KEY uq_cars_registration_number (registration_number), KEY idx_cars_brand_id (brand_id), KEY idx_cars_category_id (category_id), CONSTRAINT fk_cars_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_cars_category FOREIGN KEY (category_id) REFERENCES car_categories(id) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB`,
    );
  },
  async down(c) {
    await c.query("DROP TABLE IF EXISTS cars");
  },
};
