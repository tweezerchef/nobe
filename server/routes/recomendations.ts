const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findRandomRows(limit) {
  const allRows = await prisma.bookdata.findMany();
  const shuffledRows = allRows.sort(() => 0.5 - Math.random());
  const randomRows = shuffledRows.slice(0, limit);
  return randomRows;
}

(async () => {
  try {
    const limit = 5; // The number of random rows you want to fetch
    const result = await findRandomRows(limit);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
})();