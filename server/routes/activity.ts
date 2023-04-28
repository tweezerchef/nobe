import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const Activity = express.Router();

Activity.get('/', async (req, res) => {

  const userId = req.params;

  const user = await prisma.user.findMany({
    where: { id: userId },
    include: {
      friends: { include: { friend: true } },
      friendships: { include: { user: true } },
    },
  });

})


export default Activity;