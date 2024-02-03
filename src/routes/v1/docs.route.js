const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("@src/docs/swaggerDef");
const docs = require("./docs/index.doc");

const router = express.Router();

function sortByMethod(a, b) {
  const methodsOrder = ["get", "post", "put", "patch", "delete"];
  let result = methodsOrder.indexOf(a.get("method")) - methodsOrder.indexOf(b.get("method"));
  if (result === 0) {
    result = a.get("path").localeCompare(b.get("path"));
  }
  return result;
}

const specs = {
  ...swaggerDefinition,
  paths: {
    ...docs,
  },
  components: {
    schemas: {
      Success: {
        type: "object",
        properties: {
          code: {
            type: "number",
          },
          message: {
            type: "string",
          },
          payload: {
            type: "object",
            properties: {
              result: {
                type: "any",
              },
            },
          },
        },
        example: {
          code: 200,
          message: "Successfully",
          payload: {
            result: { test: "test" },
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          code: {
            type: "number",
          },
          message: {
            type: "string",
          },
          payload: {
            type: "object",
            properties: {
              error: {
                type: "any",
              },
            },
          },
        },
        example: {
          code: 400,
          message: "Error message",
          payload: {
            error: "Error description",
          },
        },
      },
    },
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const swaggerCustomOptions = {
  swaggerOptions: {
    operationsSorter: sortByMethod,
    tagsSorter: "alpha",
  },
};

router.use("/", swaggerUi.serve, swaggerUi.setup(specs, swaggerCustomOptions));

module.exports = router;
