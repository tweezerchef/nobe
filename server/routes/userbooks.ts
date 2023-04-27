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
    const { title, inventory } = req.body;
    const { id } = req.params;
    let wishlist;
    let owned;
    if (inventory === 'Wishlist') {
      wishlist = true;
    } else {
      owned = true;
    }
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?key=&q=intitle:${title}`);
    const bookData = response.data.items[0].volumeInfo;
    const isbn10 = bookData.industryIdentifiers[1].identifier;

    const existingBook = await prisma.books.findUnique({
      where: {
        ISBN10: isbn10,
      },
      select: {
        id: true,
        title: true,
        author: true,
        image: true,
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
      const updatedUserBook = await prisma.userBooks.update({
        where: { id: userBook.id },
        data: {
          wishlist: inventory === 'Wishlist',
          owned: inventory === 'Owned',
        },
        include: { books: true },
      });
      const bookWithUserBook = {
        ...existingBook,
        UserBooks: [updatedUserBook],
      };
      res.json(bookWithUserBook);
    } else if (existingBook) {
      userBook = await prisma.userBooks.create({
        data: {
          wishlist,
          owned,
          user: { connect: { id: id } },
          books: { connect: { id: existingBook.id } },
        },
        include: { books: true },
      });
      const bookWithUserBook = {
        ...existingBook,
        UserBooks: [userBook],
      };
      res.json(bookWithUserBook);
    } else {
      const thumbnail = bookData.imageLinks?.thumbnail || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
      const createdBook = await prisma.books.create({
        data: {
          title: bookData.title,
          author: bookData.authors[0],
          description: bookData.description,
          // genre: { create: bookData.categories.map((name: string) => ({ name })) },
          image: thumbnail,
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

UserBooks.get('/:id/:type', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, type } = req.params;

    let userBooksQuery: UserBooksQuery = {
      where: {
        userId: id
      },
      include: {
        books: true
      }
    };

    if (type === 'Owned') {
      userBooksQuery.where = {
        ...userBooksQuery.where,
        owned: true
      };
    } else if (type === 'Wishlist') {
      userBooksQuery.where = {
        ...userBooksQuery.where,
        wishlist: true
      };
    }

    const userBooks = await prisma.userBooks.findMany(userBooksQuery);

    res.json(userBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

UserBooks.delete('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.params.id;

    await prisma.userBooks.deleteMany({
      where: {
        userId: userId,
        booksId: bookId
      }
    });

    res.status(200).json({ message: 'Book removed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing book.' });
  }
});


export default UserBooks;
