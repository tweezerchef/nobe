const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BookData = express.Router();

const prisma = new PrismaClient();

BookData.get('/', async (req, res) => {
    const ISBN10 = req.query.ISBN10;
  try {
      const book = await prisma.books.findUnique({
        where: {
          ISBN10: ISBN10,
        },
        select: {
          // include all columns from the books table
          id: true,
          title: true,
          author: true,
          ISBN10: true,
          description: true,
          image: true,
          UserBooks:  {
            select: {
              id: true,
              wishlist: true,
              owned: true,
              booksId: true,
              userId: true,
              rating: true,
              review: true,
              LendingTable: true,
              books: {
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
              user: true,
            }},
          Discussions: true,
          Activity: true,
        },
      });
    //   console.log(book)
      res.send(book);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book data");
    }
  });
// BookData.put('/ISBN', async (req, res) => {
//   const ISBN10 = req.body.ISBN;
//   const newbook = await prisma.Books.upsert({
//     where: { ISBN10: ISBN10 },
//     update: {},
//     create: { ISBN10 : ISBN10, title: title, author: author, image: image, description: description },

//   select: {
//     id: true,
//     title: true,
//     author: true,
//     ISBN10: true,
//     description: true,
//     image: true,
//     UserBooks: {
//       id: true,
//       wishlist: true,
//       owned: true,
//       booksId: true,
//       userId: true,
//       rating: true,
//       review: true,
//       LendingTable: true,
//     },
//     Discussions: true,
//     Activity: true,
//   },});

// })
BookData.get('/title', async (req, res) => {
  const title = req.query.title;
  console.log('poop')
try {
    const book = await prisma.books.findFirst({
      where: {
        title: title,
      },
      select: {
        // include all columns from the books table
        id: true,
        title: true,
        author: true,
        ISBN10: true,
        description: true,
        image: true,
        UserBooks:  {
          select: {
            id: true,
            wishlist: true,
            owned: true,
            booksId: true,
            userId: true,
            rating: true,
            review: true,
            LendingTable: true,
            books: {
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
            user: true,
          }},
        Discussions: true,
        Activity: true,
      },
    });
  //   console.log(book)
    res.send([book]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving book data");
  }
});






export default BookData