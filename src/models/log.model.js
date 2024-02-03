const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    description: { type: String, required: true },
    message: { type: String },
    request: {
      id: String,
      body: Object,
      headers: Object,
      ip: String,
      method: String,
      path: String,
      protocol: String,
      userAgent: String,
    },
    server: {
      hostname: String,
      networkInterfaces: Array,
    },
    time: { type: Date, required: true },
  };

  const schema = new mongoose.Schema(schemaFields, {
    autoCreate: true,
  });

  schema.plugin(toJSON);
  return connection.model(collectionName, schema, collectionName);
};
