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
UserBooks.post('/wishlist', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, book } = req.body;
    const { title, ISBN10, author, image, description } = book
    const newBook = await axios.post(`http://localhost:8080/bookdata/title/wishlist`, {
      title: title,
      ISBN10: ISBN10,
      author: author,
      image: image,
      description: description,

    })
    const bookID = newBook.data.id
    const userBook = await prisma.userBooks.upsert({
      where: {
        userId_bookId: { userId: id, booksId: bookID },
      },
      update: { wishlist: true },
      create: {
        wishlist: true,
        rating: null,
        review: null,
        userId: id,
        booksId: bookID,
        // Books: { connect: { id: bookID } },
        // User: { connectOrCreate: { where: { id }, create: { id } } },
      },
    });
    res.send(userBook).status(200)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

interface UserBooksQuery {
  where: {
    userId: string;
    owned?: boolean;
    wishlist?: boolean;
  };
  include: {
    books: true;
  };
}

export default UserBooks;
