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


LocationRoute.get('/locations', async (req: AuthenticatedRequest, res: Response) => {
  const { longitude, latitude, radius } = req.query
  console.log(longitude, latitude, radius);
  try {
    const query = await prisma.$queryRaw<User[]>
    `SELECT id FROM "User" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * 1000)`
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: (await query).map(({ id }) => id)
        }
      }
    });
    // Send the response to the React front-end
    console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    //Handle any errors that may occur
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
   }
});

export default LocationRoute;