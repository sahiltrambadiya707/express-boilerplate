const express = require('express');
const auth = require('@middlewares/auth');
const systemModules = require('@config/systemModules');
const checkPermission = require('@middlewares/checkPermission');
const moduleController = require('@controllers/module.controller');

const router = express.Router();

router.get('/accessible', auth(), moduleController.getAccessibleMenus);
router.get(
  '/',
  auth(),
  checkPermission([{ module: systemModules.MODULE, permission: 'can_select' }]),
  moduleController.getModules,
);

module.exports = router;
