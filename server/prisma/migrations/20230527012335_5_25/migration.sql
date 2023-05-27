/*
  Warnings:

  - You are about to drop the column `admin` on the `Clubs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Clubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubMembers" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Clubs" DROP COLUMN "admin",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Discussions" ADD COLUMN     "bookTitle" TEXT,
ADD COLUMN     "timeline" TEXT;

-- AddForeignKey
ALTER TABLE "Clubs" ADD CONSTRAINT "Clubs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
