module.exports = {
  // '/user/profile/add': {
  //   post: {
  //     tags: ['User'],
  //     summary: 'Insert user profile general information',
  //     security: [
  //       {
  //         bearerAuth: [],
  //         cookieAuth: [],
  //       },
  //     ],
  //     requestBody: {
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               voornaam: {
  //                 type: 'string',
  //                 example: 'Sahil',
  //               },
  //               tussenvoegsel: {
  //                 type: 'string',
  //                 example: 'P.',
  //               },
  //               achternaam: {
  //                 type: 'string',
  //                 example: 'Trambadiya',
  //               },
  //               geslacht: {
  //                 type: 'string',
  //                 example: 'Man',
  //                 enum: ['man', 'vrouw', 'neutraal', 'zeg_ik_liever_niet'],
  //               },
  //               postcode: {
  //                 type: 'string',
  //                 example: '3029 AD',
  //               },
  //               huisnr: {
  //                 type: 'string',
  //                 example: '266',
  //               },
  //               straat: {
  //                 type: 'string',
  //                 example: 'Churchill-laan',
  //               },
  //               woonplaats: {
  //                 type: 'string',
  //                 example: 'Informatica',
  //               },
  //               website: {
  //                 type: 'string',
  //                 example: 'www.sahil.com',
  //               },
  //               telefoonnummer: {
  //                 type: 'string',
  //                 example: '0123456789',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     responses: {
  //       200: {
  //         content: {
  //           'application/json': {
  //             schema: {
  //               type: 'object',
  //               properties: {
  //                 code: {
  //                   type: 'number',
  //                   example: 200,
  //                 },
  //                 message: { type: 'string', example: 'Document added successfully' },
  //                 payload: {
  //                   type: 'object',
  //                   properties: {
  //                     result: {
  //                       type: 'object',
  //                       properties: {
  //                         _id: {
  //                           type: 'string',
  //                           example: '649575c62db4de313808de92',
  //                         },
  //                         voornaam: {
  //                           type: 'string',
  //                           example: 'Sahil',
  //                         },
  //                         tussenvoegsel: {
  //                           type: 'string',
  //                           example: 'P.',
  //                         },
  //                         achternaam: {
  //                           type: 'string',
  //                           example: 'Trambadiya',
  //                         },
  //                         geslacht: {
  //                           type: 'string',
  //                           example: 'Man',
  //                           enum: ['Man', 'Vrouw', 'Neutraal', 'Zeg ik liever niet'],
  //                         },
  //                         postcode: {
  //                           type: 'string',
  //                           example: '3029 AD',
  //                         },
  //                         huisnr: {
  //                           type: 'string',
  //                           example: '266',
  //                         },
  //                         straat: {
  //                           type: 'string',
  //                           example: 'Churchill-laan',
  //                         },
  //                         woonplaats: {
  //                           type: 'string',
  //                           example: 'Informatica',
  //                         },
  //                         website: {
  //                           type: 'string',
  //                           example: 'www.sahil.com',
  //                         },
  //                         telefoonnummer: {
  //                           type: 'string',
  //                           example: '0123456789',
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  '/user/profile/retrieve': {
    get: {
      tags: ['User'],
      summary: 'retrieve user profile general information',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Record fetched successfully',
                payload: {
                  result: {
                    wizard_step: 1,
                    wizard_completed: true,
                    biografie:
                      '<p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong><em> voluptatem aspernatur iste ratione neque! dsagfas dfa sdfas df test </em></p>',
                    profile_picture: 'http://localhost:4000/profile_picture/1690356137306306p.jpg',
                    cover_picture: 'http://localhost:4000/profile_picture/dummy_cover_picture.jpg',
                    _id: '649a8c37c760543dbb682a0a',
                    auth0Id: 'google-oauth2|112845259777297160274',
                    createdAt: '2023-06-27T07:14:00.506Z',
                    email: 'sahil.trambadiya@nexuslinkservices.in',
                    updatedAt: '2023-08-03T04:42:28.028Z',
                    voornaam: 'Khyati',
                    achternaam: 'patel',
                    geslacht: 'vrouw',
                    tussenvoegsel: 's.',
                    huisnr: 'sahil',
                    postcode: '10',
                    straat: 'NA',
                    telefoonnummer: '12',
                    woonplaats: 'AMD',
                    website: 'https://www.sahil.com',
                    skills: [
                      {
                        _id: '64ca585c55c2fd41ac945d69',
                        name: 'Machinebouw',
                        category: 'professional_skills',
                        code_id: 'KS1261W6S12LL9NC21GQ',
                      },
                      {
                        _id: '64ca585c55c2fd41ac945d6a',
                        name: 'Puppet',
                        category: 'it_skills',
                        code_id: 'KSSOLUMCX0SZLIAYGOFT',
                      },
                      {
                        _id: '64ca585c55c2fd41ac945d6b',
                        name: 'Prometheus',
                        category: 'it_skills',
                        code_id: 'KS2NA4WWH9Z98XXI5K2Y',
                      },
                    ],
                    biografieIsHidden: true,
                    biografie_is_hidden: false,
                    social_links: [
                      {
                        _id: '64b662b60f8c951bb8f8eef1',
                        name: 'Twitter',
                        link: 'https://twitter.com',
                        icon_name: 'ic_twitter',
                      },
                      {
                        _id: '64b9094c2292203db4b9064f',
                        name: 'Facebook',
                        link: 'https://www.facebook.com',
                        icon_name: 'ic_facebook',
                      },
                    ],
                    profession_name: 'Linux engineer (m/v)',
                    work_experience: {
                      experience: [
                        {
                          _id: '64b783ed397baf35bc94de82',
                          profession_name: 'Linux engineer (m/v)',
                          skills: [
                            {
                              _id: '64b783ed397baf35bc94de83',
                              name: 'Red Hat Enterprise Linux',
                              category: 'it_skills',
                              code_id: 'KS128G66HPYR0ZXM02K2',
                            },
                            {
                              _id: '64b783ed397baf35bc94de84',
                              name: 'Linux Kernel',
                              category: 'it_skills',
                              code_id: 'KS125W26C2Y5MRPJS49T',
                            },
                          ],
                          is_current: true,
                          total_experience_months: 44,
                          start_year: '2019',
                          end_year: '2023',
                        },
                        {
                          _id: '64b783c3397baf35bc94de42',
                          profession_name: 'Design Engineer (IT) (m/v)',
                          skills: [
                            {
                              _id: '64b783c3397baf35bc94de43',
                              name: 'Systemverilog',
                              category: 'it_skills',
                              code_id: 'KS4415S737PVR6RQ7ZJC',
                            },
                            {
                              _id: '64b783c3397baf35bc94de44',
                              name: 'Solidworks',
                              category: 'it_skills',
                              code_id: 'KS122FM6NS52BCDZ7GWT',
                            },
                          ],
                          is_current: false,
                          total_experience_months: 12,
                          start_year: '2020',
                          end_year: '2021',
                        },
                      ],
                      years: [2019, 2020, 2021, 2022, 2023],
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
  '/user/profile/update': {
    patch: {
      tags: ['User'],
      summary: 'Update user profile general information',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Only provide updated fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                voornaam: {
                  type: 'string',
                  example: 'Sahil',
                },
                tussenvoegsel: {
                  type: 'string',
                  example: 'P.',
                },
                achternaam: {
                  type: 'string',
                  example: 'Trambadiya',
                },
                geslacht: {
                  type: 'string',
                  example: 'Man',
                  enum: ['Man', 'Vrouw', 'Neutraal', 'Zeg ik liever niet'],
                },
                postcode: {
                  type: 'string',
                  example: '3029 AD',
                },
                huisnr: {
                  type: 'string',
                  example: '266',
                },
                straat: {
                  type: 'string',
                  example: 'Churchill-laan',
                },
                woonplaats: {
                  type: 'string',
                  example: 'Informatica',
                },
                website: {
                  type: 'string',
                  example: 'www.sahil.com',
                },
                telefoonnummer: {
                  type: 'string',
                  example: '0123456789',
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
                  message: { type: 'string', example: 'Document updated successfully' },
                  payload: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '649575c62db4de313808de92',
                          },
                          voornaam: {
                            type: 'string',
                            example: 'Sahil',
                          },
                          tussenvoegsel: {
                            type: 'string',
                            example: 'P.',
                          },
                          achternaam: {
                            type: 'string',
                            example: 'Trambadiya',
                          },
                          geslacht: {
                            type: 'string',
                            example: 'Man',
                            enum: ['Man', 'Vrouw', 'Neutraal', 'Zeg ik liever niet'],
                          },
                          postcode: {
                            type: 'string',
                            example: '3029 AD',
                          },
                          huisnr: {
                            type: 'string',
                            example: '266',
                          },
                          straat: {
                            type: 'string',
                            example: 'Churchill-laan',
                          },
                          woonplaats: {
                            type: 'string',
                            example: 'Informatica',
                          },
                          website: {
                            type: 'string',
                            example: 'www.sahil.com',
                          },
                          telefoonnummer: {
                            type: 'string',
                            example: '0123456789',
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
  '/user/profile/wizard_status': {
    get: {
      tags: ['User'],
      summary: 'Get wizard status',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
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
                  message: { type: 'string', example: 'Document fetched successfully' },
                  payload: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'object',
                        properties: {
                          wizard_completed: {
                            type: 'boolean',
                            example: true,
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
  '/user/socials/update': {
    put: {
      tags: ['User'],
      summary: 'Create or update socials',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'We can create or update social link, if',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                icon_name: {
                  type: 'string',
                },
                link: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                },
                is_extra: {
                  type: 'boolean',
                },
              },
            },
            example: [
              {
                name: 'Twitter',
                link: 'https://twitter.com',
                icon_name: 'ic_twitter (this is use for static link)',
              },
              {
                name: 'Facebook',
                link: 'https://www.facebook.com',
                is_extra: 'true (if this is extra added link then is going to be true)',
              },
            ],
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Update successfully',
                payload: {
                  result: {
                    _id: '64a57171b74e300480593805',
                    auth0Id: 'google-oauth2|112845259777297160274',
                    social_links: [
                      {
                        _id: '64b662b60f8c951bb8f8eef1',
                        name: 'Twitter',
                        link: 'https://twitter.com',
                        icon_name: 'ic_twitter',
                      },
                      {
                        _id: '64b9094c2292203db4b9064f',
                        name: 'Facebook',
                        link: 'https://www.facebook.com',
                        icon_name: 'ic_facebook',
                      },
                    ],
                    createdAt: '2023-07-05T13:34:41.516Z',
                    updatedAt: '2023-08-03T06:43:33.545Z',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/socials/retrieve': {
    get: {
      tags: ['User'],
      summary: 'Retrieve social links',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Fetched successfully',
                payload: {
                  result: [
                    {
                      _id: '64b662b60f8c951bb8f8eef1',
                      name: 'Twitter',
                      link: 'https://twitter.com',
                      icon_name: 'ic_twitter',
                    },
                    {
                      _id: '64b9094c2292203db4b9064f',
                      name: 'Facebook',
                      link: 'https://www.facebook.com',
                      icon_name: 'ic_facebook',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/biography/update': {
    put: {
      tags: ['User'],
      summary: 'Create or update biography',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Send data text editor data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                biografie: {
                  type: 'string',
                  example:
                    '<p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong> Officia tempora cum nemo reprehenderit labore nulla placeat<em> voluptatem aspernatur iste ratione neque!</em></p>',
                },
                biografie_is_hidden: {
                  type: 'boolean',
                  example: true,
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
              example: {
                code: 200,
                message: 'Record updated successfully',
                payload: {
                  result: {
                    wizard_step: 1,
                    wizard_completed: true,
                    biografie:
                      '<p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong><em> voluptatem aspernatur iste ratione neque! dsagfas dfa sdfas df test </em></p>',
                    profile_picture: 'http://localhost:4000/profile_picture/1690356137306306p.jpg',
                    cover_picture: 'http://localhost:4000/profile_picture/dummy_cover_picture.jpg',
                    _id: '649a8c37c760543dbb682a0a',
                    auth0Id: 'google-oauth2|112845259777297160274',
                    createdAt: '2023-06-27T07:14:00.506Z',
                    email: 'sahil.trambadiya@nexuslinkservices.in',
                    updatedAt: '2023-08-03T06:50:00.893Z',
                    voornaam: 'Khyati',
                    achternaam: 'patel',
                    geslacht: 'vrouw',
                    tussenvoegsel: 's.',
                    huisnr: 'sahil',
                    postcode: '10',
                    straat: 'NA',
                    telefoonnummer: '12',
                    woonplaats: 'AMD',
                    website: 'https://www.sahil.com',
                    picture: 'https://lh3.googleusercontent.com/a/AAcHTtcgXa5C_xddQWtf7Wk1XZemK0rRXT6PaqdbOdADJ4NLT0I=s96-c',
                    skills: [
                      {
                        _id: '64ca585c55c2fd41ac945d69',
                        name: 'Machinebouw',
                        category: 'professional_skills',
                        code_id: 'KS1261W6S12LL9NC21GQ',
                      },
                      {
                        _id: '64ca585c55c2fd41ac945d6a',
                        name: 'Puppet',
                        category: 'it_skills',
                        code_id: 'KSSOLUMCX0SZLIAYGOFT',
                      },
                    ],
                    biografieIsHidden: true,
                    biografie_is_hidden: false,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/upload/profile_picture': {
    put: {
      tags: ['User'],
      summary: 'Update profile picture',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                profile_picture: {
                  type: 'file',
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
              example: {
                code: 200,
                message: 'uploaded successfully',
                payload: {
                  result: 'http://localhost:4000/profile_picture/1690356137306306p.jpg',
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/remove/profile_picture': {
    delete: {
      tags: ['User'],
      summary: 'Delete profile picture',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Deleted successfully',
                payload: {
                  result: 'http://localhost:4000/profile_picture/dummy_picture.png',
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/upload/cover_picture': {
    put: {
      tags: ['User'],
      summary: 'Update cover picture',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                cover_picture: {
                  type: 'file',
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
              example: {
                code: 200,
                message: 'uploaded successfully',
                payload: {
                  result: 'http://localhost:4000/profile_picture/1690356137306306p.jpg',
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/remove/cover_picture': {
    delete: {
      tags: ['User'],
      summary: 'Delete cover picture',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Deleted successfully',
                payload: {
                  result: 'http://localhost:4000/profile_picture/dummy_picture.png',
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/education': {
    get: {
      tags: ['User Opleiding'],
      summary: 'Get education list with pagination',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'filter',
          description: 'search text',
        },
        {
          in: 'query',
          type: 'string',
          name: 'limit',
        },
        {
          in: 'query',
          type: 'string',
          name: 'page',
        },
        {
          in: 'query',
          type: 'string',
          name: 'descending',
        },
        {
          in: 'query',
          type: 'string',
          name: 'sortBy',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
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
    post: {
      tags: ['User Opleiding'],
      summary: "Add your's education",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                opleidingsniveau: {
                  type: 'string',
                },
                studierichting: {
                  type: 'string',
                },
                opleidingsinstelling: {
                  type: 'string',
                },
                locatie: {
                  type: 'string',
                },
                nogbezig: {
                  type: 'boolean',
                },
                niet_afgerond: {
                  type: 'boolean',
                },
                van: {
                  type: 'string',
                  format: 'date-time',
                },
                tot: {
                  type: 'string',
                  format: 'date-time',
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/education/{id}': {
    get: {
      tags: ['User Opleiding'],
      summary: 'Get education by id',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
          description: 'Pass data in params',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ['User Opleiding'],
      summary: "Update you's education information",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                opleidingsniveau: {
                  type: 'string',
                },
                studierichting: {
                  type: 'string',
                },
                opleidingsinstelling: {
                  type: 'string',
                },
                locatie: {
                  type: 'string',
                },
                nogbezig: {
                  type: 'boolean',
                },
                niet_afgerond: {
                  type: 'boolean',
                },
                van: {
                  type: 'string',
                  format: 'date-time',
                },
                tot: {
                  type: 'string',
                  format: 'date-time',
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['User Opleiding'],
      summary: "Remove your's education",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/courses': {
    get: {
      tags: ['User'],
      summary: 'Get your courses with pagination',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'filter',
          description: 'search text',
        },
        {
          in: 'query',
          type: 'string',
          name: 'limit',
        },
        {
          in: 'query',
          type: 'string',
          name: 'page',
        },
        {
          in: 'query',
          type: 'string',
          name: 'descending',
        },
        {
          in: 'query',
          type: 'string',
          name: 'sortBy',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
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
  '/user/courses/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get courses by id',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
          description: 'Pass data in params',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/course': {
    post: {
      tags: ['User'],
      summary: "Add your's course",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cursus: {
                  type: 'string',
                },
                omschrijving: {
                  type: 'string',
                },
                nogbezig: {
                  type: 'boolean',
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/course/{id}': {
    patch: {
      tags: ['User Opleiding'],
      summary: "Update your's course",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cursus: {
                  type: 'string',
                },
                omschrijving: {
                  type: 'string',
                },
                nogbezig: {
                  type: 'boolean',
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },

    delete: {
      tags: ['User'],
      summary: "Remove your's course",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/favorite_user': {
    get: {
      tags: ['User'],
      summary: 'Retrieve all favorite user',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'filter',
          description: 'search text',
        },
        {
          in: 'query',
          type: 'string',
          name: 'limit',
        },
        {
          in: 'query',
          type: 'string',
          name: 'page',
        },
        {
          in: 'query',
          type: 'string',
          name: 'descending',
        },
        {
          in: 'query',
          type: 'string',
          name: 'sortBy',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['User'],
      summary: 'Add new favorite user',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                post: {
                  type: 'object',
                  properties: {
                    user_id: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            example: {
              user_id: 'Id',
            },
          },
        },
      },
      responses: {
        200: {
          description: '',
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Record fetched successfully',
                payload: {
                  result: {
                    post: {
                      titel: 'Testing',
                      bericht: 'test',
                      introductie: 'test',
                      poster: '6566e031c827b3264d7cadd7',
                      type: 'test',
                      sector: 'test',
                      interessegebieden: 'test',
                      datumgepost: '1969-12-31T23:59:57.989Z',
                      hasexternallink: true,
                      linktekst: 'test',
                      linkurl: 'test',
                      tooninondernemernieuwswidget: true,
                      gemarkeerdalsspam: true,
                      zichtbaarheidvanpost: '1969-12-31T23:59:57.989Z',
                      management: {
                        archief: true,
                        redenomteblokkeren: 'test',
                      },
                      parentid: null,
                    },
                    admincompanysettings: {
                      isdisabled: true,
                    },
                    _id: '65701bef01550ee01edf4f4c',
                    deleted: false,
                    createdAt: '2023-12-06T06:59:59.748Z',
                    updatedAt: '2023-12-06T06:59:59.748Z',
                    created_by: '6566e031c827b3264d7cadd7',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/favorite_user/{id}': {
    delete: {
      tags: ['User'],
      summary: 'Remove favorite user by id',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          type: 'string',
          name: 'id',
          description: 'Enter user id',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'success message',
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/role_update': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update user role from wizard',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Only provide updated fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                role: {
                  role: 'string',
                  example: 'Freelancer',
                  enum: ['Freelancer', 'Opdrachtgever'],
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
                  message: { type: 'string', example: 'Role updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step1': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step1 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                voornaam: {
                  type: 'string',
                  example: 'John',
                },
                tussenvoegsel: {
                  type: 'string',
                  example: 'Doe',
                },
                achternaam: {
                  type: 'string',
                  example: 'Smith',
                },
                telefoonnummer: {
                  type: 'string',
                  example: '0123456789',
                },
                skip_company: {
                  type: 'boolean',
                  example: false,
                },
                bedrijfsnaam: {
                  type: 'string',
                  example: 'My Company',
                },
                kvknummer: {
                  type: 'string',
                  example: '12345678',
                },
                adres: {
                  type: 'object',
                  properties: {
                    straatnaam: {
                      type: 'string',
                      example: 'Main Street',
                    },
                    huisnummer: {
                      type: 'string',
                      example: '123',
                    },
                    eventueletoevoeging: {
                      type: 'string',
                      example: 'A',
                    },
                    postcode: {
                      type: 'string',
                      example: '1234 AB',
                    },
                    plaats: {
                      type: 'string',
                      example: 'Amsterdam',
                    },
                    land: {
                      type: 'string',
                      example: 'Nederland',
                    },
                  },
                },
                gevestigd_in_nederland: {
                  type: 'boolean',
                  example: true,
                },
                gevestigd_in_het_buitenland: {
                  type: 'boolean',
                  example: false,
                },
                datum_van_oprichting: {
                  type: 'string',
                  format: 'date',
                  example: '2022-01-01',
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step2': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step2 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                overmij: {
                  type: 'string',
                  example: 'John',
                },
                motivatie: {
                  type: 'string',
                  example: 'Doe',
                },
                wil_je_chat_gpt_gebruiken: {
                  type: 'boolean',
                  example: false,
                },
                chat_gpt_datum_gebruiken: {
                  type: 'string',
                  format: 'date',
                  example: '2022-01-01',
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step4': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step4 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                werkdenkniveau: {
                  type: 'string',
                  example: 'Geen',
                  examples: ['Geen', 'Basisonderwijs', 'MAVO/VMBO', 'HAVO', 'VWO', 'MBO', 'HBO', 'WO'],
                },
                vakgebied: {
                  type: 'array',
                  example: ['Horeca', 'ICT'],
                  examples: [
                    'Administratief / call center',
                    'Agrarisch / Visserij',
                    'Arbeidsbemiddeling',
                    'Beveiliging / Brandweer / Politie',
                    'Bouw',
                    'Cultuur / Recreatie',
                    'Facilitair / Schoonmaak',
                    'Financieel / Verzekeringen',
                    'Gezondheidszorg / Welzijn',
                    'Handel',
                    'Horeca',
                    'ICT',
                    'Industrie / Techniek',
                    'Logistiek',
                    'Media / Communicatie',
                    'Nutsvoorzieningen',
                    'Onderwijs / Onderzoek',
                    'Overheid / Non-profit',
                    'Persoonlijke dienstverlening',
                    'Pharma / Chemie',
                    'Zakelijke dienstverlening',
                    'Overig / Onbekend',
                  ],
                },
                work_experience: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      functie: {
                        type: 'string',
                      },
                      bedrijf: {
                        type: 'string',
                      },
                      locatie: {
                        type: 'string',
                      },
                      beschrijving: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                        enum: ['Loondienst', 'Zelfstandig ondernemer', 'Onbekend'],
                      },
                      status: {
                        type: 'boolean',
                        example: true,
                      },
                      is_current: {
                        type: 'boolean',
                      },
                      professioncode: {
                        type: 'string',
                      },
                      professiondescription: {
                        type: 'string',
                      },
                      start_date: {
                        type: 'string',
                        format: 'date',
                      },
                      end_date: {
                        type: 'string',
                        format: 'date',
                      },
                      skills: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            code_id: {
                              type: 'string',
                            },
                            category: {
                              type: 'string',
                            },
                            is_extra: {
                              type: 'boolean',
                            },
                            checked: {
                              type: 'boolean',
                            },
                          },
                        },
                        minItems: 1,
                      },
                    },
                  },
                },
                education: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      opleidingsniveau: {
                        type: 'string',
                      },
                      studierichting: {
                        type: 'string',
                      },
                      opleidingsinstelling: {
                        type: 'string',
                      },
                      locatie: {
                        type: 'string',
                      },
                      nogbezig: {
                        type: 'boolean',
                      },
                      niet_afgerond: {
                        type: 'boolean',
                      },
                      van: {
                        type: 'string',
                        format: 'date',
                      },
                      tot: {
                        type: 'string',
                        format: 'date',
                      },
                    },
                  },
                },
                courses: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      cursus: {
                        type: 'string',
                      },
                      omschrijving: {
                        type: 'string',
                      },
                      nogbezig: {
                        type: 'boolean',
                      },
                    },
                  },
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step5': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step5 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                work_experience: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      functie: {
                        type: 'string',
                      },
                      bedrijf: {
                        type: 'string',
                      },
                      locatie: {
                        type: 'string',
                      },
                      beschrijving: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                        enum: ['Loondienst', 'Zelfstandig ondernemer', 'Onbekend'],
                      },
                      status: {
                        type: 'boolean',
                        example: true,
                      },
                      is_current: {
                        type: 'boolean',
                      },
                      professioncode: {
                        type: 'string',
                      },
                      professiondescription: {
                        type: 'string',
                      },
                      start_date: {
                        type: 'string',
                        format: 'date',
                      },
                      end_date: {
                        type: 'string',
                        format: 'date',
                      },
                      skills: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            code_id: {
                              type: 'string',
                            },
                            category: {
                              type: 'string',
                            },
                            is_extra: {
                              type: 'boolean',
                            },
                            checked: {
                              type: 'boolean',
                            },
                          },
                        },
                        minItems: 1,
                      },
                    },
                  },
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step6': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step6 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                skills: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      code_id: {
                        type: 'string',
                      },
                      category: {
                        type: 'string',
                      },
                      is_extra: {
                        type: 'boolean',
                      },
                    },
                  },
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/ondernemer/step7': {
    patch: {
      tags: ['Wizard'],
      summary: 'Update ondernemer step7 data',
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        description: 'Provide required fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ikwilmijngegevensdelenopyounitednl: {
                  type: 'boolean',
                  example: false,
                },
                nieuwsbrief_younited: {
                  type: 'object',
                  properties: {
                    signup: {
                      type: 'boolean',
                      example: false,
                    },
                  },
                },
                gevonden_en_feedback: {
                  type: 'object',
                  properties: {
                    wil_je_benaderd_worden_voor_onderzoek__feedback: {
                      type: 'boolean',
                      example: false,
                    },
                    gevonden_via: {
                      type: 'string',
                      example: 'Via website Younited®',
                      enum: [
                        'Via website Younited®',
                        'Via Google / andere zoekmachine',
                        'Via LinkedIn',
                        'Via Instagram',
                        'Via Facebook',
                        'Via YouTube',
                        'Via mijn netwerk',
                        'Via mijn opdrachtgever',
                      ],
                    },
                  },
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
                  message: { type: 'string', example: 'Data updated successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/opdrachtgever/step1': {
    patch: {
      tags: ['Wizard'],
      // summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                profiel: {
                  type: 'object',
                  properties: {
                    voornaam: { type: 'string' },
                    tussenvoegsel: { type: 'string' },
                    achternaam: { type: 'string' },
                    telefoonnummer: { type: 'number' },
                  },
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/opdrachtgever/step2': {
    patch: {
      tags: ['Wizard'],
      // summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                organisatie: {
                  type: 'object',
                  properties: {
                    kvknummer: { type: 'string' },
                    bedrijfsnaam: { type: 'string' },
                    handelsnaam: { type: 'string' },
                    websitelink: { type: 'string' },
                    bezoekadres: {
                      type: 'object',
                      properties: {
                        straatnaam: { type: 'string' },
                        huisnummer: { type: 'string' },
                        eventueletoevoeging: { type: 'string' },
                        postcode: { type: 'string' },
                        plaats: { type: 'string' },
                        land: { type: 'string' },
                      },
                    },
                  },
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/opdrachtgever/step3': {
    patch: {
      tags: ['Wizard'],
      // summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                organisatie: {
                  type: 'object',
                  properties: {
                    kvknummer: { type: 'string' },
                    uitgebreideomschrijving: { type: 'string' },
                    sector: { type: 'string' },
                    totaal_aantal_medewerkers: { type: 'string' },
                  },
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/opdrachtgever/step4': {
    patch: {
      tags: ['Wizard'],
      // summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                medewerkers: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      voornaam: { type: 'string' },
                      tussenvoegsel: { type: 'string' },
                      achternaam: { type: 'string' },
                      emailadres: { type: 'string' },
                    },
                  },
                },
                organisatie: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'objectId' },
                  },
                  required: ['id'],
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/wizard/opdrachtgever/step5': {
    patch: {
      tags: ['Wizard'],
      // summary: "$SUMMARY",
      security: [
        {
          bearerAuth: [],
          cookieAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                organisatie: {
                  type: 'object',
                  properties: {
                    kvknummer: { type: 'string' },
                    ik_wil_mijn_bedrijf_delen_op_younitednl: { type: 'boolean' },
                  },
                },
                profiel: {
                  type: 'object',
                  properties: {
                    wil_je_benaderd_worden_voor_onderzoek__feedback: { type: 'boolean' },
                    gevonden_via: { type: 'string' },
                  },
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
              example: {
                code: 200,
                message: 'success message',
                payload: {
                  result: {
                    status: 'OK',
                    data: 'data',
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
