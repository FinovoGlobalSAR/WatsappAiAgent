module.exports = {
  name: "008_add_weekly_monthly_prices_to_cars",

  async up(c) {
    await c.query(`
      ALTER TABLE cars
        ADD COLUMN price_per_week DECIMAL(10,2) NULL
        AFTER price_per_day,

        ADD COLUMN price_per_month DECIMAL(10,2) NULL
        AFTER price_per_week
    `);

    await c.query(`
      UPDATE cars
      SET
        price_per_week = ROUND(price_per_day * 6, 2),
        price_per_month = ROUND(price_per_day * 22, 2)
      WHERE
        price_per_week IS NULL
        OR price_per_month IS NULL
    `);

    await c.query(`
      ALTER TABLE cars
        MODIFY COLUMN price_per_week
        DECIMAL(10,2) NOT NULL,

        MODIFY COLUMN price_per_month
        DECIMAL(10,2) NOT NULL
    `);
  },

  async down(c) {
    await c.query(`
      ALTER TABLE cars
        DROP COLUMN price_per_month,
        DROP COLUMN price_per_week
    `);
  },
};
