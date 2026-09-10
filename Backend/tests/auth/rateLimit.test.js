const test = require('node:test');
const assert = require('node:assert/strict');
const { createRateLimiter } = require('../../src/middleware/rateLimitMiddleware');

function mockReq(email = 'user@example.com') {
  return { ip: '127.0.0.1', body: { email } };
}

function mockRes() {
  const headers = {};
  return {
    headers,
    set(name, value) {
      headers[name] = value;
    }
  };
}

test('rate limiter allows requests under the max and blocks afterwards', async () => {
  const limiter = createRateLimiter({
    windowMs: 60_000,
    max: 2,
    keyPrefix: 'test',
    message: 'Too many requests. Please try again later.'
  });

  await new Promise((resolve, reject) => {
    limiter(mockReq(), mockRes(), (err) => (err ? reject(err) : resolve()));
  });
  await new Promise((resolve, reject) => {
    limiter(mockReq(), mockRes(), (err) => (err ? reject(err) : resolve()));
  });

  const error = await new Promise((resolve) => {
    limiter(mockReq(), mockRes(), (err) => resolve(err));
  });

  assert.equal(error.statusCode, 429);
  assert.equal(error.code, 'RATE_LIMITED');
});
