import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const Wishlist = express.Router();

Wishlist.post('/', async (req, res) => {
  const { isbn, email, title, author } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    let bookData;
    
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS}`);
    bookData = response.data;

    if (bookData.totalItems === 0) {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title} by ${author}&key=${process.env.GOOGLE_BOOKS}`);
      bookData = response.data;
    } 

    const ISBN10 = bookData.items[0].volumeInfo.industryIdentifiers[1]?.identifier;

    let book = await prisma.books.findUnique({ where: { ISBN10 } });

    if (!book) {
      book = await prisma.books.create({
        data: {
          title: bookData.items[0].volumeInfo.title,
          author: bookData.items[0].volumeInfo.authors[0],
          description: bookData.items[0].volumeInfo.description,
          paperback: bookData.items[0].volumeInfo.printType === 'BOOK',
          content: bookData.items[0].volumeInfo.contentVersion,
          image: bookData.items[0].volumeInfo.imageLinks.thumbnail,
          ISBN10,
        },
      });
    }

    const activity = await prisma.activity.create({
      data: {
        userId: user.id,
        type: 'wishlist',
        bookId: book.id,
      },
    })

    const userBook = await prisma.userBooks.create({
      data: {
        wishlist: true,
        owned: false,
        booksId: book.id,
        userId: user.id,
      },
    });

    return res.send(userBook);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error retrieving book data');
  }
});

export default Wishlist;