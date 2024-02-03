const { version } = require("@root/package.json");


const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "APIs",
    version,
  },
  servers: [
    {
      url: `http://localhost:4000/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
