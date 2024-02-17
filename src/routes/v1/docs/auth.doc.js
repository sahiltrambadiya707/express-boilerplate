module.exports = {
  '/auth/authorize': {
    post: {
      tags: ['Auth'],
      summary: 'Exchange Token',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  code: {
                    type: 'number',
                    example: 200,
                  },
                  message: { type: 'string', example: 'successfully' },
                  payload: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          refresh_token: {
                            type: 'string',
                            example: 'e.eaysfjsahtgsnuighjdasuewyyh',
                          },
                          wizard_completed: {
                            type: 'boolean',
                            example: false,
                          },
                          wizard_step: {
                            type: 'number',
                            example: 1,
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
      },
    },
  },
};
