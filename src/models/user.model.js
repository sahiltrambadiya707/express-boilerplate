const mongoose = require("mongoose");
const { toJSON, updateRecord } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    email: {
      type: String,
    },
    auth0Id: {
      type: String,
    },
    password: {
      type: String,
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
      type: Date,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    registered_date: {
      type: Date,
      default: Date.now,
    },
    profile_picture: {
      type: String,
    },
    profile_picture_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.DOCUMENT,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.ROLE,
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
