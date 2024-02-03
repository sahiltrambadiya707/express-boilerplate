const mongoose = require("mongoose");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: global.collections.USER }],
    last_message: {
      type: String,
    },
    date: {
      type: Number,
      default: Date.now,
    },
  };

  const schema = new mongoose.Schema(schemaFields, { autoCreate: true, strict: false });

  return connection.model(collectionName, schema, collectionName);
};
