/*
  Warnings:

  - You are about to drop the column `Location` on the `PlacesToRead` table. All the data in the column will be lost.
  - You are about to drop the `Description_Places` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[googlePlaceId]` on the table `PlacesToRead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `PlacesToRead` table without a default value. This is not possible if the table is not empty.
  - Made the column `googlePlaceId` on table `PlacesToRead` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Description_Places" DROP CONSTRAINT "Description_Places_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Description_Places" DROP CONSTRAINT "Description_Places_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Places" DROP CONSTRAINT "User_Places_userId_fkey";

-- AlterTable
ALTER TABLE "PlacesToRead" DROP COLUMN "Location",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "placeEditorial" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "types" TEXT[],
ADD COLUMN     "website" TEXT,
ALTER COLUMN "googlePlaceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User_Places" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "Rating" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Description_Places";

-- CreateTable
CREATE TABLE "Places_Pictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "googlePic" BOOLEAN,
    "description" TEXT,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Places_Pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlacesToRead_googlePlaceId_key" ON "PlacesToRead"("googlePlaceId");

-- AddForeignKey
ALTER TABLE "Places_Pictures" ADD CONSTRAINT "Places_Pictures_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Places" ADD CONSTRAINT "User_Places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
