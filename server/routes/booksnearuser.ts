const express = require('express');
const axios = require('axios');
import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()
const LocationRoute = express.Router();
import { Request, Response } from "express";


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // add other properties as needed
  };
}
interface QueryResult {
  id: number;
}


// LocationRoute.get('/locations', async (req: AuthenticatedRequest, res: Response) => {
//   const { longitude, latitude, radius } = req.query
//   console.log(longitude, latitude, radius);
//   try {
//     const query = await prisma.$queryRaw<User[]>
//     `SELECT id FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * 1000)`
//     const users = await prisma.user.findMany({
//       where: {
//         id: {
//           in: (await query).map(({ id }) => id)
//         }
//       }
//     });
//     // Send the response to the React front-end
//     console.log(users);
//     res.status(200).json({ users });
//   } catch (error) {
//     //Handle any errors that may occur
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//    }
// });

// app.post('/user', async (req, res) => {
//   const { name, location } = req.body
//   try {
//     const response: any = (await prisma.$queryRaw`
//     insert into "User" ("name", "location") values
//     (${name}, "public"."st_point"(${location.lng}, ${location.lat}))
//     returning id`) as any

//     res.json({
//       success: true,
//       id: response[0].id,
//     })
//   } catch (e) {
//     console.error(e)
//     res.status(500).json({
//       error: 'Server error!',
//     })
//   }
// })

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