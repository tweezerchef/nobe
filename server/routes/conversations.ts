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
    // Find the receiver user
    const receiver = await prisma.user.findFirst({ where: { firstName: otherUser } });

    // Check if a conversation with the same set of members already exists
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
      // Return existing conversation instead of creating a new one
      res.json(null);
      return;
    }

    // Create a new conversation with the specified members
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

export default Conversations;
