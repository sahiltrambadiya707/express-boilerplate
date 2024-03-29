const connection = require('@db/connections');

module.exports = async (logger) => {
  /* Create the connections and the models */
  const models = await connection();
  if (models) {
    global.models = models;
    logger.info('Database connections and models created successfully!');
  } else {
    // If the connections and database models are not created, kill the process
    logger.error('Creating database connections and models failed!');
    process.kill(process.pid, 'SIGTERM');
  }
};
