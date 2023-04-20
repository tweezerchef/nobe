/*
  Warnings:

  - You are about to drop the `BookData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BookData";

-- CreateTable
CREATE TABLE "bookdata" (
    "id" TEXT NOT NULL,
    "asin" INTEGER NOT NULL,
    "ISBN10" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    CONSTRAINT "bookdata_pkey" PRIMARY KEY ("id")
);
