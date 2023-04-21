/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - Changed the type of `ISBN10` on the `Books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "ClubMembers_clubId_key";

-- DropIndex
DROP INDEX "ClubMembers_userId_key";

-- DropIndex
DROP INDEX "UserBooks_userId_booksId_key";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "ISBN10",
ADD COLUMN     "ISBN10" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "radius" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN10_key" ON "Books"("ISBN10");
