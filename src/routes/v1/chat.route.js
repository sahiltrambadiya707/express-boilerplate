const express = require('express');
const auth = require('@middlewares/auth');
const systemModules = require('@config/systemModules');
const checkPermission = require('@middlewares/checkPermission');
const chatController = require('@controllers/chat.controller');

const router = express.Router();

/** Get */
router.get(
  '/messages',
  auth(),
  checkPermission([{ module: systemModules.CHAT, permission: 'can_read' }]),
  chatController.allMessages,
);

/** Post */
router.post(
  '/',
  auth(),
  checkPermission([{ module: systemModules.CHAT, permission: 'can_add' }]),
  chatController.accessConversation,
);
/** Put */

/** Patch */

/** Delete */

module.exports = router;
