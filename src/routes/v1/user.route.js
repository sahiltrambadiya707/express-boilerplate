const express = require("express");
const validate = require("@middlewares/validate");
const auth = require("@middlewares/auth");
const userController = require("@controllers/user.controller");
const userValidation = require("@validations/user.validation");

const router = express.Router();

module.exports = router;
