const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Wishlist from './wishlist';

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
              // Books: {
              //   select: {
              //     id: true,
              //     title: true,
              //     author: true,
              //     ISBN10: true,
              //     description: true,
              //     image: true,
              //     UserBooks: true,
              //     Discussions: true,
              //     Activity: true,
              //   },
              // },
              User: true,
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
BookData.post('/title/owned', async (req, res) => {
  const {title, ISBN10, author, image, description, owned }= req.body;

  const newBook = await prisma.Books.upsert({
    where: { title: title },
    update: {owned: owned},
    create: { ISBN10 : ISBN10, title: title, author: author, image: image, description: description },

  select: {
    id: true,
    title: true,
    author: true,
    ISBN10: true,
    description: true,
    image: true,
    UserBooks: {
      select:{
      id: true,
      wishlist: true,
      owned: true,
      booksId: true,
      userId: true,
      rating: true,
      review: true,
      LendingTable: true,
      User: true,
    }
  },
    Discussions: true,
    Activity: true,
    Clubs_Books: true,
  },});
res.send(newBook)
})
BookData.post('/title/wishlist', async (req, res) => {
  const {title, ISBN10, author, image, description, wishlist }= req.body;
  const newBook = await prisma.Books.upsert({
    where: { title: title },
    update: {},
    create: { ISBN10 : ISBN10, title: title, author: author, image: image, description: description },

  select: {
    id: true,
    title: true,
    author: true,
    ISBN10: true,
    description: true,
    image: true,
    // UserBooks: {
    //   //id: true,
    //   wishlist: true,
    //   owned: true,
    //   booksId: true,
    //   userId: true,
    //   rating: true,
    //   review: true,
    //   LendingTable: true,
    //   User: true,
    // },
    Discussions: true,
    Activity: true,
    Clubs_Books: true,
  },});


res.send(newBook)
})
BookData.get('/title', async (req, res) => {
  const title = req.query.title;
  console.log('poop')
  console.log(title)
try {
    const book = await prisma.books.findFirst({
      where: {
        title: {
          contains: title,
        },
      },
      select: {
        id: true,
        title: true,
        author: true,
        ISBN10: true,
        description: true,
        image: true,
        Discussions: true,
        Activity: true,
        Clubs_Books: true,
        UserBooks:{
          select:{
          id: true,
          wishlist: true,
          owned: true,
          booksId: true,
          userId: true,
          rating: true,
          review: true,
          LendingTable: true,
          User: true,
        }
      }

      }
    });
     console.log(book)
    res.send([book]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving book data");
  }
});






export default BookData