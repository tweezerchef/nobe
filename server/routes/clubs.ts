import { Request, Response } from 'express';

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const ClubsRoute = express.Router();

ClubsRoute.get('/', async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.clubs.findMany({
      include: {
        clubMembers: true,
      },
    });
    res.json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

ClubsRoute.get('/:id', async (req: Request, res: Response) => {
  try {
    const club = await prisma.clubs.findMany({
      where: {
        id: req.params.id,
      },
    });
    res.json(club);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

ClubsRoute.get('/:id/discussion', async (req: Request, res: Response) => {
  try {
    const discussion = await prisma.discussions.findMany({
      where: {
        clubsId: req.params.id,
      },
      include: {
        Posts: true,
        clubs: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
          },
        },
      },
    });
    res.json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

ClubsRoute.get('/:id/posts', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        discussionsId: id,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            picture: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving posts for discussion');
  }
});

ClubsRoute.get('/discussions/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const discussion = await prisma.discussions.findUnique({
      where: {
        id,
      },
      include: {
        clubs: {
          select: { name: true },
        },
        creator: {
          select: {
            id: true, firstName: true, lastName: true, username: true,
          },
        },
      },
    });
    res.json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

ClubsRoute.post('/:id/posts', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, body } = req.body;
  try {
    const post = await prisma.posts.create({
      data: {
        body,
        user: {
          connect: { id: userId },
        },
        discussion: {
          connect: { id },
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
          },
        },
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

ClubsRoute.delete('/:id/posts/:postId', async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await prisma.posts.delete({
      where: { id: postId },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
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

    res.status(201).send(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create discussion' });
  }
});

ClubsRoute.get('/:id/join', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.params;
  try {
    const clubMembers = await prisma.clubMembers.findUnique({
      where: {
        id,
        userId,
      },
    });
    res.json(clubMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ClubsRoute.post('/join', async (req: Request, res: Response) => {
  const { id, clubId } = req.body;
  const clubMember = await prisma.clubMembers.findUnique({
    where: {
      userId_clubId: {
        userId: id,
        clubId,
      },
    },
  });
  if (clubMember !== null) {
    await prisma.clubMembers.delete({
      where: {
        id: clubMember.id,
      },
    }).then((club: any) => {
      res.send(club).status(200);
    });
  } else {
    await prisma.clubMembers.create({
      data: {
        userId: id,
        clubId,
      },
    }).then((club: any) => {
      res.send(club).status(200);
    });
  }
});

export default ClubsRoute;
