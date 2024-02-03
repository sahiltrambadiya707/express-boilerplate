const mongoose = require("mongoose");
const { toJSON, updateRecord } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.ROLE,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.MODULE,
    },
    can_read: {
      type: Boolean,
      default: false,
    },
    can_select: {
      type: Boolean,
      default: false,
    },
    can_add: {
      type: Boolean,
      default: false,
    },
    can_update: {
      type: Boolean,
      default: false,
    },
    can_delete: {
      type: Boolean,
      default: false,
    },
    can_upload: {
      type: Boolean,
      default: false,
    },
    can_download: {
      type: Boolean,
      default: false,
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
  schema.plugin(updateRecord);
  return connection.model(collectionName, schema, collectionName);
};
