import { Request, Response } from 'express';

const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

interface AuthenticatedRequest extends Request {
  user: {
    id: string;

  };
}

const prisma = new PrismaClient();
const UserBooks = express.Router();

UserBooks.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userBooks = await prisma.userBooks.findMany({
      where: {
        userId: id,
      },
      include: {
        books: true,
      },
    });
    // const books = userBooks.map((userBook: UserBooks) => userBook.books);
    res.json(userBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

UserBooks.post('/wishlist', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, book, color } = req.body;
    const {
      title, ISBN10, author, image, description,
    } = book;
    let wishlist = false;
    if (color === 'danger') wishlist = true;

    const newBook = await axios.post('http://localhost:8080/bookdata/title/wishlist', {
      title,
      ISBN10,
      author,
      image,
      description,

    });
    const bookID = newBook.data.id;
    const userBook = await prisma.userBooks.upsert({
      where: {
        userId_bookId: { userId: id, booksId: bookID },
      },
      update: { wishlist },
      create: {
        wishlist: true,
        rating: null,
        review: null,
        userId: id,
        booksId: bookID,

      },
    });
    res.send(userBook).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

UserBooks.post('/lendinglibrary', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, book, color } = req.body;
    const {
      title, ISBN10, author, image, description,
    } = book;
    let owned = false;
    if (color === 'danger') owned = true;

    const newBook = await axios.post('http://localhost:8080/bookdata/title/wishlist', {
      title,
      ISBN10,
      author,
      image,
      description,

    });
    const bookID = newBook.data.id;
    const userBook = await prisma.userBooks.upsert({
      where: {
        userId_bookId: { userId: id, booksId: bookID },
      },
      update: { owned },
      create: {
        owned: true,
        rating: null,
        review: null,
        userId: id,
        booksId: bookID,

      },
    });
    res.send(userBook).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default UserBooks;
