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

Phase 6: JWT Authentication — `requireAuth` middleware, access token validation, `/me` profile endpoint, token rotation on `/refresh` with reuse detection, and `/logout` token revocation. Role-based authorization and frontend pages are reserved for subsequent phases.

## Phase 3 — Authentication foundation

Phase 3 adds user registration and email verification without login/JWT.

### Authentication endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/resend-otp`

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

### Resend OTP request

```json
{
  "email": "john@example.com"
}
```

### Phase 4 email verification rules

- OTP is 6 digits, generated with `crypto.randomInt`.
- OTP hashes are stored; plaintext OTPs are never persisted.
- OTP expires after 10 minutes.
- Each OTP allows 5 verification attempts.
- Resend is limited by a 60-second cooldown and invalidates unused previous OTPs.
- `POST /api/v1/auth/verify-email` is rate-limited to 10 requests / 15 minutes per IP + email.
- `POST /api/v1/auth/resend-otp` is rate-limited to 5 requests / 15 minutes per IP + email.
- Successful verification sets `users.email_verified_at` and consumes the OTP.

## Phase 5 — Login

Phase 5 implements the login endpoint, credential verification, verification/status requirements, JWT access token issuance, and secure hashed refresh token storage in MySQL.

### Login endpoint

- `POST /api/v1/auth/login`

### Login request

```json
{
  "email": "john@example.com",
  "password": "StrongPassword!123"
}
```

### Login response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "CUSTOMER",
      "emailVerified": true,
      "status": "ACTIVE",
      "createdAt": "2026-09-09T00:00:00.000Z",
      "updatedAt": "2026-09-09T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "tokenType": "Bearer",
      "expiresIn": 900
    }
  }
}
```

### Phase 5 security and business rules

- Input is validated and email is normalized to lowercase.
- Non-existent accounts and wrong passwords return generic `401 Unauthorized` (`INVALID_CREDENTIALS`) to prevent user enumeration.
- Requires verified email (`users.email_verified_at IS NOT NULL`), returning `403 Forbidden` (`EMAIL_NOT_VERIFIED`) otherwise.
- Requires active account status (`status === 'ACTIVE'`), returning `403 Forbidden` (`ACCOUNT_NOT_ACTIVE`) otherwise.
- Issues short-lived access tokens (15 minutes) signed with `JWT_ACCESS_SECRET` containing only minimal claims (`sub`, `role`).
- Issues refresh tokens signed with `JWT_REFRESH_SECRET` and stores only their SHA-256 hash in MySQL (`refresh_tokens.token_hash`). Plaintext refresh tokens and secrets are never stored.
- `POST /api/v1/auth/login` is rate-limited to 10 requests / 15 minutes per IP + email.
- `password_hash` and sensitive internal data are never exposed in API responses.

## Phase 6 — JWT Authentication

Phase 6 implements JWT access token validation middleware, the `/me` user profile endpoint, token rotation with reuse detection on `/refresh`, and token revocation on `/logout`.

### Endpoints

- `GET /api/v1/auth/me` (Protected by `requireAuth`)
- `POST /api/v1/auth/refresh` (Rate limited)
- `POST /api/v1/auth/logout` (Revokes specific refresh token and/or all user sessions)

### Phase 6 security and business rules

- **`requireAuth` Middleware**:
  - Validates `Authorization: Bearer <accessToken>` header.
  - Verifies signature, algorithm (`HS256`), and expiration.
  - Returns `401 Unauthorized` with specific error codes (`UNAUTHORIZED`, `TOKEN_EXPIRED`, `TOKEN_INVALID`).
  - Verifies account existence, verification, and active status.
  - Attaches sanitized user profile to `req.user`.
- **Token Rotation & Reuse Detection**:
  - Each refresh token contains a unique `jti` claim to guarantee cryptographic uniqueness across simultaneous requests.
  - Upon calling `POST /api/v1/auth/refresh`, the old refresh token is marked revoked and a brand new refresh token and access token are issued within a database transaction.
  - If a revoked refresh token is presented (potential token theft/replay), the server immediately revokes all active refresh tokens for that user and rejects the request.
- **Logout & Revocation**:
  - `POST /api/v1/auth/logout` revokes the provided refresh token in MySQL (`revoked_at = CURRENT_TIMESTAMP`).
  - Supports `allDevices: true` to invalidate all active refresh tokens for the user.
  - Works with Bearer authorization or standalone with `{ refreshToken }` in request body.
- `POST /api/v1/auth/refresh` is rate-limited to 30 requests / 15 minutes per IP.

### Test commands

Run the full automated test suite (including model, utility, validation, rate limiting, and HTTP integration tests):

```bash
npm test
```

Run the standalone Phase 4 verification script:

```bash
node tests/auth/phase4-http-check.js
```

Run the standalone Phase 5 login verification script:

```bash
node tests/auth/phase5-http-check.js
```

Run the standalone Phase 6 JWT authentication verification script:

```bash
node tests/auth/phase6-http-check.js
```

Phase 6 does not implement role authorization middleware (`requireRole`), admin routes, or the testing frontend.
