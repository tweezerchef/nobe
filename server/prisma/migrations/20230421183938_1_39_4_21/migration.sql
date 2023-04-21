/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ClubMembers_clubId_key";

-- DropIndex
DROP INDEX "ClubMembers_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "radius" INTEGER;
