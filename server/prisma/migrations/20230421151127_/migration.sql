/*
  Warnings:

  - Changed the type of `ISBN10` on the `Books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "ClubMembers_userId_key";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "ISBN10",
ADD COLUMN     "ISBN10" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN10_key" ON "Books"("ISBN10");
