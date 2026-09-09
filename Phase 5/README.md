# Car Rental Platform Backend

Production-oriented backend foundation for a B2B SaaS and white-label car-rental operating platform.

## Stack

- **Runtime**: Node.js (>=20)
- **Web Framework**: Express.js 5
- **Database**: MySQL 8+ (`mysql2` connection pool)
- **Language**: JavaScript (ES2022+ / CommonJS)
- **Architecture**: MVC + Service Layer
- **API Style**: REST API with standardized JSON envelope
- **Testing Frontend**: HTML5, CSS3, Vanilla JS (Fetch API)

## Architecture

```text
Client (Web / Mobile / React / Testing Client)
  ↓
Routes (`src/routes/*`)
  ↓
Middleware (`src/middleware/*` — Auth, Roles, Rate Limiting, Centralized Error Handling)
  ↓
Controllers (`src/controllers/*` — Thin HTTP layer, validation response formatting)
  ↓
Services (`src/services/*` — Pure business logic, OTP generation, token rotation)
  ↓
Models (`src/models/*` — Data access layer, parameterized SQL queries)
  ↓
MySQL (InnoDB with transactional safety)
```

## Project Structure

```text
car-rental-platform/
├── src/
│   ├── config/
│   │   ├── database.js          # MySQL connection pool and lifecycle
│   │   └── env.js               # Centralized environment variable validation
│   ├── models/
│   │   ├── User.js              # User identity and profile data access
│   │   ├── EmailOTP.js          # OTP storage, attempt counter, consumption
│   │   └── RefreshToken.js      # Hashed refresh tokens and revocation
│   ├── controllers/
│   │   └── authController.js    # Registration, login, verify, refresh, logout, /me
│   ├── routes/
│   │   ├── authRoutes.js        # /api/v1/auth endpoints
│   │   └── adminRoutes.js       # /api/v1/admin endpoints (Role-protected)
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT Bearer token validation (requireAuth)
│   │   ├── roleMiddleware.js    # Role-based authorization (requireRole)
│   │   ├── rateLimitMiddleware.js # Memory-backed rate limiters with HTTP headers
│   │   └── errorMiddleware.js   # Centralized error handler and standard response envelope
│   ├── services/
│   │   ├── authService.js       # Core authentication and session business logic
│   │   ├── otpService.js        # OTP issue, hashing, verification, cooldown
│   │   └── emailService.js      # Nodemailer SMTP transport abstraction
│   ├── validators/
│   │   └── authValidator.js     # Server-side schema and input validation
│   ├── utils/
│   │   ├── jwt.js               # Access & refresh token signing, verification, SHA-256 hash
│   │   ├── password.js          # Crypto scrypt password hashing and timing-safe verification
│   │   ├── otp.js               # Cryptographic 6-digit OTP generator & scrypt hashing
│   │   └── errors.js            # Custom AppError class
│   ├── app.js                   # Express application setup, security headers, static serving
│   └── server.js                # Server entry point and graceful shutdown handlers
├── public/
│   ├── css/
│   │   └── style.css            # Clean modern styles for the testing client
│   ├── js/
│   │   └── auth.js              # Vanilla JS API client with auto-refresh & page handlers
│   ├── index.html               # Testing landing page
│   ├── register.html            # Registration form
│   ├── verify.html              # 6-digit OTP verification with resend cooldown
│   ├── login.html               # Login form
│   └── dashboard.html           # Authenticated user dashboard, role tester & token rotater
├── tests/
│   └── auth/
│       ├── registration.test.js      # Registration service & duplicate handling
│       ├── registrationHttp.test.js  # Registration HTTP endpoints
│       ├── emailVerification.test.js # OTP verification service & policy
│       ├── emailVerificationHttp.test.js # OTP verification HTTP routes
│       ├── login.test.js             # Login service, credential check, status checks
│       ├── loginHttp.test.js         # Login HTTP route & error envelopes
│       ├── jwtAuth.test.js           # JWT utilities, requireAuth, token rotation
│       ├── jwtHttp.test.js           # Protected /me, /refresh, /logout HTTP
│       ├── roleAuth.test.js          # requireRole middleware unit tests
│       ├── roleHttp.test.js          # Admin role-protected HTTP endpoints
│       ├── frontendHttp.test.js      # Static frontend pages & assets serving
│       ├── validator.test.js         # Input validation test suite
│       ├── rateLimit.test.js         # Rate limiting enforcement
│       ├── otp.test.js               # Cryptographic OTP unit tests
│       ├── password.test.js          # Scrypt password hashing unit tests
│       ├── phase6-http-check.js      # Standalone Phase 6 probe
│       └── full-e2e-check.js         # Full end-to-end user lifecycle test
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup & Running

1. **Install Node.js 20+**.
2. **Install dependencies**:

```bash
npm install
```

3. **Configure Environment**:
Ensure `.env` exists (copy from `.env.example` if needed) and specify your MySQL and SMTP credentials:

```ini
PORT=5000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=car_rental_platform
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN_DAYS=7

# Email Service (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@example.com
```

4. **Run Migrations**:

```bash
npm run db:migrate
```

5. **Start the Application**:

```bash
npm start
# or for development:
npm run dev
```

The server will be running at `http://localhost:5000`.

---

## Testing Frontend Client (Phase 8)

A lightweight testing client is served directly by Express:

- **Landing Page**: `http://localhost:5000/`
- **Register**: `http://localhost:5000/register.html`
- **Verify Email**: `http://localhost:5000/verify.html`
- **Login**: `http://localhost:5000/login.html` (Includes "Forgot Password?" link)
- **Forgot Password**: `http://localhost:5000/forgot-password` (or `/forgot-password.html`)
- **Reset Password**: `http://localhost:5000/reset-password` (or `/reset-password.html`)
- **Dashboard**: `http://localhost:5000/dashboard.html`

### Features:
- Form submission with client error and success alerts.
- Automatic OTP resend cooldown timer (60s).
- Two-step password reset with OTP verification and new password setting.
- Session storage and automatic token refresh when access token expires.
- Interactive **"Test Admin Endpoint"** button to verify Role-Based Access Control.
- Interactive **"Rotate Refresh Token"** button demonstrating zero-downtime token rotation.
- **"Logout"** (single device) and **"Logout All Devices"** buttons.

---

## API Documentation

### Standard Response Envelope

All endpoints return a uniform envelope:

**Success**:
```json
{
  "success": true,
  "message": "Human-readable status message",
  "data": { ... }
}
```

**Error**:
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "errors": [
    { "field": "email", "message": "A valid email address is required." }
  ]
}
```

---

### Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new customer account | No |
| `POST` | `/api/v1/auth/verify-email` | Verify email with 6-digit OTP | No (Rate Limited) |
| `POST` | `/api/v1/auth/resend-otp` | Resend verification OTP (60s cooldown) | No (Rate Limited) |
| `POST` | `/api/v1/auth/login` | Login with email/password, issues tokens | No (Rate Limited) |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token and issue new access token | No (Rate Limited) |
| `POST` | `/api/v1/auth/forgot-password` | Request 6-digit password reset OTP | No (Rate Limited) |
| `POST` | `/api/v1/auth/verify-reset-otp` | Verify password reset OTP, returns resetToken | No (Rate Limited) |
| `POST` | `/api/v1/auth/reset-password` | Set new password, invalidates OTP & sessions | No (Rate Limited) |
| `POST` | `/api/v1/auth/logout` | Invalidate refresh token (optional `allDevices: true`) | Optional Bearer |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Bearer Token |

---

### Admin & Role-Protected Endpoints (`/api/v1/admin`)

| Method | Endpoint | Description | Auth Required | Required Role |
|---|---|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Administrative overview | Bearer Token | `ADMIN` |
| `GET` | `/api/v1/admin/users` | List registered platform users (sanitized) | Bearer Token | `ADMIN` |

---

## Security & Architecture Details

### 1. Password Security
- Passwords are encrypted using Node's native `crypto.scrypt` with a cryptographically secure 16-byte random salt.
- Password hashes and salts are never returned in API responses or logged.
- Password policy: Minimum 12 characters, requiring uppercase, lowercase, number, and special character.

### 2. One-Time Password (OTP) Security
- OTPs are cryptographically generated using `crypto.randomInt(100000, 1000000)`.
- OTP values are stored hashed with `crypto.scrypt`. Plaintext OTPs are never persisted in the database.
- OTPs expire after 10 minutes and enforce a maximum limit of 5 failed verification attempts.
- Resend is gated by a 60-second cooldown and automatically invalidates prior unconsumed OTPs.

### 3. JWT & Token Rotation (Phase 6)
- **Access Tokens**: Short-lived (15 minutes), signed with `JWT_ACCESS_SECRET` (`HS256`), containing minimal claims (`sub`, `role`, `jti`).
- **Refresh Tokens**: Long-lived (7 days), signed with `JWT_REFRESH_SECRET`, stored only as SHA-256 hashes (`refresh_tokens.token_hash`).
- **Refresh Token Rotation**: Calling `/api/v1/auth/refresh` revokes the old refresh token and issues a new pair inside a database transaction.
- **Token Reuse Detection**: If a revoked refresh token is presented, all active sessions for that user are immediately invalidated to prevent replay attacks.

### 4. Role-Based Access Control (Phase 7)
- Roles: `ADMIN` and `CUSTOMER`.
- Reusable `requireRole(...roles)` middleware:
  - Validates `req.user` (requires `requireAuth`).
  - Verifies if `req.user.role` matches one of the allowed roles.
  - Returns `403 Forbidden` (`FORBIDDEN`) if the user lacks sufficient privileges.
- Designed to be easily extensible for future roles (e.g., `FLEET_MANAGER`, `STAFF`).

---

## Automated Test Suite (Phase 9)

The project includes **66 comprehensive automated tests** written using Node.js's native test runner (`node:test`).

### Run all automated tests:

```bash
npm test
```

### Run the complete end-to-end lifecycle verification:

```bash
node tests/auth/full-e2e-check.js
```

### Tested Capabilities:
1. User registration with email normalization and input validation.
2. Duplicate email detection and rejection (`409 Conflict`).
3. Invalid registration payloads and password strength enforcement (`400 Bad Request`).
4. Cryptographic OTP generation, scrypt storage, and verification.
5. Expired OTP and invalid OTP handling with attempt limit enforcement.
6. OTP resend cooldown and invalidation of prior OTPs.
7. Login credential validation, unverified email checks, and suspended account checks.
8. JWT access token verification and `/me` profile retrieval.
9. Refresh token rotation and automatic revocation of previous tokens.
10. Refresh token reuse detection (revoking all sessions upon replay attempt).
11. Single-device and all-device logout token invalidation.
12. Role-based authorization (`requireRole`): unauthenticated (401), insufficient role (403), authorized role (200).
13. Frontend static asset delivery and HTML page rendering.
14. Memory-backed rate limiters and HTTP security headers (`Helmet`, `CORS`).

---

## Future Modules (Phase 10 — Reserved)

The following modules will be built after the authentication and authorization foundation is complete:

1. **Vehicles & Categories**
2. **Vehicle Availability Engine**
3. **Bookings & Reservations**
4. **Payments & Invoicing**
5. **Customer Management**
6. **Fleet Management**
