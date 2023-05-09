import { Request, Response } from 'express';

const express = require('express');
// const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

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
    const receiver = await prisma.user.findFirst({ where: { firstName: otherUser } });

    const existingConversation = await prisma.conversations.findFirst({
      where: {
        AND: [
          { members: { some: { id: currentUser } } },
          { members: { some: { id: receiver.id } } },
        ],
      },
      select: {
        id: true,
        members: true,
        messages: true,
      },
    });

    if (existingConversation) {
      res.json(null);
      return;
    }

    const newConversation = await prisma.conversations.create({
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

    res.json(newConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create conversation' });
  }
});

Conversations.put('/:id', async (req: AuthenticatedRequest, res: Response) => {
  const conversationId = req.params.id;

  try {
    const updatedConversation = await prisma.conversations.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
      select: {
        id: true,
        members: true,
        messages: true,
        updatedAt: true,
      },
    });
    res.json(updatedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update conversation' });
  }
});

export default Conversations;
