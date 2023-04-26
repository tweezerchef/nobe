//const { PrismaClient } = require('@prisma/client')

//const prisma = new PrismaClient()

// const { user1, user2 } = require('./userSeed.ts')

async function clubSeed() {
  const user1 = await prisma.user.findUnique({ where: { username: 'john_doe' } })
  const user2 = await prisma.user.findUnique({ where: { username: 'matt_doe' } })
  const user3 = await prisma.user.findUnique({ where: { username: 'gregg_turkington' } })
  const user4 = await prisma.user.findUnique({ where: { username: 'ubuntu_wsl' } })
  // console.log('THIS IS USER1', user1);

  const club1 = await prisma.clubs.create({
    data: {
      name: 'club1',
      clubMembers: { create: [{ userId: user1.id }, { userId: user3.id }] },
      Discussions: {
        create: [
          {
            userId: user1.id,
            title: 'Discussion 1',
            Posts: {
              create: [
                {
                  userId: user1.id,
                  body: 'Post 1',
                },
                {
                  userId: user3.id,
                  body: 'Post 2',
                }
              ]
            }
          },
        ]
      }
    }
  })

  const club2 = await prisma.clubs.create({
    data: {
      name: 'club2',
      clubMembers: { create: [{ userId: user2.id }, { userId: user4.id }] },
      Discussions: {
        create: [
          {
            userId: user2.id,
            title: 'Discussion 1',
            Posts: {
              create: [
                {
                  userId: user2.id,
                  body: 'Post 1',
                },
                {
                  userId: user4.id,
                  body: 'Post 2',
                }
              ]
            }
          },
        ]
      }
    }
  })

  //console.log({ club1, club2 })
}

clubSeed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })