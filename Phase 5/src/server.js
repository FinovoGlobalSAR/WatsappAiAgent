require('dotenv').config();

const app = require('./app');

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
