import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const SpotsMapRoute = express.Router();


SpotsMapRoute.post("/api/places-to-read", async (req: Request, res: Response) => {
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
    }
    const createdPlace = await prisma.placesToRead.create({
      data: {
        Location: address,
        Lat: lat,
        Long: lng,
      },
    });
    res.status(201).json({ createdPlace });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

export default SpotsMapRoute;