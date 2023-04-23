import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const CreateClubRoute = express.Router();


async function findOrCreateClub(name: string, description: string, image: string){

    const newClub = await prisma.clubs.upsert({
      where: { name: name },
      update: {},
      create: {name : name,  description: description, image: image},
    });
    return newClub;
  }

CreateClubRoute.post('/', async (req: Request, res: Response) => {
 findOrCreateClub(req.body.name, req.body.description, req.body.image).then((newClub) => {
  console.log(newClub);
 });

});





// async function findOrCreateBook(ISBN10: string, title: string, author: string, image_url: string) {
//   const newbook = await prisma.Books.upsert({
//     where: { ISBN10: ISBN10 },
//     update: {},
//     create: { ISBN10 : ISBN10, title: title, author: author, image: image_url},
//   });
//   return newbook;;
// }




// Review.post('/', async (req: Request, res: Response) => {
//   const { book, rating, id } = req.body;
//   console.log(id);
//   const { title, author, ISBN10, image_url} = book;
//   findOrCreateBook(ISBN10, title, author, image_url).then(newbook =>{
//   const booksId = newbook.id;
//   findOrCreateUserBook(booksId, id, rating).then(NewUserBook =>{
//       console.log(NewUserBook);
//   res.status(201).json(NewUserBook);
//   })
//   })





export default CreateClubRoute;
