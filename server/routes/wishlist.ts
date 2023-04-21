import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Wishlist = express.Router();

Wishlist.post('/', (req, res) => {
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle} by ${bookAuthor}&key=${process.env.GOOGLE_BOOKS}`)
    .then(response => {
      const bookData = response.data;
      res.send(bookData.items[0])
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error retrieving book data');
    });

  res.sendStatus;
});

export default Wishlist;