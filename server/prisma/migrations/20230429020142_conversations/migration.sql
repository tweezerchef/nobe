/*
  Warnings:

  - You are about to drop the column `recipientId` on the `DirectMessages` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `DirectMessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DirectMessages" DROP CONSTRAINT "DirectMessages_recipientId_fkey";

-- AlterTable
ALTER TABLE "DirectMessages" DROP COLUMN "recipientId",
ADD COLUMN     "conversationId" TEXT NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Conversations" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_conversationMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_conversationMembers_AB_unique" ON "_conversationMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_conversationMembers_B_index" ON "_conversationMembers"("B");

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversationMembers" ADD CONSTRAINT "_conversationMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversationMembers" ADD CONSTRAINT "_conversationMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
