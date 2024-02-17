const httpStatus = require('http-status');
const catchAsync = require('@utils/catchAsync');
const { chatService } = require('@services/index');
const { createResponseObject } = require('@utils/utils');

const accessConversation = catchAsync(async (req, res) => {
  const chatDoc = await chatService.accessConversation({
    user: req.user,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: chatDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const fetchConversations = catchAsync(async (req, res) => {
  const chatDoc = await chatService.fetchConversations({
    user: req.user,
    query: req.query,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: chatDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const fetchConversationById = catchAsync(async (req, res) => {
  const chatDoc = await chatService.fetchConversationById({
    user: req.user,
    params: req.params,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: chatDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const allMessages = catchAsync(async (req, res) => {
  const chatDoc = await chatService.allMessages({
    user: req.user,
    query: req.query,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: chatDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const saveMessage = catchAsync(async (req, res) => {
  const chatDoc = await chatService.saveMessage({
    user: req.user,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: chatDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  accessConversation,
  fetchConversations,
  fetchConversationById,
  allMessages,
  saveMessage,
};
