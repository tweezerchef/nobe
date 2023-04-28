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

DirectMessages.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { text, senderId, recipientId } = req.body;
    console.log(senderId)
    // Create the DirectMessage in the database
    const newMessage = await prisma.directMessages.create({
      data: {
        text,
        senderId,
        recipientId,
      },
    });

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



export default DirectMessages;