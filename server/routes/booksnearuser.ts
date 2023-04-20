 const express = require('express');
 const axios = require('axios');
 import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const LocationRoute = express.Router();


// LocationRoute.get('/location', async (req, res) => {
//   try {
//     const { longitude, latitude, radius } = req.body;
//     const query = await prisma.$queryRaw<{}>(
//       `SELECT id, items FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * ${radius})`
//     );

//     const users = await prisma.user.findMany({
//       where: {
//         id: {
//           in: query.map(({ id }) => id)
//         }
//       }
//     });

//     // Send the response to the React front-end
//     res.status(200).json({ users });
//   } catch (error) {
//     // Handle any errors that may occur
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default LocationRoute;