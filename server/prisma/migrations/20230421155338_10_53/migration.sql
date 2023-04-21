/*
  Warnings:

  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `User` table. All the data in the column will be lost.
  - The primary key for the `bookdata` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "ISBN10" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "radius",
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "bookdata" DROP CONSTRAINT "bookdata_pkey",
ALTER COLUMN "ISBN10" SET DATA TYPE TEXT,
ADD CONSTRAINT "bookdata_pkey" PRIMARY KEY ("ISBN10");
