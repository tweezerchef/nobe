/* eslint-disable @typescript-eslint/no-unused-vars */
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const genres = [
//   'Fiction',
//   'Non-fiction',
//   'Mystery/Thriller',
//   'Romance',
//   'Science Fiction',
//   'Fantasy',
//   'Young Adult',
//   'Historical Fiction',
//   'Biography',
//   'Autobiography',
//   'Horror',
//   'Self-help',
//   'Personal Development',
//   'Poetry',
//   'Drama',
//   'Crime',
//   'Comedy',
//   'Adventure',
//   'Action',
//   'Historical',
//   'Science',
//   "Children's",
// ];

// async function seedGenres() {
//   await Promise.all(
//     genres.map(async (genre) => {
//       await prisma.userGenre.create({
//         data: {
//           genre,
//           UserId: '7faa862e-7574-4e5b-a493-f8c280bf6112',
//         },
//       });
//     }),
//   );
// }

// seedGenres()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
