const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { title } from 'process';

dotenv.config();

const GoogleBooks = express.Router();

const prisma = new PrismaClient();


function getISBN(volumeInfo: any) {
    const identifiers = volumeInfo;
    if (identifiers) {
      for (const identifierObj of identifiers) {
        if (identifierObj.type === 'ISBN_10') {
          return identifierObj.identifier;
        }
        if (identifierObj.type === 'ISBN_13') {
          return identifierObj.identifier;
        }
      }
    }
    return ''; // return an empty string when no ISBN-10 is found
  }
  function getLargestImage(imageLinks: any): string {
    const imageSizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
    for (const size of imageSizes) {
      if (imageLinks[size]) {
        return imageLinks[size];
      }
    }
    return ''; // return an empty string when no image is found
  }
  async function getGoogleBooksData(title: string) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${title}&key=${process.env.GOOGLE_BOOKS}`);
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].volumeInfo;
    } else {
      console.warn(`No items found in Google Books response for title: ${title}`);
      return {}; // or return an empty object: {}
    }
  }

  async function getGoogleBooksDataISBN10(ISBN10: string) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN10}&key=${process.env.GOOGLE_BOOKS}`);
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].volumeInfo;
    } else {
      console.warn(`No items found in Google Books response for title: ${title}`);
      return {}; // or return an empty object: {}
    }
  }

  GoogleBooks.get('/', async (req: Request, res: Response) => {
    const title: string | undefined = req.query.title as string | undefined;
    console.log(title)
    if (!title) {
        return res.status(400).send('Please provide a valid book title.');
    }
    try {
    const bookData = await getGoogleBooksData(title);
    const transformedData = {
        title: bookData.title,
        author: bookData.authors ? bookData.authors[0] : '',
        image: bookData.imageLinks? getLargestImage(bookData.imageLinks) : '',
        description: bookData.description? bookData.description : '',
        rating: bookData.averageRating ? bookData.averageRating : null,
        ISBN10: getISBN(bookData.industryIdentifiers),
      };

    res.status(200).send(transformedData)
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the book data.')
}})

GoogleBooks.get('/ISBN10', async (req: Request, res: Response) => {
  console.log('poop')
    const ISBN10: string | undefined = req.query.ISBN10 as string | undefined;
    if (!ISBN10) {
        return res.status(400).send('Please provide a valid book ISBN10.');
    }
    try {
    const bookData = await getGoogleBooksDataISBN10(ISBN10);
    const transformedData = {
        title: bookData.title,
        author: bookData.authors ? bookData.authors[0] : '',
        image: bookData.imageLinks? getLargestImage(bookData.imageLinks) : '',
        description: bookData.description? bookData.description : '',
        rating: bookData.averageRating ? bookData.averageRating : null,
        ISBN10: getISBN(bookData.industryIdentifiers),
      };
    res.status(200).send(transformedData)
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the book data.')
}})



  export default GoogleBooks