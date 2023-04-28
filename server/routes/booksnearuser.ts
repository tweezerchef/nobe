const express = require('express');
const axios = require('axios');
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const LocationRoute = express.Router();
import { Request, Response } from "express";
import UserBooks from './userbooks';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // add other properties as needed
  };
}
interface QueryResult {
  id: number;
}


LocationRoute.get('/locations', async (req: AuthenticatedRequest, res: Response) => {
  //console.log(req, 26);
  //console.log(req, 26);
  try {
    const { lon, lat, radius } = req.query
    // console.log(lon, lat, radius);
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

        ],
      },
      select: {
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
                UserBooks: true,
                Discussions: true,
                Activity: true,
                Clubs_Books:true
              },
            },
          },
          where: {
            owned: true,
          },
        },
      },
    })
    console.log(users, 51)
    const ids = users.reduce<string[]>((acc, user) => {
     // acc.push(user.id);
      return acc;
    }, []);

    const userBooksPromises = ids.map(id => prisma.userBooks.findMany({
      where: {
        userId: id
      },
      include: {
        Books: true
      }
    }))
    const userBooks = await Promise.all(userBooksPromises);
    //const books = userBooks.flatMap(userBooksArr => userBooksArr.map(userBook => userBook.books));
    //console.log(userBooks, 67);
    res.status(200).send({ users });
  } catch (error) {
    //console.error('Error getting users within radius:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



LocationRoute.put('/:id/coordinates', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const userUpdateLocation = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        longitude: longitude,
        latitude: latitude
      },
    })
    //console.log(userUpdateLocation);
    res.status(200).json({ userUpdateLocation })
  } catch (e) {
    // console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})

LocationRoute.put('/:id/radius', async (req: AuthenticatedRequest, res: Response) => {
  console.log(req);
  console.log(req.body);
  try {
    const id = req.params.id;
    const radius = req.body.radius
    const userUpdateRadius = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        radius: radius,

      },
    })
    console.log(userUpdateRadius);
    res.status(200).json({ userUpdateRadius })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Server error!',
    })
  }
})



// const userBooks = await prisma.userBooks.findMany({
//   where: {
//     userId: id
//   },
//   include: {
//     books: true
//   }
// });
// // const books = userBooks.map((userBook: UserBooks) => userBook.books);
// res.json(userBooks);



//
// [user, user]
// reduce user to user.id
// userarray = [user.id, user.id]

//  const ret = await prisma.UserBooks.findMany({
//             where: {
//                 id: { in: userarray },
//             }
//         })
// console ret





// try {
//   const query = await prisma.$queryRaw<{id: string}[]>
//     `SELECT id FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude::float8, latitude::float8), ST_MakePoint(${longitude}::float8, ${latitude}::float8)::geography, radius * 10000000)`
// console.log(query, '1');
//   const users = await prisma.user.findMany({
//     where: {
//       id: {
//         in:  query.map(({ id }) => id)
//       }
//     }
//   });
//
//   console.log(users);
//   res.status(200).json({ users });
// } catch (error) {
//   //Handle any errors that may occur
//   console.error(error);
//   res.status(500).json({ error: 'Internal server error' });
//  }



// app.post('/location', async (req, res) => {
//   const { name, location } = req.body
//   try {
//     await prisma.$queryRaw`
//     insert into "Location" ("name", "location") values
//     (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
//     `

//     res.json({
//       success: true,
//     })
//   } catch (e) {
//     console.error(e)
//     res.status(500).json({
//       error: 'Server error!',
//     })
//   }
// })

// app.get(`/:userId/nearby-places`, async (req, res) => {
//   const { userId } = req.params
//   const { d } = req.query
//   const distance = parseInt(String(d)) || 5

//   try {
//     const locations = await prisma.$queryRaw`
//       select * from "locations_near_user"(${parseInt(
//         userId,
//       )}::int, ${distance}::int)
//     `
//     res.json({ data: { locations } })
//   } catch (e) {
//     console.error(e)
//     res.status(500).json({
//       error: 'Server error!',
//     })
//   }
// })




export default LocationRoute;