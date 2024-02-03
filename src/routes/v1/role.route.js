const express = require("express");
const validate = require("@middlewares/validate");
const systemModules = require("@config/systemModules");
const auth = require("@middlewares/auth");
const checkPermission = require("@middlewares/checkPermission");
const roleController = require("@controllers/role.controller");
const roleValidation = require("@validations/role.validation");

const router = express.Router();

router.get(
  "/",
  auth(),
  checkPermission([{ module: systemModules.ROLE, permission: "can_select" }]),
  roleController.getRoles,
);
router.post(
  "/",
  auth(),
  checkPermission([{ module: systemModules.ROLE, permission: "can_add" }]),
  validate(roleValidation.addRole),
  roleController.addRole,
);
router.put(
  "/:id",
  auth(),
  checkPermission([{ module: systemModules.ROLE, permission: "can_update" }]),
  validate(roleValidation.updateRole),
  roleController.updateRole,
);
router.delete(
  "/:id",
  auth(),
  checkPermission([{ module: systemModules.ROLE, permission: "can_delete" }]),
  validate(roleValidation.deleteRole),
  roleController.deleteRole,
);
router.get(
  "/:id",
  auth(),
  checkPermission([{ module: systemModules.ROLE, permission: "can_read" }]),
  validate(roleValidation.getRole),
  roleController.getRole,
);

module.exports = router;
