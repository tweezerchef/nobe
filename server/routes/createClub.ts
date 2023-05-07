import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const CreateClubRoute = express.Router();

async function findOrCreateClub(
  name: string,
  description: string,
  image: string,
  createdBy: string,
) {
  const newClub = await prisma.clubs.upsert({
    where: { name },
    update: {},
    create: {
      name, description, image, clubMembers: { create: { userId: createdBy } },
    },
    include: { clubMembers: true },
  });
  return newClub;
}

CreateClubRoute.post('/', async (req: Request, res: Response) => {
  const createdBy = req.body.userId;
  // console.log(createdBy);
  const c = 'club root';

  findOrCreateClub(req.body.name, req.body.description, req.body.image, createdBy)
    .then(async () => {
      const clubs = await prisma.clubs.findMany();
      const userData = await axios.get(`http://localhost:8080/user?id=${createdBy}`);
      const user = userData;
      console.log('user', user.data);
      const response = { clubs, user };
      // console.log('response', response);
      // res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

export default CreateClubRoute;
