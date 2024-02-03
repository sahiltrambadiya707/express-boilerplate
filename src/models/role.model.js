const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      requires: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.USER,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.USER,
    },
  };

  const schema = mongoose.Schema(schemaFields, {
    timestamps: true,
    autoCreate: true,
  });

  schema.plugin(toJSON);

  return connection.model(collectionName, schema, collectionName);
};
