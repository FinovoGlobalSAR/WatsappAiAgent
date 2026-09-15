function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error('[SERVER ERROR]', err.stack || err);
  }
  const response = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    data: null
  };

  if (err.details) response.errors = err.details;
  if (err.retryAfterSeconds) res.set('Retry-After', String(err.retryAfterSeconds));
  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
