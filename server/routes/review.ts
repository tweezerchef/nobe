const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';


const Review = express.Router();

const prisma = new PrismaClient();

// async function findOrCreateBook(ISBN10: string, book: object) {
//     const newbook = await prisma.Books.upsert({
//       where: { ISBN10: ISBN10 },
//       update: {},
//       create: { username },
//     });
//     return newbook;;
//   }

Review.post('/', async (req: Request, res: Response) => {
const { book, rating, userID } = req.body;
console.log(book, rating, userID);

})









export default Review