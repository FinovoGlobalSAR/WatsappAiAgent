const test = require('node:test');
const assert = require('node:assert/strict');
const { requireRole, ROLES } = require('../../src/middleware/roleMiddleware');
const { AppError } = require('../../src/utils/errors');

test('requireRole middleware rejects unauthenticated requests with 401 UNAUTHORIZED', async () => {
  const req = {}; // no req.user
  const middleware = requireRole(ROLES.ADMIN);

  await new Promise((resolve) => {
    middleware(req, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 401);
      assert.equal(err.code, 'UNAUTHORIZED');
      resolve();
    });
  });
});

test('requireRole middleware rejects unauthorized role with 403 FORBIDDEN', async () => {
  const req = {
    user: { id: 1, email: 'customer@example.com', role: ROLES.CUSTOMER }
  };
  const middleware = requireRole(ROLES.ADMIN);

  await new Promise((resolve) => {
    middleware(req, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 403);
      assert.equal(err.code, 'FORBIDDEN');
      resolve();
    });
  });
});

test('requireRole middleware allows authorized role and calls next without error', async () => {
  const req = {
    user: { id: 1, email: 'admin@example.com', role: ROLES.ADMIN }
  };
  const middleware = requireRole(ROLES.ADMIN);

  await new Promise((resolve, reject) => {
    middleware(req, {}, (err) => {
      if (err) return reject(err);
      assert.equal(err, undefined);
      resolve();
    });
  });
});

test('requireRole supports multiple roles in arguments or arrays', async () => {
  const adminReq = { user: { id: 1, role: 'ADMIN' } };
  const customerReq = { user: { id: 2, role: 'CUSTOMER' } };
  const guestReq = { user: { id: 3, role: 'GUEST' } };

  const multiMiddleware = requireRole('ADMIN', 'CUSTOMER');

  await new Promise((resolve, reject) => {
    multiMiddleware(adminReq, {}, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  await new Promise((resolve, reject) => {
    multiMiddleware(customerReq, {}, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  await new Promise((resolve) => {
    multiMiddleware(guestReq, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 403);
      resolve();
    });
  });
});
