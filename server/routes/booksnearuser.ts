 const express = require('express');
 const axios = require('axios');
 import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const LocationRoute = express.Router();

// interface User {
//   id: number,
//   books:[]
// }

// LocationRoute.get('/location', async (req, res) => {
// const {longitude, latitude, radius} = req.body;

//   const query = await prisma.$queryRaw<User[]>(
//     `SELECT id, items FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * ${radius})`
//   );

//   const users = await prisma.users.findMany({
//     where: {
//       id: {
//         in: query.map(({ id }) => id)
//       }
//     }
//   })
// });

module.exports = LocationRoute;