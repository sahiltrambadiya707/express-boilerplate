const httpStatus = require('http-status');
const { ObjectId } = require('mongoose').Types;
const ApiError = require('../utils/ApiError');

const accessConversation = async ({ user, body }) => {
  try {
    const isConversation = await global.models[global.env.DOMAIN].CONVERSATION.aggregate([
      {
        $match: {
          recipients: {
            $all: [new ObjectId(user.userId), new ObjectId(body.user)],
          },
        },
      },
      {
        $lookup: {
          from: global.collections.USER,
          let: {
            userId: new ObjectId(body.user),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userId'],
                },
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    if (isConversation?.length > 0) {
      return isConversation[0];
    }
    const conversationData = {
      recipients: [new ObjectId(user.userId), new ObjectId(body.user)],
    };

    const createConversation = await global.models[global.env.DOMAIN].CONVERSATION.create(conversationData);

    const fullConversation = await global.models[global.env.DOMAIN].CONVERSATION.aggregate([
      { $match: { _id: new ObjectId(createConversation._id) } },
      {
        $lookup: {
          from: global.collections.USER,
          let: {
            userId: new ObjectId(user.userId),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userId'],
                },
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return fullConversation[0];
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const fetchConversations = async ({ user, query }) => {
  const { limit, page, descending, sortBy } = query;
  const options = {
    limit: limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10,
    page: page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1,
    get skip() {
      return (this.page - 1) * this.limit;
    },
    sortBy: sortBy && sortBy !== '' ? sortBy : 'date',
    sortOrder: descending && descending === 'true' ? -1 : 1,
  };
  try {
    const list = await global.models[global.env.DOMAIN].CONVERSATION.aggregate([
      {
        $match: {
          recipients: new ObjectId(user.userId),
        },
      },
      { $sort: { [options.sortBy]: options.sortOrder } },
      { $skip: options.skip },
      { $limit: options.limit },
      {
        $addFields: {
          user: {
            $setDifference: ['$recipients', [new ObjectId(user.userId)]],
          },
        },
      },
      {
        $lookup: {
          from: global.collections.USER,
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: global.collections.MESSAGES,
          let: { userId: '$user._id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$sender', '$$userId'] },
              },
            },
            {
              $sort: {
                date: -1,
              },
            },
            {
              $limit: 1,
            },
          ],
          as: 'last_message',
        },
      },
      {
        $unwind: {
          path: '$last_message',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    const total_found = await global.models[global.env.DOMAIN].CONVERSATION.countDocuments({
      recipients: new ObjectId(user.userId),
    });

    return {
      data: list,
      meta: {
        total_found,
        total_in_response: list.lengths,
        current_page: options.page,
        total_pages: Math.ceil(total_found / options.limit),
      },
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const fetchConversationById = async ({ user, params }) => {
  const { id } = params;
  const conversations = await global.models[global.env.DOMAIN].CONVERSATION.aggregate([
    { $match: { _id: new ObjectId(id), recipients: new ObjectId(user.userId) } },
    {
      $addFields: {
        user: {
          $setDifference: ['$recipients', [new ObjectId(user.userId)]],
        },
      },
    },
    {
      $lookup: {
        from: global.collections.USER,
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return conversations?.[0];
};

const allMessages = async ({ user, query, body }) => {
  const { limit, page, descending, sortBy } = query;
  const options = {
    limit: limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10,
    page: page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1,
    get skip() {
      return (this.page - 1) * this.limit;
    },
    sortBy: sortBy && sortBy !== '' ? sortBy : 'date',
    sortOrder: descending && descending === 'true' ? -1 : 1,
  };

  const conversation = await global.models[global.env.DOMAIN].CONVERSATION.findOne({
    _id: new ObjectId(body.conversation),
    recipients: user.userId,
  });

  const list = await global.models[global.env.DOMAIN].MESSAGES.find({ conversation: new ObjectId(conversation._id) })
    .sort({ [options.sortBy]: options.sortOrder })
    .skip(options.skip)
    .limit(options.limit);

  const total_found = await global.models[global.env.DOMAIN].MESSAGES.countDocuments({ conversation: new ObjectId(conversation._id) });

  return {
    data: list,
    meta: {
      total_found,
      total_in_response: list.lengths,
      current_page: options.page,
      total_pages: Math.ceil(total_found / options.limit),
    },
  };
};

const saveMessage = async ({ body }) => {
  try {
    return await global.models[global.env.DOMAIN].MESSAGES.create(body);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const updateMessage = async ({ body, messageId }) => {
  try {
    await global.models[global.env.DOMAIN].MESSAGES.findOneAndUpdate({ _id: messageId }, { $set: body }, { new: true });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const updateUnreadMessages = async ({ body, condition }) => {
  try {
    return await global.models[global.env.DOMAIN].MESSAGES.updateMany({ ...condition }, { $set: body });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

module.exports = {
  accessConversation,
  fetchConversations,
  fetchConversationById,
  allMessages,
  saveMessage,
  updateMessage,
  updateUnreadMessages,
};
