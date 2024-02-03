const mongoose = require("mongoose");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    schema_name: {
      type: String,
    },
    schema: {
      type: Object,
    },
    include_fields: {
      tye: Object,
    },
    exclude_fields: {
      tye: Object,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.ROLE,
    },
  };

  const schema = mongoose.Schema(schemaFields, {
    timestamps: true,
    autoCreate: true,
  });

  return connection.model(collectionName, schema, collectionName);
};
