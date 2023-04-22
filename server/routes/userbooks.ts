const express = require('express');
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
  user: {
    id: string;

  };
}

const prisma = new PrismaClient();
const UserBooks = express.Router();

UserBooks.post('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, wishlist, owned } = req.body;
    const { id } = req.params;
    console.log(id)

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?key=&q=intitle:${title}`);
    const bookData = response.data.items[0].volumeInfo;
    const isbn10 = bookData.industryIdentifiers[1].identifier;

    const existingBook = await prisma.books.findUnique({
      where: {
        ISBN10: isbn10,
      },
      include: {
        UserBooks: true,
      },
    });

    let userBook;
    if (existingBook) {
      userBook = await prisma.userBooks.findUnique({
        where: {
          userId_bookId: {
            booksId: existingBook.id,
            userId: id,
          },
        },
      });
    }

    if (userBook) {
      res.json(userBook);
    } else if (existingBook) {
      userBook = await prisma.userBooks.create({
        data: {
          wishlist,
          owned,
          user: { connect: { id: id } },
          books: { connect: { id: existingBook.id } },
        },
        include: {
          books: true,
        },
      });
      res.json(userBook);
    } else {
      const createdBook = await prisma.books.create({
        data: {
          title: bookData.title,
          author: bookData.authors[0],
          description: bookData.description,
          // genre: { create: bookData.categories.map((name: string) => ({ name })) },
          image: bookData.imageLinks.thumbnail,
          ISBN10: isbn10,
          UserBooks: {
            create: {
              wishlist,
              owned,
              user: { connect: { id: id } },
            },
          },
        },
        include: {
          UserBooks: true,
        },
      });

      res.json(createdBook);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



UserBooks.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userBooks = await prisma.userBooks.findMany({
      where: {
        userId: id
      },
      include: {
        books: true
      }
    });
    // const books = userBooks.map((userBook: UserBooks) => userBook.books);
    res.json(userBooks);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
});

export default UserBooks;
