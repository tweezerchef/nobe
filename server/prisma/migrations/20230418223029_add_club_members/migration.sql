/*
  Warnings:

  - You are about to drop the column `clubsId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clubsId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clubsId";

-- CreateTable
CREATE TABLE "ClubMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
