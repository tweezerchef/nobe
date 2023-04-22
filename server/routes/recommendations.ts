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

async function getGoogleBooksData(title: string) {
  axios.get(`https://www.googleapis.com/books/v1/volumes?key=&q=intitle:${title}`).then((response) => { return response.data.items[0].volumeInfo })
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
  const responseArray = []
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

  const titles = await topRatedBooks.reduce((acc: string[] , book: any) => {
    acc.push(book.books.title);
    return acc;
  },[]).join(', ')
  // console.log(titles);
  // const titles = 'Neuromancer, The Great Gatsby, The Cartel, The Unbearable Lightness of Being, Silo, Dune, Kurt Vonegut, Do Androids Dream of Electric Sheep'
  const content:string = `Please return 20 book recommendations for somebody that likes these books ${titles} please return it with only the title of the recommendation separated by a commas without numbers, please try to create unique suggestions ones that a normal recommendation algo wouldn't, find correlations that are drawn from what other people like the user like , and themes, but not necessarily genres and try to include a mix of 1/4 well know books and 3/4 lesser known books`;

   axios.get(`http://localhost:8080/openai?content=${content}`).then(response => response.data.content.split(',')).then(data =>{
      data.forEach((book: any) => {
       getGoogleBooksData(book).then(data => console.log(data));
     });
   });

}
)



export default Recommendations;