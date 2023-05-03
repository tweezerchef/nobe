import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const SpotsMapRoute = express.Router();


SpotsMapRoute.post("/place", async (req: Request, res: Response) => {
  const { address, lat, lng } = req.body;
  try {
    const existingPlace = await prisma.placesToRead.findFirst({
      where: {
        Location: address,
        Lat: lat,
        Long: lng,
      },
    });
    if (existingPlace) {
      return res.status(200).json({
        message: "Place already exists",
      });
    } else {
      const createdPlace = await prisma.placesToRead.create({
        data: {
          Location: address,
          Lat: lat,
          Long: lng,
        },
      });
      res.status(201).json({ createdPlace });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

SpotsMapRoute.get('/', async (req: Request, res: Response) => {
  const places = await prisma.placesToRead.findMany();
  res.json(places);
});

SpotsMapRoute.post('/description', async (req: Request, res: Response) => {
  const { Description, placeId } = req.body;


  try {
    const updatedPlace = await prisma.description_Places.upsert({
      where: { id: placeId },
      data: { Description: Description },
    });

    res.status(200).json({ updatedPlace });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
})

// SpotsMapRoute.post('/places/:id/description', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body, userId } = req.body;

//   try {
//     const place = await prisma.placesToRead.findUnique({
//       where: { id },
//       include: { Description_Places: true },
//     });

//     if (!place) {
//       return res.status(404).json({ error: 'Place not found' });
//     }

//     const description = await prisma.description_Places.create({
//       data: {
//         body,
//         userId,
//         placeId: id,
//       },
//       // include: { user: true },
//     });

//     res.status(201).json({ description });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Something went wrong');
//   }
// });

export default SpotsMapRoute;