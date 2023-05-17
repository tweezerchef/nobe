import express, { Request, Response } from 'express';
import axios from 'axios';
import { get } from 'http';
import UserBooks from './userbooks';

const { PrismaClient } = require('@prisma/client');

const Review = express.Router();

const prisma = new PrismaClient();

async function getUserBooks(userId: string) {
  const userBooks = await prisma.UserBooks.findMany({
    where: {
      userId,
    },
  });
  return userBooks;
}

// async function findOrCreateBook(
//   ISBN10: string,
//   title: string,
//   author: string,
//   image: string,
//   description: string,
// ) {
//   const newbook = await prisma.Books.upsert({
//     where: { ISBN10 },
//     update: {},
//     create: {
//       ISBN10, title, author, image, description,
//     },
//   });
//   return newbook;
// }
async function findOrCreateUserBook(booksId: string, userId: string, rating: number) {
  const NewUserBook = await prisma.UserBooks.upsert({
    where: { userId_bookId: { userId, booksId } },
    update: { rating },
    create: { booksId, userId, rating },

  });
  return NewUserBook;
}

Review.post('/', async (req: Request, res: Response) => {
  const { book, rating, id } = req.body;

  // const googleTitle = book.title;
  // const data = await axios.get(`http://localhost:8080/google-books?title=${googleTitle}`);
  // const transFormedData = data.data
  const {
    ISBN10, title, author, image, description,
  } = book;
  // findOrCreateBook(ISBN10, title, author, image, description )
  axios.post('http://localhost:8080/bookdata/title', {
    title,
    ISBN10,
    author,
    image,
    description,
  })
    .then((newbook) => {
      const booksId = newbook.data.id;
      findOrCreateUserBook(booksId, id, rating);
      prisma.activity.create({
        data: {
          userId: id,
          type: 'review',
          bookId: booksId,
          description: `${rating}`,
        },
      })
        .then(() => {
          getUserBooks(id).then((userBooks) => {
            res.send(userBooks).status(201);
          });
        });
    }).catch((error) => {
      console.error(error),
      res.sendStatus(500);
    });
  Review.post('/WrittenReview', async (req: Request, res: Response) => {
    console.log('poop');
    const { book, review, id } = req.body;

    const {
      ISBN10, title, author, image, description,
    } = book;

    axios.post('http://localhost:8080/bookdata/title', {
      title,
      ISBN10,
      author,
      image,
      description,

    }).then(async (newbook) => {
      const booksId = newbook.data.id;
      const userId = id;
      await prisma.UserBooks.upsert({
        where: { userId_bookId: { userId, booksId } },
        update: { review },
        create: { booksId, userId, review },

      });
    }).then(() => {
      getUserBooks(id).then((userBooks) => {
        res.send(userBooks).status(201);
      });
    }).catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      console.error(error),
      res.sendStatus(500);
    });
  });
});

export default Review;
