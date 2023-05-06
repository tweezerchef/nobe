/* eslint-disable no-console */
import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions, import/no-cycle
import { io, connectedUsers } from '../socket';

const express = require('express');
// const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const prisma = new PrismaClient();
const DirectMessages = express.Router();

// DirectMessages.post('/', async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const { text, senderId, recipientId, createdAt } = req.body;

//     let conversation = await prisma.conversations.findFirst({
//       where: {
//         AND: [
//           { members: { some: { id: senderId } } },
//           { members: { some: { id: recipientId } } }
//         ]
//       },
//       include: {
//         messages: true
//       }
//     });

//     // if (!conversation) {
//     //   conversation = await prisma.conversations.create({
//     //     data: {
//     //       members: {
//     //         connect: [
//     //           { id: senderId },
//     //           { id: recipientId }
//     //         ]
//     //       }
//     //     }
//     //   });
//     // }

//     const newMessage = await prisma.directMessages.create({
//       data: {
//         text,
//         createdAt,
//         sender: {
//           connect: { id: senderId }
//         },
//         conversation: {
//           connect: { id: conversation.id }
//         }
//       }
//     });

//     res.json(newMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

DirectMessages.post('/:conversationId/messages', async (req: AuthenticatedRequest, res: Response) => {
  const { conversationId } = req.params;
  const { text, senderId } = req.body;
  // console.log(req);
  try {
    const message = await prisma.directMessages.create({
      data: {
        text,
        senderId,
        conversationId,
        createdAt: new Date(),
      },
    });

    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
      include: { members: true },
    });

    const sender = await prisma.user.findUnique({
      where: { id: senderId },
    });

    const recipient = conversation.members.find((member: { id: any; }) => member.id !== senderId);
    if (recipient) {
      const data = await prisma.notifications.create({
        data: {
          body: `You have a new message from ${sender.firstName}`,
          type: 'new_direct_message',
          recipient: recipient.id,
          createdAt: new Date(), // Update this line to set the userId field
          User: {
            connect: {
              id: senderId,
            },
          },
        },
        include: {
          User: {
            select: {
              id: true,
              firstName: true,
              picture: true,
            },
          },
        },
      });
      if (connectedUsers.includes(recipient.id)) {
        io.to(recipient.id).emit('new-notification', data);
      }
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating message');
  }
});

export default DirectMessages;
