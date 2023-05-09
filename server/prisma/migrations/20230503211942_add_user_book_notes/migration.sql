/*
  Warnings:

  - You are about to drop the column `bookId` on the `UserBookNotes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserBookNotes` table. All the data in the column will be lost.
  - Added the required column `userBookId` to the `UserBookNotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "UserBookNotes" DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "userBookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserBookNotes" ADD CONSTRAINT "UserBookNotes_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
