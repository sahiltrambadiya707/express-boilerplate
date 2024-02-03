const httpStatus = require('http-status');
const { createResponseObject } = require('@utils/utils');
const { errorHandler, errorConverter } = require('@middlewares/error');
const routes = require('./routes');
const docRoutes = require('./docs.route');

module.exports = (app) => {
  // define all routes here

  app.use(['/api/v1/'], routes);
  app.use(['/api/v1/docs'], docRoutes);

  /* Catch all */
  app.all('*', (req, res) => {
    res.status(httpStatus.BAD_REQUEST).json(
      createResponseObject({
        req,
        message: 'Sorry! The request could not be processed!',
        payload: {},
        logPayload: false,
      }),
    );
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);
};
