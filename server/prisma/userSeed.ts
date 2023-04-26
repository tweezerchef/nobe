//const { PrismaClient } = require('@prisma/client')

//const prisma = new PrismaClient()

async function seed() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      username: 'john_doe',
      email: 'john_doe@example.com',
      googleId: '123456789',
    }
  })

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Matt',
      username: 'matt_doe',
      email: 'matt_doe@example.com',
      googleId: '987654321',
    }
  })

  const user3 = await prisma.user.create({
    data: {
      firstName: 'Gregg',
      username: 'gregg_turkington',
      email: 'gregg_turkington@example.com',
      googleId: '432156789',
    }
  })

  const user4 = await prisma.user.create({
    data: {
      firstName: 'Ubuntu',
      username: 'ubuntu_wsl',
      email: 'ubuntu_wsl@example.com',
      googleId: '876123409',
    }
  })

  //console.log({ user1, user2, user3, user4 })
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

