import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const prisma = new PrismaClient();
const SpotsMapRoute = express.Router();

SpotsMapRoute.post('/place', async (req: Request, res: Response) => {
  const {
    address, lat, lng, altLoc,
  } = req.body;
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
        message: 'Place already exists',
      });
    }
    const createdPlace = await prisma.placesToRead.create({
      data: {
        Location: address,
        Lat: lat,
        Long: lng,
        altLoc,
      },
    });
    res.status(201).json({ createdPlace });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
  return undefined;
});

SpotsMapRoute.get('/getplace', async (req: Request, res: Response) => {
  const { placeId } = req.query;
  try {
    const place = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components,adr_address,business_status,reviews,formatted_address,geometry,icon,icon_mask_base_uri,website,rating,icon_background_color,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,wheelchair_accessible_entrance&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    res.send(place.data);
  } catch (error) {
    console.error(error);
  }
//  const service = new google.maps.places.PlacesService(map);
// service.getDetails(request, callback);
});

SpotsMapRoute.get('/', async (req: Request, res: Response) => {
  try {
    const places = await prisma.placesToRead.findMany({
      select: {
        id: true,
        nickName: true,
        Location: true,
        Private: true,
        Lat: true,
        Long: true,
        altLoc: true,
        LendingTableIn: true,
        LendingTableOut: true,
        userPlaces: {
          select: {
            id: true,
            userId: true,
            placeId: true,
            Rating: true,
            Review: true,
            CheckIns: true,
            place: true,
            user: true,
          },
        },
        Activity: true,
        Description_Places: {
          select: {
            id: true,
            body: true,
            user: true,
          },
        },
      },
    });
    res.send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

SpotsMapRoute.post('/description', async (req: Request, res: Response) => {
  const { body, placeId, userId } = req.body;

  try {
    const updatedPlace = await prisma.description_Places.upsert({
      where: { userId_placeId: { placeId, userId } },
      update: { body },
      create: { body, placeId, userId },
    });

    res.status(200).json({ updatedPlace });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

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
