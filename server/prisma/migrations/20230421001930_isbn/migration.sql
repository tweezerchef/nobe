/*
  Warnings:

  - A unique constraint covering the columns `[ISBN10]` on the table `Books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISBN10` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.1.7";

-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "ISBN10" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "us_gaz" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_gaz" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_lex" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_lex" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_rules" (
    "id" SERIAL NOT NULL,
    "rule" TEXT,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_rules" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN10_key" ON "Books"("ISBN10");
