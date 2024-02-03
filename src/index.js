require("dotenv").config();
require("module-alias/register");
global.env = require("@config/configuration");
const runServer = require("./app");

setTimeout(() => {
  runServer();
}, 500);
