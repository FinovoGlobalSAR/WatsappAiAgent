const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"]
      }
    }
  })
);
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Serve static frontend assets for testing
app.use(express.static(path.join(__dirname, '../../Frontend')));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Car Rental Platform API is healthy',
    data: { status: 'ok', timestamp: new Date().toISOString() }
  });
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/forgot-password.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/reset-password.html'));
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', data: null });
});

app.use(errorMiddleware);

module.exports = app;
