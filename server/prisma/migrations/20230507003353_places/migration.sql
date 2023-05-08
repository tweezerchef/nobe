/*
  Warnings:

  - You are about to drop the column `altLoc` on the `PlacesToRead` table. All the data in the column will be lost.
  - Added the required column `googlePlaceId` to the `User_Places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discussions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PlacesToRead" DROP COLUMN "altLoc",
ADD COLUMN     "googlePlaceId" TEXT;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "BookId" TEXT;

-- AlterTable
ALTER TABLE "User_Places" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "googlePlaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
