/*
  Warnings:

  - You are about to drop the column `Description` on the `PlacesToRead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_bookId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "placeId" TEXT,
ALTER COLUMN "bookId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "recipient" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "socketIOid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PlacesToRead" DROP COLUMN "Description";

-- CreateTable
CREATE TABLE "Description_Places" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Description_Places_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Description_Places_userId_placeId_key" ON "Description_Places"("userId", "placeId");

-- AddForeignKey
ALTER TABLE "Description_Places" ADD CONSTRAINT "Description_Places_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description_Places" ADD CONSTRAINT "Description_Places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
