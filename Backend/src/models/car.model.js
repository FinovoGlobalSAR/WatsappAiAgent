const pool = require("../config/db");

const SELECT = `
SELECT c.id, c.brand_id AS brandId, c.category_id AS categoryId,
       c.model, c.year, c.registration_number AS registrationNumber,
       c.color, c.transmission, c.fuel_type AS fuelType, c.seats, c.doors,
       c.mileage, c.price_per_day AS pricePerDay, c.status, c.description,
       c.image, c.is_active AS isActive, c.created_at AS createdAt, c.updated_at AS updatedAt,
       b.name AS brandName, cat.name AS categoryName
FROM cars c
LEFT JOIN brands b ON b.id = c.brand_id
LEFT JOIN car_categories cat ON cat.id = c.category_id`;

async function findById(id) {
  const [rows] = await pool.execute(`${SELECT} WHERE c.id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

async function findByRegistrationNumber(registrationNumber, excludeId = null) {
  const sql = excludeId
    ? "SELECT id FROM cars WHERE registration_number = ? AND id <> ? LIMIT 1"
    : "SELECT id FROM cars WHERE registration_number = ? LIMIT 1";
  const params = excludeId
    ? [registrationNumber, excludeId]
    : [registrationNumber];
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
}

async function brandExists(id) {
  const [rows] = await pool.execute(
    "SELECT id FROM brands WHERE id = ? LIMIT 1",
    [id],
  );
  return rows.length > 0;
}

async function categoryExists(id) {
  const [rows] = await pool.execute(
    "SELECT id FROM car_categories WHERE id = ? LIMIT 1",
    [id],
  );
  return rows.length > 0;
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO cars
      (brand_id, category_id, model, year, registration_number, color, transmission,
       fuel_type, seats, doors, mileage, price_per_day, status, description, image, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.brandId,
      data.categoryId,
      data.model,
      data.year,
      data.registrationNumber,
      data.color ?? null,
      data.transmission,
      data.fuelType,
      data.seats,
      data.doors ?? null,
      data.mileage ?? null,
      data.pricePerDay,
      data.status ?? "Available",
      data.description ?? null,
      data.image ?? null,
      data.isActive ?? true,
    ],
  );
  return findById(result.insertId);
}

async function findAll(filters = {}) {
  const conditions = [];
  const params = [];
  const {
    search,
    brandId,
    categoryId,
    transmission,
    fuelType,
    status,
    isActive,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    seats,
    sortBy = "created_at",
    sortOrder = "DESC",
    limit = 100,
    offset = 0,
  } = filters;

  if (search) {
    conditions.push(
      "(c.model LIKE ? OR c.registration_number LIKE ? OR c.color LIKE ? OR c.description LIKE ?)",
    );
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  if (brandId !== undefined) {
    conditions.push("c.brand_id = ?");
    params.push(brandId);
  }
  if (categoryId !== undefined) {
    conditions.push("c.category_id = ?");
    params.push(categoryId);
  }
  if (transmission !== undefined) {
    conditions.push("c.transmission = ?");
    params.push(transmission);
  }
  if (fuelType !== undefined) {
    conditions.push("c.fuel_type = ?");
    params.push(fuelType);
  }
  if (status !== undefined) {
    conditions.push("c.status = ?");
    params.push(status);
  }
  if (isActive !== undefined) {
    conditions.push("c.is_active = ?");
    params.push(isActive);
  }
  if (minPrice !== undefined) {
    conditions.push("c.price_per_day >= ?");
    params.push(minPrice);
  }
  if (maxPrice !== undefined) {
    conditions.push("c.price_per_day <= ?");
    params.push(maxPrice);
  }
  if (minYear !== undefined) {
    conditions.push("c.year >= ?");
    params.push(minYear);
  }
  if (maxYear !== undefined) {
    conditions.push("c.year <= ?");
    params.push(maxYear);
  }
  if (seats !== undefined) {
    conditions.push("c.seats = ?");
    params.push(seats);
  }

  const allowedSort = {
    createdAt: "c.created_at",
    model: "c.model",
    year: "c.year",
    pricePerDay: "c.price_per_day",
    mileage: "c.mileage",
    seats: "c.seats",
    status: "c.status",
  };
  const sortColumn = allowedSort[sortBy] || "c.created_at";
  const order = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.execute(
    `${SELECT} ${where} ORDER BY ${sortColumn} ${order} LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)],
  );
  return rows;
}

async function count(filters = {}) {
  const rows = await findAll({ ...filters, limit: 1000000, offset: 0 });
  return rows.length;
}

async function update(id, data) {
  const map = {
    brandId: "brand_id",
    categoryId: "category_id",
    model: "model",
    year: "year",
    registrationNumber: "registration_number",
    color: "color",
    transmission: "transmission",
    fuelType: "fuel_type",
    seats: "seats",
    doors: "doors",
    mileage: "mileage",
    pricePerDay: "price_per_day",
    status: "status",
    description: "description",
    image: "image",
    isActive: "is_active",
  };
  const fields = [];
  const params = [];
  for (const [key, column] of Object.entries(map)) {
    if (data[key] !== undefined) {
      fields.push(`${column} = ?`);
      params.push(data[key]);
    }
  }
  if (!fields.length) return findById(id);
  params.push(id);
  await pool.execute(
    `UPDATE cars SET ${fields.join(", ")} WHERE id = ?`,
    params,
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute("DELETE FROM cars WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  findById,
  findByRegistrationNumber,
  brandExists,
  categoryExists,
  create,
  findAll,
  count,
  update,
  remove,
};
