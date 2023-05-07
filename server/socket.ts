/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, ServerOptions } from 'socket.io';
// Socket.Io
interface CustomServerOptions extends ServerOptions {
  generateId: (req: any) => any;
}

const io = new Server({
  cors: {
    origin: process.env.SERVER_URL,
  },
  // eslint-disable-next-line no-underscore-dangle
  generateId: (req) => req._query.userId,
} as CustomServerOptions);

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface User {
  socketId: string;
  id: string
}

// const addNewUser = (id: string, socketId: any) => {
//   !onlineUsers.some((user) => user.id === id)
//   && onlineUsers.push({
//     id, socketId,
//   });
// };

// socket.on("newUser", (id) => {
//   addNewUser(id, socket.id);
// });
// removeUser(socket.id);

// const removeUser = (socketId: string) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (id: string) => {
//   onlineUsers.find((user) => user.id === id);
// };

const connectedUsers: (string | string[] | undefined)[] = [];

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  console.log('someone has connected!:', userId);

  socket.join(userId ?? '');

  connectedUsers.push(userId);
  console.log(connectedUsers);
  socket.on('new-message', (data) => {
    console.log('New message:', data);
    io.emit('new-message', data);
  });

  socket.on('new-follow', (data) => {
    console.log('newFollower:', data);
    io.to(userId ?? '').emit('new-notification', data);
  });

  socket.on('disconnect', () => {
    const index = connectedUsers.indexOf(userId);
    if (index !== -1) {
      connectedUsers.splice(index, 1);
    }
    console.log('someone has disconnected:', userId);
  });
});

const startSocketServer = () => {
  io.listen(3000);
};

export { io, startSocketServer, connectedUsers };
