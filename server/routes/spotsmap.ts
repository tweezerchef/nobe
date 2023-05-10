/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const prisma = new PrismaClient();
const SpotsMapRoute = express.Router();

SpotsMapRoute.post('/place', async (req: Request, res: Response) => {
  const {
    place, id, color, email, google,
  } = req.body;
  const {
    formatted_address, geometry, name, photos,
    place_id, reviews, types, website, rating, formatted_phone_number,
  } = place;

  let myFav = false;
  if (color === 'danger') {
    myFav = true;
  }
  let createdPlace: any;
  try {
    if (google) {
      createdPlace = await prisma.placesToRead.upsert({
        where: { googlePlaceId: place_id },
        update: {},
        create: {
          location: formatted_address,
          Lat: geometry.location.lat,
          Long: geometry.location.lng,
          googlePlaceId: place_id,
          name,
          website,
          rating,
          types,
          phone: formatted_phone_number,
        },
        include: {
          Places_Pictures: true,
          userPlaces: true,
        },
      });
      if (photos) {
        photos.forEach(async (photo: { photo_reference: any; }) => {
          await prisma.places_Pictures.create({
            data: {
              placeId: createdPlace.id,
              url: photo.photo_reference,
              googlePic: true,

            },
          });
        });
      }
      if (reviews) {
        reviews.forEach(async (review: { text: any; }) => {
          await prisma.user_Places.create({
            data: {
              placeId: createdPlace.id,
              googlePlaceId: place_id,
              text: review.text,
            },
          });
        });
      }
    }

    prisma.activity.create({
      data: {
        userId: id,
        type: 'location',
        description: `${name}`,
      },
    });
    const placeId = createdPlace?.id ? createdPlace.id : place.id;
    const googlePlaceId = createdPlace?.googlePlaceId
      ? createdPlace.googlePlaceId : place.googlePlaceId;

    prisma.user_Places.upsert({
      where: { userId_placeId: { userId: id, placeId } },
      update: { favorite: myFav },
      create: {
        favorite: myFav,
        place: { connect: { id: placeId } },
        user: { connect: { id } },
        googlePlaceId,
      },
    }).then((response) => console.log(response));
    const userData = await axios.get(`http://localhost:8080/user?email=${email}`);
    const user = userData.data;
    res.send(user).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

SpotsMapRoute.get('/getplace', async (req: Request, res: Response) => {
  const { placeId } = req.query;
  let place;
  let google = false;
  try {
    if (typeof placeId === 'string') {
      place = await prisma.placesToRead.findFirst({
        where: { googlePlaceId: placeId },
        include: {
          LendingTableIn: true,
          LendingTableOut: true,
          userPlaces: true,
          Activity: true,
          Places_Pictures: true,
        },
      });
      if (!place) {
        google = true;
        place = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,formatted_address,geometry,website,rating,name,photo,place_id,formatted_phone_number,type&key=${process.env.GOOGLE_MAPS_API_KEY}`);
        place = place.data;
      }
      res.send({ place, google }).status(200);
    }
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
        location: true,
        Private: true,
        Lat: true,
        Long: true,
        rating: true,
        phone: true,
        website: true,
        types: true,
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
    });
    res.send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

SpotsMapRoute.post('/writtenReview', async (req: Request, res: Response) => {
  const {
    Review, userId, googlePlaceId,
  } = req.body;
  const place = await prisma.placesToRead.findUnique({
    where: { googlePlaceId },
  });

  if (!place) {
    return res.status(404).send('Place not found');
  }

  const placeId = place.id;

  try {
    const updatedPlace = await prisma.user_Places.upsert({
      where: { userId_placeId: { placeId, userId } },
      update: { text: Review },
      create: {
        text: Review,
        googlePlaceId,
        place: { connect: { id: placeId } },
        user: { connect: { id: userId } },
      },
    });

    res.status(200).send(updatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// SpotsMapRoute.post('/addPlace', async (req: Request, res: Response) => {
//   const { place, userId } = req.body;
//   try{
//     const newPlace = await prisma.placesToRead.create({
//       data: {
//       create:{
//     }
//     }
//     catch (error) {
//     console.error(error);
//     res.status(500).send('Something went wrong');
//     }
//   });
// SpotsMapRoute.post('/places/:id/description', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body, userId } = req.body;

//   try {
//     const place = await prisma.placesToRead.findUnique({
//       where: { id },
//       // include: { Description_Places: true },
//     });

//     if (!place) {
//       return res.status(404).json({ error: 'Place not found' });
//     }

//     // const description = await prisma.description_Places.create({
//     //   data: {
//     //     body,
//     //     userId,
//     //     placeId: id,
//     //   },
//     //   // include: { user: true },
//     // });

//     res.status(201).json({ description });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Something went wrong');
//   }
// });

export default SpotsMapRoute;
