const nodemailer = require('nodemailer');
const env = require('../config/env');

function createTransport() {
  if (!env.email.host || !env.email.user || !env.email.password) {
    throw new Error('Email service is not configured. Set EMAIL_HOST, EMAIL_USER and EMAIL_PASSWORD.');
  }

  return nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.secure,
    auth: { user: env.email.user, pass: env.email.password }
  });
}

async function sendVerificationOtp({ to, firstName, otp, expiresInMinutes }) {
  const transport = createTransport();
  try {
    return await transport.sendMail({
      from: env.email.from || env.email.user,
      to,
      subject: 'Verify your car rental platform account',
      text: `Hello ${firstName},\n\nYour email verification OTP is ${otp}. It expires in ${expiresInMinutes} minutes.\n\nIf you did not create this account, you can ignore this email.`,
      html: `<p>Hello ${escapeHtml(firstName)},</p><p>Your email verification OTP is <strong>${otp}</strong>.</p><p>This code expires in ${expiresInMinutes} minutes.</p><p>If you did not create this account, you can ignore this email.</p>`
    });
  } catch (error) {
    console.error('[SMTP ERROR]', {
      message: error?.message,
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode
    });
    throw error;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

module.exports = { sendVerificationOtp };
