const express = require('express');
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';

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
  const conversationId = req.params.conversationId;
  const { text, senderId } = req.body;

  try {
    const message = await prisma.directMessages.create({
      data: {
        text: text,
        senderId: senderId,
        conversationId: conversationId,
        createdAt: new Date(),
      },
    });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating message');
  }
});





export default DirectMessages;