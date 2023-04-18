const express = require('express');
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // add other properties as needed
  };
}

const prisma = new PrismaClient();
const UserBooks = express.Router();

UserBooks.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, wishlist, owned } = req.body;

    // make request to get book from API
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=YOUR_API_KEY`);
    const bookData = response.data.items[0].volumeInfo;

    // add book to database
    const createdBook = await prisma.books.create({
      data: {
        title: bookData.title,
        author: bookData.authors[0],
        description: bookData.description,
        genre: { create: bookData.categories.map((name: string) => ({ name })) },
        paperback: bookData.printType === 'BOOK',
        content: bookData.contentVersion,
        user: { connect: { id: req.user.id } },
        UserBooks: {
          create: {
            wishlist,
            owned,
            user: { connect: { id: req.user.id } },
          },
        },
      },
      include: {
        UserBooks: true,
      },
    });

    res.json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default UserBooks;
