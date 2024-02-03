const mongoose = require("mongoose");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: global.collections.USER },
    content: { type: String, trim: true },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: global.collections.CONVERSATION },
    parent_message_id: { type: mongoose.Schema.Types.ObjectId, ref: global.collections.MESSAGES },
    parent_message: { type: String },
    is_replayed: { type: Boolean },
    is_read: { type: Boolean, default: false },
    date: {
      type: Number,
      default: Date.now,
    },
  };

  const schema = new mongoose.Schema(schemaFields, { autoCreate: true, strict: false });

  return connection.model(collectionName, schema, collectionName);
};
