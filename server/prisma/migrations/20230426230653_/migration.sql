/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Clubs` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Discussions` table. All the data in the column will be lost.
  - You are about to drop the column `thumbDown` on the `UserBooks` table. All the data in the column will be lost.
  - You are about to drop the column `thumbUp` on the `UserBooks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,clubId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ClubMembers_clubId_key";

-- DropIndex
DROP INDEX "ClubMembers_userId_key";

-- AlterTable
ALTER TABLE "Clubs" DROP COLUMN "createdBy",
ADD COLUMN     "admin" TEXT;

-- AlterTable
ALTER TABLE "Discussions" DROP COLUMN "rating",
ADD COLUMN     "thumbsDown" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbsUp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "thumbsDown" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "thumbsUp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "NotificationsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserBooks" DROP COLUMN "thumbDown",
DROP COLUMN "thumbUp",
ADD COLUMN     "review" TEXT;

-- CreateTable
CREATE TABLE "PlacesToRead" (
    "id" TEXT NOT NULL,
    "nickName" TEXT,
    "Location" TEXT NOT NULL,
    "Private" BOOLEAN NOT NULL DEFAULT false,
    "Lat" INTEGER,
    "Long" INTEGER,
    "altLoc" TEXT,
    "Description" TEXT,

    CONSTRAINT "PlacesToRead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Places" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "Rating" INTEGER,
    "Review" TEXT,
    "CheckIns" INTEGER,

    CONSTRAINT "User_Places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "socketIOid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "DirectMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionsUsers" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "thumbsUp" BOOLEAN NOT NULL DEFAULT false,
    "thumbsDown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DiscussionsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsUsers" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "thumbsUp" BOOLEAN NOT NULL DEFAULT false,
    "thumbsDown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LendingTable" (
    "id" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "LenderReview" TEXT,
    "LenderRating" INTEGER,
    "BorrowRating" INTEGER,
    "BorrowReview" TEXT,
    "DateInPlanned" TEXT,
    "DateIn" TEXT,
    "Borrowed" BOOLEAN NOT NULL DEFAULT false,
    "Returned" BOOLEAN NOT NULL DEFAULT false,
    "Datebackplanned" TEXT,
    "DateBack" TEXT,
    "inPlaceId" TEXT,
    "outPlaceId" TEXT,
    "InTime" TEXT,
    "InDate" TEXT,
    "OutTime" TEXT,
    "OutDate" TEXT,

    CONSTRAINT "LendingTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Places_userId_placeId_key" ON "User_Places"("userId", "placeId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_userId_clubId_key" ON "ClubMembers"("userId", "clubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_Places" ADD CONSTRAINT "User_Places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Places" ADD CONSTRAINT "User_Places_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionsUsers" ADD CONSTRAINT "DiscussionsUsers_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionsUsers" ADD CONSTRAINT "DiscussionsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsers" ADD CONSTRAINT "PostsUsers_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsers" ADD CONSTRAINT "PostsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "UserBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_inPlaceId_fkey" FOREIGN KEY ("inPlaceId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_outPlaceId_fkey" FOREIGN KEY ("outPlaceId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
