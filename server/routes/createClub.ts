import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CreateClubRoute = express.Router();

async function findOrCreateClub(
  name: string,
  description: string,
  image: string,
  createdBy: string, // new parameter
) {
  const newClub = await prisma.clubs.upsert({
    where: { name },
    update: {},
    create: {
      name, description, image, clubMembers: { create: { userId: createdBy } },
    }, // create clubMembers relationship
    include: { clubMembers: true }, // include clubMembers in the response
  });
  return newClub;
}

CreateClubRoute.post('/', async (req: Request, res: Response) => {
  const createdBy = req.body.userId; // get the userId from the request body

  findOrCreateClub(req.body.name, req.body.description, req.body.image, createdBy)
    .then((newClub) => console.log(newClub))
    .then(async () => {
      const clubs = await prisma.clubs.findMany();
      res.json(clubs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

export default CreateClubRoute;
