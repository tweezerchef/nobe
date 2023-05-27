/*
  Warnings:

  - You are about to drop the column `name` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `genre` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Made the column `booksId` on table `Genre` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_booksId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "name",
ADD COLUMN     "genre" TEXT NOT NULL,
ALTER COLUMN "booksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "UserGenre" (
    "id" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "UserGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHobbies" (
    "id" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "UserHobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "UserPictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGenre" ADD CONSTRAINT "UserGenre_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHobbies" ADD CONSTRAINT "UserHobbies_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPictures" ADD CONSTRAINT "UserPictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
