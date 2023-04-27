import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const Friendship = express.Router();

Friendship.post('/', async (req, res) => {
  const {userId, friendId } = req.body;

  console.log('userid', userId)
  console.log('friendId', friendId)

  try {
    const friendship = await prisma.friendship.create({
      data: {
        user: { connect: { id: userId } },
        friend: { connect: { id: friendId } },
      },
    });
  } catch (error) {
    console.error(error);
  }
})

export default Friendship;