const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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

  console.log({ user1, user2 })
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

