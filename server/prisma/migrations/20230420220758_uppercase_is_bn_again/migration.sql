/*
  Warnings:

  - The primary key for the `bookdata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isbn10` on the `bookdata` table. All the data in the column will be lost.
  - Added the required column `ISBN10` to the `bookdata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookdata" DROP CONSTRAINT "bookdata_pkey",
DROP COLUMN "isbn10",
ADD COLUMN     "ISBN10" INTEGER NOT NULL,
ADD CONSTRAINT "bookdata_pkey" PRIMARY KEY ("ISBN10");
