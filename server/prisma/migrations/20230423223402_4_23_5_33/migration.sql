/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clubId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_userId_key" ON "ClubMembers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_clubId_key" ON "ClubMembers"("clubId");
