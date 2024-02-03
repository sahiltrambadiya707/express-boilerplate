const authDoc = require('./auth.doc');
const userDoc = require('./user.doc');

module.exports = {
  ...authDoc,
  ...userDoc,
};

/**
 * APIs listing sequence 👇
 *
 * 1️⃣ Get
 * 2️⃣ Post
 * 3️⃣ Put
 * 4️⃣ Patch
 * 5️⃣ Delete
 */

/*
  $APIS_END_POINT: {
    $API_METHOD: {
      tags: ["$ROUTE_GROUP"],
      summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          type: "string",
          name: "$NAME",
          description: "$DESCRIPTION",
        },
        {
          in: "path",
          type: "string",
          name: "$NAME",
          description: "$DESCRIPTION",
        },
           {
          in: "query",
          type: "string",
          name: "filter",
          description: "search text",
        },
        {
          in: "query",
          type: "string",
          name: "limit",
        },
        {
          in: "query",
          type: "string",
          name: "page",
        },
        {
          in: "query",
          type: "string",
          name: "descending",
        },
        {
          in: "query",
          type: "string",
          name: "sortBy",
        },
      ],
      requestBody: {
        description: "$DESCRIPTION",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                $NAME: {
                  type: "$TYPE",
                },
                $OBJECT: {
                  type: "object",
                  properties: {
                    $NAME: {
                      type: "$TYPE",
                    },
                  },
                },
                $ARRAY: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      $NAME: {
                        type: "$TYPE",
                      },
                    },
                  },
                },
              },
            },
            example: {
              $NAME: "$NAME",
              $OBJECT: {
                $NAME: "$NAME",
              },
              $ARRAY: [
                {
                  $NAME: "$NAME",
                },
                {
                  $NAME: "$NAME",
                },
              ],
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            "application/json": {
              example: {
                code: 200,
                message: "success message",
                payload: {
                  result: {
                    status: "OK",
                    data: "data",
                    meta: {
                      total_found: 20,
                      total_in_response: 10,
                      current_page: 1,
                      total_pages: 2,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
*/
