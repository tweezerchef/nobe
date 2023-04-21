/*
  Warnings:

  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clubId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,booksId]` on the table `UserBooks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "ISBN10" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "radius",
ADD COLUMN     "location" geography;

-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_userId_key" ON "ClubMembers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_clubId_key" ON "ClubMembers"("clubId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_booksId_key" ON "UserBooks"("userId", "booksId");
