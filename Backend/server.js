import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadModel } from "./Ai/services/aiService.js";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import inspectionRoutes from './routes/inspectionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import errorMiddleware from './middleware/errorMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(
  express.urlencoded({
    extended: false,
    limit: '1mb'
  })
);

// Serve static frontend assets for testing
app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Car Rental Platform API is healthy',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/forgot-password.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/reset-password.html'));
});

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/inspection', inspectionRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null
  });
});

app.use(errorMiddleware);
await loadModel();
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`Car Rental Platform API listening on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close((error) => {
    if (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }

    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('SIGINT', () => shutdown('SIGINT'));