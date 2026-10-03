const app = require('../../src/app');
const { closeDatabase } = require('../../src/config/database');

let base = `http://127.0.0.1:${process.env.PORT || 5000}`;
let server = null;

async function post(path, body) {
  const response = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return { status: response.status, body: await response.json() };
}

(async () => {
  let isRunning = false;
  try {
    const probe = await fetch(`${base}/health`, { signal: AbortSignal.timeout(1000) });
    if (probe.ok) isRunning = true;
  } catch {
    isRunning = false;
  }

  if (!isRunning) {
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const addr = server.address();
        base = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });
  }

  try {
    const healthResponse = await fetch(`${base}/health`);
    const health = { status: healthResponse.status, body: await healthResponse.json() };
    const badVerify = await post('/api/v1/auth/verify-email', { email: 'not-an-email', otp: '12' });
    const missingUser = await post('/api/v1/auth/verify-email', { email: 'phase4-missing@example.com', otp: '123456' });
    const badResend = await post('/api/v1/auth/resend-otp', { email: 'bad' });
    const missingResend = await post('/api/v1/auth/resend-otp', { email: 'phase4-missing@example.com' });
    console.log(JSON.stringify({ health, badVerify, missingUser, badResend, missingResend }, null, 2));
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await closeDatabase();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
