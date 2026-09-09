# Car Rental Platform Backend

Production-oriented backend foundation for a B2B SaaS and white-label car-rental operating platform.

## Stack

- Node.js
- Express.js
- MySQL (database phase)
- JavaScript
- MVC + Service Layer
- REST API

## Architecture

`Client → Routes → Middleware → Controller → Service → Model → MySQL`

This phase implements the project foundation plus the MySQL connection pool and reversible migration system. Authentication and business modules are not implemented yet.

## Project structure

```text
car-rental-platform/
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── migrations/
│   └── (reserved for migration tooling)
├── public/
│   ├── css/
│   └── js/
├── tests/
│   └── auth/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` if `.env` does not already exist.
4. Start development mode:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

## Health check

`GET /health`

A healthy response uses the standard API envelope:

```json
{
  "success": true,
  "message": "Car Rental Platform API is healthy",
  "data": {
    "status": "ok",
    "timestamp": "..."
  }
}
```

## Database setup (Phase 2)

1. Make sure MySQL is running.
2. Create the configured database if it does not already exist:

```sql
CREATE DATABASE car_rental_platform;
```

3. Set the MySQL values in `.env`.
4. Run all pending migrations:

```bash
npm run db:migrate
```

5. Roll back the most recently applied migration when needed:

```bash
npm run db:rollback
```

The migration runner records applied migrations in `schema_migrations` and executes each migration inside a transaction.

## Phase 2 database tables

- `users` — user identity, credentials placeholder (`password_hash`), role, verification/status fields, and timestamps.
- `email_verification_otps` — hashed OTP records, expiry, attempts, consumption, and user foreign key.
- `refresh_tokens` — hashed refresh-token records, expiry/revocation metadata, and user foreign key.

Authentication logic is intentionally not implemented in this phase.

## Current phase

Phase 2: MySQL connection pool, environment-backed database configuration, migration runner, migration tracking, and the initial users/OTP/refresh-token schema. Authentication and business modules remain deferred to later phases.

## Phase 3 — Authentication foundation

Phase 3 adds user registration and email verification without login/JWT.

### Authentication endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/verify-email`

### Registration request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "StrongPassword!123"
}
```

Registration validates and normalizes input, hashes the password with Node's built-in `crypto.scrypt`, creates the customer account and verification OTP in one transaction, then sends the OTP through the SMTP email service.

### Email configuration

Set these variables in `.env` before testing registration:

```text
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-smtp-user
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM=your-verified-sender@example.com
```

`EMAIL_FROM` is optional; when omitted, `EMAIL_USER` is used.

### Email verification request

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

OTP values are cryptographically generated, stored as scrypt hashes, expire after 10 minutes, and are marked consumed after successful verification. OTP values are never logged or returned by the API.

### Phase 3 test command

```bash
npm test
```

Phase 3 does not implement login, JWT authentication, refresh-token handling, roles middleware, resend OTP, OTP attempt limiting, or other later authentication phases.
