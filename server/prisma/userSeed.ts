const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      username: 'john_doe',
      zipCode: 12345
    }
  })

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Matt',
      username: 'matt_doe',
      zipCode: 53634
    }
  })

  console.log({ user1, user2 })
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })