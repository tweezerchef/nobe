/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, ServerOptions } from 'socket.io';
import { Request, Response } from 'express';

const express = require('express');
// const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
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
// function uuid(userId: string) {
//   throw new Error('Function not implemented.');
// }

// async function getNotificationsForUser(userId: string): Promise<Notification[] | undefined> {
//   try {
//     const notifications = await prisma.notifications.findMany({
//       where: {
//         recipient: {
//         // eslint-disable-next-line @typescript-eslint/no-use-before-define
//           userId: uuid(userId),
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include: {
//         User: {
//           select: {
//             id: true,
//             firstName: true,
//             picture: true,
//           },
//         },
//       },
//     });
//     return notifications;
//   } catch (error) {
//     console.error(error);
//   }
//   return [];
// }

const connectedUsers: (string | string[] | undefined)[] = [];

io.on('connection', async (socket) => {
  const { userId } = socket.handshake.query;
  console.log('someone has connected!:', userId);

  socket.join(userId ?? '');

  connectedUsers.push(userId);
  console.log(connectedUsers);
  // as unknown as string;
  // const notifications = await getNotificationsForUser(userId);
  // socket.emit('notifications', notifications);

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
