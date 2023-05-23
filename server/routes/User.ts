/* eslint-disable no-console */
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

User.put('/:id/preferences', async (req, res) => {
  // console.log(req, 273);
  const { id } = req.params;
  const {
    username, firstName, lastName, phoneNumber, longitude,
    latitude,
    radius,
  } = req.body;
  const radNum = Number(radius);
  try {
    const userUpdatePreferences = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        firstName,
        lastName,
        phoneNumber,
        longitude,
        latitude,
        radius: radNum,
      },
    });
    // console.log(userUpdatePreferences, 295);
    res.status(200).json({ userUpdatePreferences });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

User.put('/:id/genres', async (req, res) => {
  // console.log(req, 273);
  const { id } = req.params;
  const { genres } = req.body;
  try {
    const userUpdateGenres = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserGenre: genres,
      },
    });
    // console.log(userUpdatePreferences, 295);
    res.status(200).json({ userUpdateGenres });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

User.put('/:id/hobbies', async (req, res) => {
  // console.log(req, 273);
  const { id } = req.params;
  const { hobbies } = req.body;
  try {
    const userUpdateHobbies = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserHobbies: hobbies,
      },
    });
    // console.log(userUpdatePreferences, 295);
    res.status(200).json({ userUpdateHobbies });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

export default User;
