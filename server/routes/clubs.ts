const express = require('express');
import { Request, Response } from "express";
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const ClubsRoute = express.Router();

ClubsRoute.get('/', async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.clubs.findMany();
    res.json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

ClubsRoute.get('/:id/discussion', async (req: Request, res: Response) => {
  try {
    const discussion = await prisma.discussions.findMany({
      where: {
        clubsId: req.params.id,
      },
    });
    res.json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default ClubsRoute;