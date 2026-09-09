const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../../src/utils/password');

test('password hashes verify and do not equal plaintext', async () => {
  const password = 'StrongPassword!123';
  const hash = await hashPassword(password);
  assert.notEqual(hash, password);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword('WrongPassword!123', hash), false);
});
