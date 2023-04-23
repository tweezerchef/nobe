/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Clubs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Clubs" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Discussions" ADD COLUMN     "bookId" TEXT,
ADD COLUMN     "rating" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Clubs_name_key" ON "Clubs"("name");

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
