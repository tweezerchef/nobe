import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();
const Places = express.Router();

Places.get('/', async (req: Request, res: Response) => {
  try {
    const places = await prisma.placesToRead.findMany({
      select: {
        id: true,
        name: true,
        nickName: true,
        location: true,
        Private: true,
        Lat: true,
        Long: true,
        rating: true,
        phone: true,
        website: true,
        types: true,
        placeEditorial: true,
        googlePlaceId: true,
        LendingTableIn: true,
        LendingTableOut: true,
        userPlaces: {
          select: {
            id: true,
            userId: true,
            placeId: true,
            Rating: true,
            text: true,
            CheckIns: true,
            place: true,
            user: true,
          },
        },
        Activity: true,
        Places_Pictures: true,
      },
      orderBy: {
        rating: 'desc', // Order by rating in descending order
      },
      take: 10, // Limit the result to ten records
    });

    res.send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

export default Places;
