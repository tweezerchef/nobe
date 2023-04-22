const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';


const Review = express.Router();

const prisma = new PrismaClient();

async function findOrCreateBook(ISBN10: string, title: string, author: string, image_url: string) {
    const newbook = await prisma.Books.upsert({
      where: { ISBN10: ISBN10 },
      update: {},
      create: { ISBN10 : ISBN10, title: title, author: author, image: image_url},
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
console.log(id);
const { title, author, ISBN10, image_url} = book;
findOrCreateBook(ISBN10, title, author, image_url).then(newbook =>{
const booksId = newbook.id;
findOrCreateUserBook(booksId, id, rating).then(NewUserBook =>{
    console.log(NewUserBook);
res.status(201).json(NewUserBook);
})
})


})









export default Review