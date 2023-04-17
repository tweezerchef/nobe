-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "clubsId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "paperback" BOOLEAN,
    "content" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "booksId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBooks" (
    "id" TEXT NOT NULL,
    "wishlist" BOOLEAN NOT NULL DEFAULT false,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "booksId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clubsId" TEXT NOT NULL,

    CONSTRAINT "Discussions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "discussionsId" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_key" ON "UserBooks"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clubsId_fkey" FOREIGN KEY ("clubsId") REFERENCES "Clubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_clubsId_fkey" FOREIGN KEY ("clubsId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_discussionsId_fkey" FOREIGN KEY ("discussionsId") REFERENCES "Discussions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
