const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
//import findOrCreateBook from './review'
import { title } from 'process';

dotenv.config();

const Recommendations = express.Router();

const prisma = new PrismaClient();
async function findOrCreateBook(ISBN10: string, title: string, author: string, image: string, description: string ) {
  try {
    const newBook = await prisma.Books.upsert({
      where: { title: title },
      update: {},
      create: { ISBN10 : ISBN10, title: title, author: author, image: image, description: description },

      select: {
        // include all columns from the books table
        id: true,
        title: true,
        author: true,
        ISBN10: true,
        description: true,
        image: true,
        UserBooks:  {
          select: {
            id: true,
            wishlist: true,
            owned: true,
            booksId: true,
            userId: true,
            rating: true,
            review: true,
            LendingTable: true,
            Books: {
              select: {
                id: true,
                title: true,
                author: true,
                ISBN10: true,
                description: true,
                image: true,
                UserBooks:{
                  select: {
                  id: true,
                  wishlist: true,
                  owned: true,
                  booksId: true,
                  userId: true,
                  rating: true,
                  review: true,
                  LendingTable: true,
                  User: true
                  }
                },
                Discussions: true,
                Activity: true,
              },
            },
            User: true,
          }},
        Discussions: true,
        Activity: true,
      },

  });;

    return newBook;
  } catch (error) {
    console.error(`Error finding or creating book with ISBN10 ${ISBN10}:`);
    return {}
  }
}

interface Book {
  image_url: string;
  image: string;
  title: string;

}

async function findRandomRows(limit: number) {
  const allRows = await prisma.bookdata.findMany();
  const shuffledRows = allRows.sort(() => 0.5 - Math.random());
  const randomRows = shuffledRows.slice(0, limit);
  return randomRows;
}



Recommendations.get('/random', async (req : Request, res: Response) => {
  try {
    const amazonBooks = await findRandomRows(20);

    const returnArray = await Promise.all(amazonBooks.map(async (book: any) => {
      const data = await axios.get(`http://localhost:8080/google-books/ISBN10?ISBN10=${book.ISBN10}`);

      const transFormedData = data.data;
      const { ISBN10, title, author, image, description } = transFormedData;
      const ourBookData = findOrCreateBook(ISBN10, title, author, image, description);
      return ourBookData;
    }));

    res.send(returnArray);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }

})

Recommendations.get('/recommended', async (req : Request, res : Response) => {
  const responseArray: any[] = [];
  const { id } = req.params

  const topRatedBooks = await prisma.userBooks.findMany({where: {userId: id,}, orderBy: { rating:'desc',},take: 20, include: { Books: true,}, });

  const lowRatedBooks = await prisma.userBooks.findMany({ where: { userId: id, rating: { lte: 2, }, }, orderBy: { rating: 'asc', }, take: 20, include: { Books: true, }, });

 const lowTitles = await lowRatedBooks.reduce((acc: string[] , book: any) => {
    acc.push(book.Books.title);
    return acc;
  },[]).join(', ')
  const topTitles = await topRatedBooks.reduce((acc: string[] , book: any) => {
    acc.push(book.Books.title);
    return acc;
  },[]).join(', ')

  const content:string = `Please respond with 20 unique book titles in quotes with each separated by commas with no additional characters or information besides the title, as recommendations for somebody that likes these books ${topTitles} and dislikes these ${lowTitles} please try to create unique suggestions ones, find correlations that are drawn from what other people like the user like , and themes, but not necessarily genres and try to include a mix of 1/4 well know books and 3/4 lesser known books`;

  axios
  .get(`http://localhost:8080/openai?content=${content}`)
  .then((response) => {
    return response.data.split(',')})
    .then(async (data) => {
      const promises = data.map(async (book: any) => {
        const data = await axios.get(`http://localhost:8080/google-books?title=${book}`);
       const transFormedData = data.data
      //  console.log('TransFormedData: ', transFormedData)
       const title = transFormedData.title;

         const ourBookData = await axios.get(`http://localhost:8080/bookdata/title?title=${title}`);
         if(ourBookData.data && ourBookData.data !== null){
          responseArray.push(ourBookData.data)
         }
         else{
          responseArray.push(transFormedData);
        }
       });
    // Don't forget to return Promise.all() to wait for all promises to resolve
    return Promise.all(promises);
  })
  .then(() => {
   const uniqueBooks = responseArray.filter((book, index, self) =>
   index === self.findIndex((b) => (
     b.title === book.title && b.author === book.author && b.ISBN10 === book.ISBN10
   ))
 )
 return uniqueBooks})
 .then((response)=>( res.status(200).send(response)))
 .catch((error) => console.error('Error:', error));
});



export default Recommendations;