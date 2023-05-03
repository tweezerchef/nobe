-- AlterTable
ALTER TABLE "UserBooks" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reading" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserBookNotes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" INTEGER,
    "mentionId" TEXT,

    CONSTRAINT "UserBookNotes_pkey" PRIMARY KEY ("id")
);
