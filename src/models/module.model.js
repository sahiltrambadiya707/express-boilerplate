const mongoose = require("mongoose");
const { toJSON, updateRecord } = require("./plugins");

module.exports = (connection, collectionName) => {
  const schemaFields = {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    route: {
      type: String,
      trim: true,
    },
    active_on: {
      type: Array,
      default: [],
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: global.collections.MODULE,
      default: null,
    },
    is_for_admin: {
      type: Boolean,
      default: false,
    },
    sort_order: {
      type: Number,
      default: 1,
    },
    is_default: {
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

  /**
   * Check if code exists or not
   * @param {string} code - Module identifier
   * @param {ObjectId} [excludeModuleId] - The id of the module to be excluded
   * @returns {Promise<boolean>}
   */
  schema.statics.isCodeExists = async function (code, excludeModuleId) {
    const module = await this.findOne({ code, _id: { $ne: excludeModuleId } });
    return !!module;
  };

  schema.plugin(toJSON);
  schema.plugin(updateRecord);
  return connection.model(collectionName, schema, collectionName);
};
