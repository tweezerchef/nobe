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
const Conversations = express.Router();

Conversations.post('/', async (req: AuthenticatedRequest, res: Response) => {
  const { currentUser, otherUser } = req.body;

  try {
    // const creator = await prisma.user.findUnique({ where: { id: currentUser } });
    const receiver = await prisma.user.findFirst({ where: { firstName: otherUser } });

    const conversation = await prisma.conversations.create({
      data: {
        members: {
          connect: [
            { id: currentUser },
            { id: receiver.id },
          ],
        },
      },
      select: {
        id: true,
        members: true,
        messages: true,
      },
    });

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create conversation' });
  }
});


export default Conversations;