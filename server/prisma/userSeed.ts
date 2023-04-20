const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      username: 'john_doe',
      email: 'john_doe@example.com',
      googleId: '123456789',
      latitude: 29.968543,
      longitude: -90.036728,
      radius: 4
    }
  })

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Matt',
      username: 'matt_doe',
      email: 'matt_doe@example.com',
      googleId: '987654321',
      latitude: 30.012171,
      longitude: -90.131527,
      radius: 2
    }
  })

  console.log({ user1, user2 })
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

