const { chatService } = require("@services/index");

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
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    // cors: {
    //   origin: [
    //     "http://localhost:*",
    //     "http://localhost:3000",
    //     "http://localhost:3001",
    //     "https://squible.nexuslinkdev.com",
    //     "https://customersquible.nexuslinkdev.com",
    //   ],
    //   credentials: true,
    // },
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

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected", userData);
    });

    socket.on("retrieve conversations", async (body) => {
      const conversations = await chatService.fetchConversations({
        query: body.query,
        user: body.user,
      });

      socket.emit("conversations received", conversations);
    });

    socket.on("join conversation", (room, user) => {
      socket.in(room).emit("read message", true);
      socket.join(room);
      joinToRoom(room, user);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing", true));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing", false));

    socket.on("new message", async (body) => {
      const is_read = io.sockets.adapter.rooms.get(body.conversation)?.size > 1;

      await chatService.saveMessage({ ...body, is_read });
      const getConversation = await chatService.fetchConversationById({ conversationId: body.conversation });

      socket.in(body.conversation).emit("message received", { ...body, is_read });
      socket.emit("message details", { ...body, is_read });
      io.to(data.receiver).emit("new conversations", getConversation);
    });

    socket.on("leave conversation", async (room, user) => {
      socket.in(room).emit("read message", false);
      socket.leave(room);
      leaveRoom(room, user);
    });

    socket.off("disconnect user", (userData) => {
      socket.leave(userData.id);
    });
  });
};
