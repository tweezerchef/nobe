/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';

const { PrismaClient } = require('@prisma/client');

dotenv.config();

const User = express.Router();

const prisma = new PrismaClient();

User.get('/', async (req, res) => {
  const { email } = req.query;
  console.log('email', email);
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
        friendships: {
          select: {
            id: true,
            userId: true,
            friendId: true,
            confirmed: true,
            friend: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                googleId: true,
                picture: true,
                token: true,
                latitude: true,
                longitude: true,
                radius: true,
                NotificationsCount: true,
                clubMembers: true,
                Activity: true,
                Discussions: true,
                UserBooks: true,
                User_Places: true,
                Posts: true,
              },
            },
          },
        },
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
    console.log('user', user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving book data');
  }
});
User.get('/id', async (req, res) => {
  const { id } = req.query;
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
        friendships: {
          select: {
            id: true,
            userId: true,
            friendId: true,
            confirmed: true,
            friend: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                googleId: true,
                picture: true,
                token: true,
                latitude: true,
                longitude: true,
                radius: true,
                NotificationsCount: true,
                clubMembers: true,
                Activity: true,
                Discussions: true,
                UserBooks: true,
                User_Places: true,
                Posts: true,
              },
            },
          },
        },
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

async function findRandomRows(limit: number) {
  const allRows = await prisma.user.findMany({
    take: 50,
    select: {
      id: true,
      firstName: true,
      username: true,
      picture: true,
      latitude: true,
      longitude: true,
      radius: true,
      Activity: true,
      clubMembers: true,
      Discussions: true,
      friendships: true,
      Posts: true,
      UserBooks: true,
      User_Places: true,
      UserGenre: true,
      UserHobbies: true,
    },
  });
  const shuffledRows = allRows.sort(() => 0.5 - Math.random());
  const randomRows = shuffledRows.slice(0, limit);
  return randomRows;
}

User.get('/allUsers', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        username: true,
      },
    });
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving conversation data');
  }
});

User.get('/randomUsers', async (req, res) => {
  try {
    const users = await findRandomRows(10);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving conversation data');
  }
});

export default User;
