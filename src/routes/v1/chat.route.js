const express = require("express");
const validate = require("@middlewares/validate");
const auth = require("@middlewares/auth");
// const systemModules = require("@config/systemModules");
// const checkPermission = require("@middlewares/checkPermission");
const chatController = require("@controllers/chat.controller");

const router = express.Router();

/** Get */
router.get("/messages", auth(), chatController.allMessages);

/** Post */
router.post(
  "/",
  auth(),
  //   checkPermission([{ module: systemModules.module, permission: "can_permission" }]),
  //   validate(chatValidation.resources),
  chatController.accessConversation,
);
/** Put */

/** Patch */

/** Delete */

module.exports = router;
