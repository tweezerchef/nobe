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

ClubsRoute.post('/:id/join', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const club = await prisma.clubs.findUnique({
      where: {
        id: id,
      }
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const updatedClub = await prisma.clubmembers.create({
      data: {
        clubs: {
          connect: {
            id: id,
          }
        }
      }
    });

    // const updatedClub = await prisma.clubs.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     clubMembers: {
    //       connect: {
    //         id: id,
    //       }
    //     }
    //   }
    // });

    res.json(updatedClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default ClubsRoute;