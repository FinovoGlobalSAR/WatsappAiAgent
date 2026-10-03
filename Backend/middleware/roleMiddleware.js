import { AppError } from '../utils/errors.js';

const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
});

function requireRole(...roles) {
  const allowedRoles = roles.flat();

  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(401, 'Authentication required before role authorization.', 'UNAUTHORIZED')
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(403, 'Access forbidden. You do not have the required permissions.', 'FORBIDDEN')
      );
    }

    next();
  };
}

export { ROLES, requireRole };