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
        User: true,
      },
    });
    // const books = userBooks.map((userBook: UserBooks) => userBook.books);
    res.send(userBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

UserBooks.get('/owned/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userBooks = await prisma.userBooks.findMany({
      where: {
        userId: id,
        owned: true,
      },
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
        User: true,
      },
    });
    // const books = userBooks.map((userBook: UserBooks) => userBook.books);
    res.send(userBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
UserBooks.get('/wishlist/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userBooks = await prisma.userBooks.findMany({
      where: {
        userId: id,
        wishlist: true,
      },
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
        User: true,
      },
    });
    // const books = userBooks.map((userBook: UserBooks) => userBook.books);
    res.send(userBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

UserBooks.get('/favorites/:id', async (req: AuthenticatedRequest, res: Response) => { // get all books that have been rated 4 or 5 stars
  try {
    const { id } = req.params;
    const userBooks = await prisma.userBooks.findMany({
      where: {
        userId: id,
        rating: {
          gte: 4,
        },
      },
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
        User: true,
      },
    });
    const books = userBooks.map((userBook: typeof UserBooks) => userBook.Books);
    res.send(books);
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

    const newBook = await axios.post('http://localhost:8080/bookdata/title', {
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
    const activity = await prisma.activity.create({
      data: {
        userId: id,
        type: 'Wishlist',
        bookId: bookID,
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

    const newBook = await axios.post('http://localhost:8080/bookdata/title', {
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
    const activity = await prisma.activity.create({
      data: {
        userId: id,
        type: 'Owned',
        bookId: bookID,
      },
    });
    res.send(userBook).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default UserBooks;
