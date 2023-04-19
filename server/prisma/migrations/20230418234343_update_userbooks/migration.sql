/*
  Warnings:

  - You are about to drop the column `userId` on the `Books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_userId_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "userId";
