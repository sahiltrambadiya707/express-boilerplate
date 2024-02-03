const express = require('express');
const auth = require('@middlewares/auth');
const authController = require('@controllers/auth0.controller');

const router = express.Router();

/** Get */
router.get('/login', authController.login);
router.get('/auth0user', auth(), authController.retrieveAuth0UserData);
router.get('/retrieve/login_prompt', authController.getLoginPageUrl);

/** Post */
router.post('/logout', auth(), authController.logout);
router.post('/authorize', authController.nativeTokenExchange);

/** Put */

/** Patch */

/** Delete */

module.exports = router;
