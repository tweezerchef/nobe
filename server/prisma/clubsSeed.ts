// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

// // const { user1, user2 } = require('./userSeed.ts')

// async function clubSeed() {
//   const user1 = await prisma.user.findOne({ where: { username: 'john_doe' } })
//   const user2 = await prisma.user.findOne({ where: { username: 'matt_doe' } })
//   console.log(user1);

//   const club1 = await prisma.clubs.create({
//     data: {
//       name: 'club1',
//       users: { connect: [{ id: user1.id }] },
//     }
//   })

//   const club2 = await prisma.clubs.create({
//     data: {
//       name: 'club2',
//       users: { connect: [{ id: user2.id }] },
//     }
//   })

//   console.log({ club1, club2 })
// }

// clubSeed()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   })