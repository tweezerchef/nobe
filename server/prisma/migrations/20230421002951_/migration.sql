/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_userId_key" ON "ClubMembers"("userId");
