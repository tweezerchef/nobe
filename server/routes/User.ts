const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const User = express.Router();

const prisma = new PrismaClient();

User.get('/', async (req, res) => {
    const email = req.query.email;
  try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          // include all columns from the books table
          id: true,
          firstName: true,
          username: true,
          email:true,
          googleId: true,
          lastName: true,
          picture: true,
          token: true,
          latitude: true,
          longitude: true,
          radius: true,
          NotificationsCount : true,
          clubMembers: true,
          Activity: true,
          receivedMessages: true,
          sentMessages: true,
          Discussions: true,
          DiscussionsUsers: true,
          Posts:true,
          PostsUsers:true,
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
                  UserBooks: true,
                  Discussions: true,
                  Activity: true,
                },
              },
            },

        },
      }});
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book data");
    }
  });
  User.get('/id', async (req, res) => {
    const id = req.query.id;
  try {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          // include all columns from the books table
          id: true,
          firstName: true,
          username: true,
          email:true,
          googleId: true,
          lastName: true,
          picture: true,
          token: true,
          latitude: true,
          longitude: true,
          radius: true,
          NotificationsCount : true,
          clubMembers: true,
          Activity: true,
          receivedMessages: true,
          sentMessages: true,
          Discussions: true,
          DiscussionsUsers: true,
          Posts:true,
          PostsUsers:true,
          UserBooks: true,
          User_Places: true,
        },
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book data");
    }
  });









export default User