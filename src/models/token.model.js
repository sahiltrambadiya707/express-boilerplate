const mongoose = require("mongoose");
const { toJSON, updateRecord } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    auth0Id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.USER,
      required: true,
    },
    auth0: {
      token: {
        type: String,
      },
      expires: {
        type: Number,
      },
      blacklisted: {
        type: Boolean,
        default: false,
      },
    },
    local: [
      {
        token: {
          type: String,
        },
        expires: {
          type: Number,
        },
        blacklisted: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
