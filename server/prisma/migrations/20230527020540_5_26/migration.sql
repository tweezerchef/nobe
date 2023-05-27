/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `ClubMembers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Clubs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clubs" DROP CONSTRAINT "Clubs_userId_fkey";

-- AlterTable
ALTER TABLE "ClubMembers" DROP COLUMN "isAdmin";

-- AlterTable
ALTER TABLE "Clubs" DROP COLUMN "userId",
ADD COLUMN     "admin" TEXT;
