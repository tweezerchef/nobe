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

  const user3 = await prisma.user.create({
    data: {
      firstName: 'Gregg',
      username: 'gregg_turkington',
      email: 'gregg_turkington@example.com',
      googleId: '432156789',
      latitude: 31.012171,
      longitude: -90.031527,
      radius: 3
    }
  })

  const user4 = await prisma.user.create({
    data: {
      firstName: 'Ubuntu',
      username: 'ubuntu_wsl',
      email: 'ubuntu_wsl@example.com',
      googleId: '432156789',
      latitude: 29.012171,
      longitude: -90.032427,
      radius: 3
    }
  })

  console.log({ user1, user2, user3, user4 })
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

