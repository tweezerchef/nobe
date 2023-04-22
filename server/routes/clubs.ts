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
      include: {
        Posts: true
      }
    });
    res.json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

ClubsRoute.get("/:id/posts", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        discussionsId: id,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving posts for discussion");
  }
});

ClubsRoute.post('/:id/discussion', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, title } = req.body;

  try {
    const discussion = await prisma.discussions.create({
      data: {
        title,
        creator: {
          connect: { id: userId },
        },
        clubs: {
          connect: { id },
        },
      },
    });

    res.json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create discussion' });
  }
})

ClubsRoute.post('/:id/join', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  async function addUserToClub(email: string, clubId: string) {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
      const clubMember = await prisma.clubMembers.create({
        data: {
          user: { connect: { id: user.id } },
          club: { connect: { id: clubId } }
        }
      });
      console.log(`Added user ${user.id} to club ${clubMember.clubId}`);
    } else {
      console.log(`User with email ${email} not found`);
    }
  }
  addUserToClub(email, id)
});


export default ClubsRoute;