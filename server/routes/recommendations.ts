const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';

const Recommendations = express.Router();

const prisma = new PrismaClient();

async function findRandomRows(limit: number) {
  const allRows = await prisma.bookdata.findMany();
  const shuffledRows = allRows.sort(() => 0.5 - Math.random());
  const randomRows = shuffledRows.slice(0, limit);
  return randomRows;
}


Recommendations.get('/random', async (req : Request, res: Response) => {
  try{
  const books = await findRandomRows(20);
  res.send(books);
  }
  catch(error){
    console.error(error);
    res.status(500).send(error);
  }

})


export default Recommendations;