module.exports = {
  MONGODB: {
    [global.env.DOMAIN]: {
      DATABASE: {
        [global.env.DATABASE_NAME]: {
          COLLECTION: {
            TOKEN: "tokens",
            LOG: "log",
            AUTH0: "auth0",
            MODULE: "module",
            PERMISSION: "permission",
            ROLE: "role",
            USER: "users",
            DOCUMENT: "document",
            MESSAGES: "messages",
            CONVERSATION: "conversation",
            FIELD_RESTRICT_SCHEMA: "field_restrict_schema",
          },
          NAME: global.env.MONGOOSE.DATABASE_NAME,
        },
      },
      URI: global.env.MONGOOSE.URL,
    },
  },
};
