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
          clubMembers: true,
          Discussions: true,
          Posts:true,
          books: true,
        },
      });
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
          clubMembers: true,
          Discussions: true,
          Posts:true,
          books: true,
        },
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book data");
    }
  });









export default User