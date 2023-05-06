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
const Notifications = express.Router();

Notifications.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  try {
    const notifications = await prisma.notifications.findMany({
      where: {
        recipient: userId,
      },
      orderBy: {
        createdAt: 'desc',
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

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default Notifications;
