const { als } = require('@root/src/utils/utils');

function updateRecordPlugin(schema) {
  schema.pre('save', function (next) {
    const userId = als.getStore();
    if (userId) {
      this.created_by = userId;
    }
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const userId = als.getStore();
    if (userId) {
      this.updated_by = userId;
    }
    next();
  });

  schema.pre('updateOne', function (next) {
    const userId = als.getStore();
    if (userId) {
      this.updated_by = userId;
    }
    next();
  });

  schema.pre('updateMany', function (next) {
    const userId = als.getStore();
    if (userId) {
      this.updated_by = userId;
    }
    next();
  });
}

module.exports = updateRecordPlugin;
