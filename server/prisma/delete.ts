const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAllUsers() {
    try {
      // Delete all rows in the Discussions table that reference clubs being deleted
      await prisma.discussions.deleteMany({
        where: {
          clubs: {
            is: {
              id: {
                not: undefined
              }
            }
          }
        }
      })

      // Delete all rows in the ClubMembers table that reference clubs being deleted
      await prisma.clubMembers.deleteMany({
        where: {
          clubs: {
            is: {
              id: {
                not: undefined
              }
            }
          }
        }
      })

      // Delete all rows in the clubs table
      const numDeleted = await prisma.clubs.deleteMany()

     // console.log(`Deleted ${numDeleted} clubs`)
    } catch (e) {
      console.error(e)
    } finally {
      await prisma.$disconnect()
    }
  }

deleteAllUsers()