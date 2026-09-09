const { AppError } = require('../utils/errors');

const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
});

/**
 * Reusable role-based authorization middleware.
 * Accepts one or more allowed roles, either as rest params or arrays.
 * Examples:
 *   requireRole(ROLES.ADMIN)
 *   requireRole('ADMIN', 'MANAGER')
 *   requireRole(['ADMIN', 'CUSTOMER'])
 */
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

module.exports = {
  ROLES,
  requireRole
};
