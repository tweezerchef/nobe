import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Trending = express.Router();

Trending.get('/', async (req: Request, res: Response) => {
  let category = req.query.category as string;

  const categoryWithoutQuotes = category.replace(/"/g, '');


  console.log('CATEGORY', categoryWithoutQuotes)

  try {
    const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${categoryWithoutQuotes}.json?api-key=${process.env.NYT_API}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default Trending;