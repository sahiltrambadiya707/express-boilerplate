const mongoose = require('mongoose');

module.exports = (connection, collectionName) => {
  const schema = new mongoose.Schema({}, { autoCreate: true, strict: false });

  return connection.model(collectionName, schema, collectionName);
};
