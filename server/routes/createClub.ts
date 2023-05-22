import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const CreateClubRoute = express.Router();

async function findOrCreateClub(
  name: string,
  description: string,
  image: string,
  userId: string,
) {
  console.log('userId: ', userId);
  const newClub = await prisma.clubs.upsert({
    where: { name },
    update: {},
    create: {
      name, description, image, clubMembers: { create: { userId } },
    },
    include: { clubMembers: true },
  });
  return newClub;
}

CreateClubRoute.post('/', async (req: Request, res: Response) => {
  const createdBy = req.body.email;
  const { userId } = req.body;
  // console.log('userId', userId);

  // image should equl s3 url
  // call amazon get url
  // send image file req.body.image to /amazon/club
  const { image } = req.body;
  // console.log('image: ', image);

  findOrCreateClub(req.body.name, req.body.description, userId, image)
    .then(async () => {
      try {
        const s3Response = await axios.put('http://localhost:8080/amazon/club', {
          image,
        });
        console.log(s3Response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
        return;
      }

      const clubs = await prisma.clubs.findMany({
        include: {
          clubMembers: true,
        },
      });
      const userData = await axios.get(`http://localhost:8080/user?email=${createdBy}`);
      const user = userData.data;
      const response = { clubs, user };
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

export default CreateClubRoute;
