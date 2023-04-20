/*
  Warnings:

  - You are about to drop the column `ISBN10` on the `bookdata` table. All the data in the column will be lost.
  - Added the required column `isbn10` to the `bookdata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookdata" DROP COLUMN "ISBN10",
ADD COLUMN     "isbn10" INTEGER NOT NULL;
