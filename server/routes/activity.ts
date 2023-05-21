import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const Activity = express.Router();

Activity.get('/', async (req, res) => {
  const userId = Array.isArray(req.query.userId) ? req.query.userId[0] : req.query.userId;
  const userIdStr = typeof userId === 'string' ? userId : '';

  const following = await prisma.user.findUnique({
    where: { id: userIdStr },
  }).friendships() ?? [];

  const followingIds = following.map((item: any) => item.friendId);

  const users = await prisma.activity.findMany({
    where: {
      userId: { in: followingIds },
    },
    include: {
      user: true,
      book: true,
    },
  });

  res.send(users);
});

export default Activity;
