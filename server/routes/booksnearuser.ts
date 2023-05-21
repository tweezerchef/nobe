/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
// import UserBooks from './userbooks';

const express = require('express');
// const axios = require('axios');

const prisma = new PrismaClient();
const LocationRoute = express.Router();

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}
LocationRoute.get('/locations/home', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      lon, lat, radius, id,
    } = req.query;

    console.log(req.query);
    //  coordinates are sent in the request body
    if (!lat || !lon || !radius || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing coordinates or radius' });
    }
    // Cast lat, lon, and radius to numbers
    const wishList = await prisma.userBooks.findMany({
      where: {
        userId: id,
        wishlist: true,
      },
    });
    const wishlistBookIds = wishList.map((book: any) => book.booksId);

    const latNum = Number(lat);
    const lonNum = Number(lon);
    const radiusNum = Number(radius);
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: latNum - radiusNum / 69.0,
              lte: latNum + radiusNum / 69.0,
            },
          },
          {
            longitude: {
              gte: lonNum - radiusNum / (69.0 * Math.cos(latNum * Math.PI / 180.0)),
              lte: lonNum + radiusNum / (69.0 * Math.cos(latNum * Math.PI / 180.0)),
            },
          },
          {
            UserBooks: {
              some: {
                owned: true,
              },
            },
          },
        ],
      },
      select: {
        // include all columns from the books table
        id: true,
        firstName: true,
        username: true,
        email: true,
        googleId: true,
        lastName: true,
        picture: true,
        UserBooks: {
          select: {
            id: true,
            wishlist: true,
            owned: true,
            booksId: true,
            userId: true,
            rating: true,
            review: true,
            LendingTable: true,
            User: true,
            Books: {
              select: {
                id: true,
                title: true,
                author: true,
                ISBN10: true,
                description: true,
                image: true,
              },
            },
          },
          where: {
            owned: true,
          },
        },
      },
    });
    // filter out users the users that don't have any userbooks
    const usersWithBooks = users.filter((user: any) => user.UserBooks.length > 0);

    const userBooksArray = usersWithBooks.map((user: any) => {
      // remove any userbooks array that is the own user
      if (user.id !== id) {
        const userBooks = user.UserBooks;
        return userBooks;
      }
    });
    // flatten array so that it is an array of userbooks w/o the user object
    const flatUserBooksArray = userBooksArray.flat();
    // filter out any userbooks that in the flatUserBooksArray that have the same book.id as the numbers in the bookIds array
    const filteredUserBooksArray = flatUserBooksArray.filter((userBook: any) => {
      if (userBook && userBook.booksId) {
        return wishlistBookIds.includes(userBook.booksId);
      }
      return false;
    });

    res.status(200).send(filteredUserBooksArray);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

LocationRoute.get('/locations', async (req: AuthenticatedRequest, res: Response) => {
  // console.log(req, 21);
  // console.log(req, 26);
  try {
    const { lon, lat, radius } = req.query;
    // console.log(lon, lat, radius, 25);
    //  coordinates are sent in the request body
    if (!lat || !lon || !radius) {
      return res.status(400).json({ error: 'Missing coordinates or radius' });
    }
    // Cast lat, lon, and radius to numbers
    const latNum = Number(lat);
    const lonNum = Number(lon);
    const radiusNum = Number(radius);
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: latNum - radiusNum / 69.0,
              lte: latNum + radiusNum / 69.0,
            },
          },
          {
            longitude: {
              gte: lonNum - radiusNum / (69.0 * Math.cos(latNum * Math.PI / 180.0)),
              lte: lonNum + radiusNum / (69.0 * Math.cos(latNum * Math.PI / 180.0)),
            },
          },
          {
            UserBooks: {
              some: {
                owned: true,
              },
            },
          },
        ],
      },
      select: {
        // include all columns from the books table
        id: true,
        firstName: true,
        username: true,
        email: true,
        googleId: true,
        lastName: true,
        picture: true,
        token: true,
        latitude: true,
        longitude: true,
        radius: true,
        NotificationsCount: true,
        clubMembers: true,
        Activity: true,
        Discussions: true,
        DiscussionsUsers: true,
        Posts: true,
        PostsUsers: true,
        Conversations: {
          select: {
            id: true,
            members: true,
            messages: true,
          },
        },
        UserBooks: {
          select: {
            id: true,
            wishlist: true,
            owned: true,
            booksId: true,
            userId: true,
            rating: true,
            review: true,
            LendingTable: true,
            Books: {
              select: {
                id: true,
                title: true,
                author: true,
                ISBN10: true,
                description: true,
                image: true,
                UserBooks: {
                  select: {
                    id: true,
                    wishlist: true,
                    owned: true,
                    booksId: true,
                    userId: true,
                    rating: true,
                    review: true,
                    LendingTable: true,
                    User: true,
                  },
                },
                Discussions: true,
                Activity: true,
              },
            },
          },
          where: {
            owned: true,
          },
        },
      },
    });
    // console.log(users, 67);
    res.status(200).send(users);
  } catch (error) {
    // console.error('Error getting users within radius:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

LocationRoute.put('/:id/coordinates', async (req: AuthenticatedRequest, res: Response) => {
  // console.log(req);
  try {
    const { id } = req.params;
    const { latitude } = req.body;
    const { longitude } = req.body;
    const userUpdateCoordinates = await prisma.user.update({
      where: {
        id,
      },
      data: {
        longitude,
        latitude,
      },
    });
    // console.log(userUpdateLocation, 145);
    res.status(200).json({ userUpdateCoordinates });
  } catch (e) {
    // console.error(e)
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

LocationRoute.put('/:id/radius', async (req: AuthenticatedRequest, res: Response) => {
  // console.log(req);
  // console.log(req.body);
  try {
    const { id } = req.params;
    const { radius } = req.body;
    const radNum = Number(radius);
    const userUpdateRadius = await prisma.user.update({
      where: {
        id,
      },
      data: {
        radius: radNum,

      },
    });
    // console.log(userUpdateRadius);
    res.status(200).json({ userUpdateRadius });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

LocationRoute.put('/:id/location', async (req: AuthenticatedRequest, res: Response) => {
  // console.log(req);
  try {
    const { id } = req.params;
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const { radius } = req.body;
    const radNum = Number(radius);

    const userUpdateLocation = await prisma.user.update({
      where: {
        id,
      },
      data: {
        longitude: lon,
        latitude: lat,
        radius: radNum,
      },
    });
    // console.log(userUpdateLocation, 145);
    res.status(200).json({ userUpdateLocation });
  } catch (e) {
  // console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

LocationRoute.get('/:id/location', async (req: AuthenticatedRequest, res: Response) => {
  // console.log(req);
  const { id } = req.params as any;
  // console.log('id', id);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        // include all columns from the books table
        id: true,
        latitude: true,
        longitude: true,
        radius: true,
      },
    });
      // console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving user data', error });
  }
});

export default LocationRoute;
