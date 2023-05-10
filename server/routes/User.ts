import express from 'express';
import dotenv from 'dotenv';

const { PrismaClient } = require('@prisma/client');

dotenv.config();

const User = express.Router();

const prisma = new PrismaClient();

User.get('/', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        // include all columns from the books table
        id: true,
        firstName: true,
        username: true,
        email: true,
        googleId: true,
        lastName: true,
        picture: true,
        token: true,
        latitude: true,
        longitude: true,
        radius: true,
        NotificationsCount: true,
        clubMembers: true,
        Activity: true,
        Discussions: true,
        DiscussionsUsers: true,
        Posts: true,
        PostsUsers: true,
        Conversations: {
          select: {
            id: true,
            members: true,
            messages: true,
          },
        },
        User_Places: true,
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
                    User: true,
                  },
                },
                Discussions: true,
                Activity: true,
              },
            },
          },

        },
      },
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving book data');
  }
});
User.get('/id', async (req, res) => {
  const { id } = req.query;
  // console.log('id', id);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        // include all columns from the books table
        id: true,
        firstName: true,
        username: true,
        email: true,
        googleId: true,
        lastName: true,
        picture: true,
        token: true,
        latitude: true,
        longitude: true,
        radius: true,
        NotificationsCount: true,
        clubMembers: true,
        Activity: true,
        Discussions: true,
        DiscussionsUsers: true,
        Posts: true,
        PostsUsers: true,
        Conversations: {
          select: {
            id: true,
            members: true,
            messages: true,
          },
        },
        User_Places: true,
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
                    User: true,
                  },
                },
                Discussions: true,
                Activity: true,
              },
            },
          },

        },
      },
    });
    // console.log(user)
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving book data');
  }
});

User.get('/id/conversations', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        username: true,
        NotificationsCount: true,
        Conversations: {
          select: {
            id: true,
            members: true,
            messages: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            updatedAt: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving conversation data');
  }
});

export default User;
