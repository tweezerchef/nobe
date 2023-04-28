/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,friendId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `bookdata` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "PlacesToRead" ALTER COLUMN "Lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "Long" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Clubs_Books" (
    "id" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,

    CONSTRAINT "Clubs_Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_title_key" ON "Books"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_userId_friendId_key" ON "Friendship"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "bookdata_title_key" ON "bookdata"("title");

-- AddForeignKey
ALTER TABLE "Clubs_Books" ADD CONSTRAINT "Clubs_Books_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clubs_Books" ADD CONSTRAINT "Clubs_Books_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
