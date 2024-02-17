const express = require('express');
const validate = require('@middleware/validate');
const auth = require('@middleware/auth');
const systemModules = require('@config/systemModules');
const checkPermission = require('@middleware/checkPermission');
const userController = require('@controllers/user.controller');
const userValidation = require('@validations/user.validation');

const router = express.Router();

/** Get */
router.get(
  '/:id',
  auth(),
  checkPermission([{ module: systemModules.USER, permission: 'can_read' }]),
  validate(userValidation.retrieveUser),
  userController.retrieveUser,
);

/** Post */

/** Put */

/** Patch */
router.patch(
  '/:id',
  auth(),
  checkPermission([{ module: systemModules.module, permission: 'can_update' }]),
  validate(userValidation.updateUser),
  userController.updateUser,
);

/** Delete */

module.exports = router;
