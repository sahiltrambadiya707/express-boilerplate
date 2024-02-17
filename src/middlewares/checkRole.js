const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

module.exports = (roles) => (req, _, next) => {
  const checkRole = new Promise((resolve, reject) => {
    global.models[global.env.DOMAIN].ROLE.findOne({ _id: req.user.role })
      .then((data) => {
        if (data) {
          resolve(roles.includes(data.code));
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  checkRole
    .then((res) => {
      if (res) {
        next();
      } else {
        next(new ApiError(httpStatus.FORBIDDEN, 'permission_denied'));
      }
    })
    .catch(() => next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'internal_server_error')));
};
