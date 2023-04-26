import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const CreateClubRoute = express.Router();


async function findOrCreateClub(name: string, description: string, image: string) {

  const newClub = await prisma.clubs.upsert({
    where: { name: name },
    update: {},
    create: { name: name, description: description, image: image },
  });
  return newClub;
}

CreateClubRoute.post('/', async (req: Request, res: Response) => {
  findOrCreateClub(req.body.name, req.body.description, req.body.image)
    .then((newClub) =>(
      console.log(newClub)
    ))
    .then(async () => {
      const clubs = await prisma.clubs.findMany();
      res.json(clubs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    })
});



export default CreateClubRoute;
