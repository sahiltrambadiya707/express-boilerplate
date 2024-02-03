const express = require("express");
const validate = require("@middlewares/validate");
const traditionalAuthController = require("@controllers/traditionalAuth.controller");
const traditionalAuthValidation = require("@validations/auth.validation");

const router = express.Router();

/** Get */
router.get("/activate", validate(traditionalAuthValidation.activate), traditionalAuthController.activate);

/** Post */
router.post("/register", validate(traditionalAuthValidation.register), traditionalAuthController.register);
router.post("/register/resend", validate(traditionalAuthValidation.resend), traditionalAuthController.resend);
router.post("/login", validate(traditionalAuthValidation.login), traditionalAuthController.login);
router.post("/password/forgot", validate(traditionalAuthValidation.forgot), traditionalAuthController.forgot);
router.post("/password/reset", validate(traditionalAuthValidation.passwordReset), traditionalAuthController.passwordReset);

/** Put */

/** Patch */

/** Delete */

module.exports = router;
