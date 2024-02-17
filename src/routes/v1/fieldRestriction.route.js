const express = require('express');
const auth = require('@middlewares/auth');
const fieldRestrictionController = require('@controllers/fieldRestriction.controller');

const router = express.Router();

/** Get */
router.get(
  '/byRole/:role',
  auth(),
  // checkPermission([{ module: systemModules.module, permission: 'can_select' }]),
  fieldRestrictionController.retrieveFieldRestrictionsByRole,
);
router.get(
  '/:id',
  auth(),
  // checkPermission([{ module: systemModules.module, permission: 'can_read' }]),
  fieldRestrictionController.retrieveFieldRestrictionById,
);

/** Post */

/** Put */

/** Patch */
router.patch(
  '/:id',
  auth(),
  // checkPermission([{ module: systemModules.module, permission: 'can_update' }]),
  fieldRestrictionController.updateFieldRestriction,
);

/** Delete */

module.exports = router;
