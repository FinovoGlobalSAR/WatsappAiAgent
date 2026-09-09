function errorMiddleware(err, req, res, next) {
  console.error(err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    data: null
  };

  if (err.details) response.errors = err.details;
  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
