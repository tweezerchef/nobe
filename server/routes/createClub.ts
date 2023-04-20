import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CreateClubRoute = express.Router();

CreateClubRoute.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newClub = await prisma.clubs.create({
      data: {
        name,
      },
    });
    res.json(newClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default CreateClubRoute;
