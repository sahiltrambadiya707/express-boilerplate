const mongoose = require('mongoose');
const { toJSON, updateRecord } = require('./plugins');

module.exports = (connection, collectionName) => {
  const schemaFields = {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.USER,
      required: true,
    },
    belongs_to: {},
    is_folder: {
      type: Boolean,
      default: false,
    },
    folder_name: {
      type: String,
      required: false,
    },
    file_info: new mongoose.Schema({
      client_file_name: {
        type: String,
      },
      file_name: {
        type: String,
      },
      file_size_in_bytes: {
        type: Number,
      },
      file_type: {
        type: String,
      },
      file_path: {
        type: String,
      },
    }),
    uploaded_in_year: {
      type: Number,
      default: new Date().getFullYear(),
      required: false,
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
