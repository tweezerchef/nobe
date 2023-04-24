const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Recommendations = express.Router();

const prisma = new PrismaClient();

async function findRandomRows(limit: number) {
  const allRows = await prisma.bookdata.findMany();
  const shuffledRows = allRows.sort(() => 0.5 - Math.random());
  const randomRows = shuffledRows.slice(0, limit);
  return randomRows;
}
const callOpenAI = async (content: string) =>{
  const response = axios.get(`http://localhost:8080/openai?content=${content}`)
return response
}

function getISBN(volumeInfo: any) {
  const identifiers = volumeInfo.industryIdentifiers;
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

async function getGoogleBooksData(title: string) {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle=${title}&key=${process.env.GOOGLE_BOOKS}`);
  if (response.data.items && response.data.items.length > 0) {
    return response.data.items[0].volumeInfo;
  } else {
    console.warn(`No items found in Google Books response for title: ${title}`);
    return {}; // or return an empty object: {}
  }
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

Recommendations.get('/recommended', async (req : Request, res : Response) => {
  const responseArray: any[] = [];
  const { id } = req.params
  const topRatedBooks = await prisma.userBooks.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      rating: 'desc',
    },
    take: 20,
    include: {
      books: true,
    },
  });

  const lowRatedBooks = await prisma.userBooks.findMany({
    where: {
      userId: id,
      rating: {
        lte: 2,
      },
    },
    orderBy: {
      rating: 'asc',
    },
    take: 20,
    include: {
      books: true,
    },
  });

 const lowTitles = await lowRatedBooks.reduce((acc: string[] , book: any) => {
    acc.push(book.books.title);
    return acc;
  },[]).join(', ')
  const topTitles = await topRatedBooks.reduce((acc: string[] , book: any) => {
    acc.push(book.books.title);
    return acc;
  },[]).join(', ')

  const content:string = `Please return 20 book titles, in the form of a JSON array, for somebody that likes these books ${topTitles} and dislikes these ${lowTitles} please try to create unique suggestions ones, find correlations that are drawn from what other people like the user like , and themes, but not necessarily genres and try to include a mix of 1/4 well know books and 3/4 lesser known books`;

  // axios
  // .get(`http://localhost:8080/openai?content=${content}`)
  const call = async (): Promise<any> => {
    try {
      const response = await callOpenAI(content);
      const data = JSON.parse(response.data.content);
      return data || call();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return call();
    }
  };

call()
.then((response: any) => [...new Set(response)])
  .then((data) => {
    const promises = data.map((book: any) => {
        return getGoogleBooksData(book).then((bookData) => {
            const transformedData = {
                title: bookData.title,
                author: bookData.authors ? bookData.authors[0] : '',
                image_url: bookData.imageLinks ? bookData.imageLinks.thumbnail : '',
                rating: bookData.averageRating ? bookData.averageRating : null,
                ISBN10: getISBN(bookData)
            };
            responseArray.push(transformedData);
        });
    });
    // Don't forget to return Promise.all() to wait for all promises to resolve
    return Promise.all(promises);
  })
  .then(() => res.status(200).send(responseArray))
  .catch((error) => console.error('Error:', error));
});


export  { getISBN };
export default Recommendations;