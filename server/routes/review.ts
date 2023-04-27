const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';


const Review = express.Router();

const prisma = new PrismaClient();

async function findOrCreateBook(ISBN10: string, title: string, author: string, image: string, description: string ) {
    const newbook = await prisma.Books.upsert({
      where: { ISBN10: ISBN10 },
      update: {},
      create: { ISBN10 : ISBN10, title: title, author: author, image: image, description: description },
    });
    return newbook;;
  }
async function findOrCreateUserBook(booksId: string, userId: string, rating: number) {
    const NewUserBook = await prisma.UserBooks.upsert({
      where: { userId_bookId: { userId, booksId } },
      update: {rating: rating},
      create: { booksId: booksId, userId: userId, rating: rating},

})
    return NewUserBook;}

Review.post('/', async (req: Request, res: Response) => {

  const { book, rating, id } = req.body;

const googleTitle = book.title;
const data = await axios.get(`http://localhost:8080/google-books?title=${googleTitle}`);
const transFormedData = data.data
const { ISBN10, title, author, image, description  } = transFormedData;
 findOrCreateBook(ISBN10, title, author, image, description ).then(newbook =>{
 const booksId = newbook.id;
 findOrCreateUserBook(booksId, id, rating).then(NewUserBook =>{
  //console.log(NewUserBook)
 res.status(201).json(NewUserBook);
 })
 })


})







export { findOrCreateBook }

export default Review