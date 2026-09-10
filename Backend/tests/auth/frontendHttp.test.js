const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../../src/app');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('HTTP: GET / serves index.html test page', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type').includes('text/html'));
  const text = await res.text();
  assert.ok(text.includes('Car Rental Platform'));
});

test('HTTP: GET /register.html serves registration page', async () => {
  const res = await fetch(`${baseUrl}/register.html`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('Create an Account'));
  assert.ok(text.includes('registerForm'));
});

test('HTTP: GET /verify.html serves OTP verification page', async () => {
  const res = await fetch(`${baseUrl}/verify.html`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('Verify Your Email'));
  assert.ok(text.includes('verifyForm'));
});

test('HTTP: GET /login.html serves login page', async () => {
  const res = await fetch(`${baseUrl}/login.html`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('Sign In'));
  assert.ok(text.includes('loginForm'));
});

test('HTTP: GET /dashboard.html serves dashboard page', async () => {
  const res = await fetch(`${baseUrl}/dashboard.html`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('User Profile'));
  assert.ok(text.includes('testAdminBtn'));
});

test('HTTP: GET /css/style.css and /js/auth.js serve static assets', async () => {
  const cssRes = await fetch(`${baseUrl}/css/style.css`);
  assert.equal(cssRes.status, 200);
  assert.ok(cssRes.headers.get('content-type').includes('text/css'));

  const jsRes = await fetch(`${baseUrl}/js/auth.js`);
  assert.equal(jsRes.status, 200);
  assert.ok(jsRes.headers.get('content-type').includes('application/javascript') || jsRes.headers.get('content-type').includes('text/javascript'));
});
