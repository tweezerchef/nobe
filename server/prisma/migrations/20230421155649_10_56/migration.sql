/*
  Warnings:

  - A unique constraint covering the columns `[userId,booksId]` on the table `UserBooks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_booksId_key" ON "UserBooks"("userId", "booksId");
