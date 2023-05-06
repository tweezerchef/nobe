// Authentication
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { PrismaClient } = require('@prisma/client');

dotenv.config();
const prisma = new PrismaClient();
const Auth = express.Router(); const { GOOGLE_CLIENT_ID } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: 'Invalid user detected. Please try again' };
  }
}
// Helper function to validate email
function isEmailValid(email: string) {
  const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return re.test(email);
}

// Helper function to validate password
function isPasswordValid(password: string) {
  return password.length >= 8;
}
// for form signup
Auth.post('/signup-email', async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: 'invalid_request', error_description: 'Invalid email address' });
  }

  if (!isPasswordValid(password)) {
    return res.status(400).json({ error: 'invalid_request', error_description: 'Password must be at least 8 characters' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        firstName: nickname,
        email,
        googleId: hashedPassword,
        username: nickname,
        token: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'Signup was successful',
      user: {
        nickname: user.nickname,
        email: user.email,
        id: user.id,
        token: jwt.sign({ email: user.email }, process.env.JWT_SECRET as jwt.Secret, {
          expiresIn: '1d',
        }),
      },
    });
  } catch (err: any) {
    console.error(err);

    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'invalid_request', error_description: 'Email already in use' });
    }

    res.status(500).json({ error: 'server_error', error_description: 'An error occurred during user registration' });
  }
});

// for form login
Auth.post('/login-email', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: 'invalid_request', error_description: 'Invalid email address' });
  }

  if (!isPasswordValid(password)) {
    return res.status(400).json({ error: 'invalid_request', error_description: 'Password must be at least 8 characters' });
  }

  const user = await prisma.user.findUnique({
    where: { email },
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

  if (!user) {
    return res.status(404).json({ error: 'invalid_grant', error_description: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.token);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'invalid_grant', error_description: 'Incorrect password' });
  }

  res.status(200).json({
    message: 'Login was successful',
    user,
  });
});

Auth.post('/signup', async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      if (!profile) {
        return res.status(400).json({
          message: 'Unable to retrieve user profile',
        });
      }

      const createdUser = await prisma.user.create({
        data: {
          firstName: profile.given_name ?? '',
          lastName: profile.family_name ?? '',
          email: profile.email ?? '',
          googleId: profile.sub,
          picture: profile.picture ?? '',
        },
      });

      const unique_id = createdUser.id;

      res.status(201).json({
        message: 'Signup was successful',
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          id: unique_id,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, 'mySecret', {
            expiresIn: '1d',
          }),
        },
      });
    }
  } catch (error) {
    console.error(error),
    res.status(500).json({
      message: 'An error occurred. Registration failed.',
    });
  }
});

Auth.post('/login', async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        console.error(verificationResponse.error);
        return res.status(400).json({
          message: verificationResponse.error,

        });
      }
      const profile = verificationResponse?.payload;

      if (!profile) {
        return res.status(400).json({
          message: 'Unable to retrieve user profile',
        });
      }
      const { email } = profile;
      const getUser = await axios.get(`http://localhost:8080/user?email=${email}`);
      const userData = getUser.data;
      // const existsInDB = DB.find((person) => person?.email === profile?.email);
      // console.log(userData)
      if (!userData) {
        return res.status(400).json({
          message: 'You are not registered. Please sign up',
        });
      }
      userData.token = jwt.sign({ email: profile?.email }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
      }),
      res.status(201).json({
        message: 'Login was successful',
        user: {
          userData,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

export default Auth;
