const logger = require('../config/logger');
const { chatService, userService } = require('../services');

const connectedUsers = new Map();

const joinToRoom = (room, user) => {
  if (!connectedUsers.has(room)) {
    connectedUsers.set(room, []);
  }

  connectedUsers.get(room).push(user);
};

const leaveRoom = (room, user) => {
  let userList = connectedUsers.get(room);

  userList = userList?.filter((u) => u !== user);

  if (!userList?.length) {
    connectedUsers.delete(room);
  } else {
    connectedUsers.set(room, userList);
  }
};

module.exports = (server) => {
  const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
      origin: [
        'http://localhost:*',
        'http://localhost:3000',
        'http://localhost:8080',
        // "http://localhost:3001",
        // "https://squible.nexuslinkdev.com",
        // "https://customersquible.nexuslinkdev.com",
      ],
      // credentials: true,
    },
    // rejectUnauthorized: false,
  });

  // io.use(async (socket, next) => {
  //   const token = socket.handshake.headers["authorization"];
  //   const origin = socket.handshake.headers["origin"];
  //   if (origin === "http://localhost:3001" && (await userAuth(token))) {
  //     return next();
  //   } else if (origin === "http://localhost:3000" && (await adminStaffAuth(token))) {
  //     return next();
  //   } else {
  //     return next(new Error("authentication error"));
  //   }
  // });

  io.on('connection', (socket) => {
    logger.info('socket connected');

    socket.on('setup', (userData) => {
      socket.join(userData._id);
      socket.emit('connected', userData);
    });

    socket.on('retrieve conversations', async (body) => {
      logger.info(body, 'debug');

      const conversations = await chatService.fetchConversations({
        query: body.query,
        user: body.user,
      });

      socket.emit('conversations received', conversations);
    });

    socket.on('join conversation', (room, user, sender) => {
      socket.in(room).emit('read message', true);
      socket.join(room);
      joinToRoom(room, user);
      chatService.updateUnreadMessages({
        body: {
          is_read: true,
        },
        condition: {
          sender,
          is_read: false,
        },
      });
      socket.in(room).emit('read all messages');
    });

    socket.on('typing', (room) => socket.in(room).emit('typing', true));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing', false));

    socket.on('new message', async (body) => {
      const is_read = connectedUsers.get(body.conversation)?.length > 1;

      const savedMessage = await chatService.saveMessage({ body, is_read });

      socket.in(body.conversation).emit('message received', { ...JSON.parse(JSON.stringify(savedMessage)), is_read });
      socket.emit('message details', { ...JSON.parse(JSON.stringify(savedMessage)), is_read });
    });

    socket.on('leave conversation', async (room, user) => {
      socket.in(room).emit('read message', false);
      socket.leave(room);
      leaveRoom(room, user);
    });

    socket.off('disconnect user', (userData) => {
      socket.leave(userData.id);
    });

    socket.on('disconnect', () => {});

    socket.on('user online', (userId) => {
      socket.broadcast.emit('user online', userId);
      userService.updateUser({
        body: {
          is_online: true,
        },
        user: {
          userId,
        },
      });
    });
    socket.on('user offline', (userId, room) => {
      socket.broadcast.emit('user offline', { userId, last_seen: Date.now() });
      userService.updateUser({
        body: {
          is_online: false,
          last_seen: Date.now(),
        },
        user: {
          userId,
        },
      });
      if (room) {
        socket.leave(room);
        leaveRoom(room, userId);
      }
    });

    socket.on('delete message', (messageId, conversation) => {
      chatService.updateMessage({
        body: {
          is_deleted: true,
          deleted_at: Date.now(),
        },
        messageId,
      });
      socket.in(conversation).emit('delete message', messageId);
    });

    socket.on('edit message', (messageId, conversation, content) => {
      chatService.updateMessage({
        body: {
          content,
          is_edited: true,
          edited_at: new Date(),
        },
        messageId,
      });
      socket.in(conversation).emit('edit message', { messageId, content });
    });

    socket.on('read messages', (messages, room) => {
      socket.in(room).emit('read messages', messages);
    });
  });
};
