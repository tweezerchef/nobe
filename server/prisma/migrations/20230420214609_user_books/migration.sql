-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "lastName" TEXT,
    "picture" TEXT,
    "token" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "radius" INTEGER,

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
    "image" TEXT,

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
    "thumbDown" INTEGER,
    "thumbUp" INTEGER,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookData" (
    "id" TEXT NOT NULL,
    "asin" INTEGER NOT NULL,
    "ISBN10" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    CONSTRAINT "BookData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubMembers_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_clubsId_fkey" FOREIGN KEY ("clubsId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_discussionsId_fkey" FOREIGN KEY ("discussionsId") REFERENCES "Discussions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
