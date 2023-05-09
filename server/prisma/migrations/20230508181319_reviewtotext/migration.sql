/*
  Warnings:

  - You are about to drop the column `Review` on the `User_Places` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User_Places" DROP COLUMN "Review",
ADD COLUMN     "text" TEXT;
