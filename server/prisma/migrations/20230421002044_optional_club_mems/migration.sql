/*
  Warnings:

  - A unique constraint covering the columns `[clubId]` on the table `ClubMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.1.7";

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
CREATE UNIQUE INDEX "ClubMembers_clubId_key" ON "ClubMembers"("clubId");
