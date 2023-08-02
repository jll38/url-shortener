-- CreateTable
CREATE TABLE "liteUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "premiumUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    CONSTRAINT "premiumUrl_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "liteUrl_originalUrl_key" ON "liteUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "liteUrl_shortUrl_key" ON "liteUrl"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "premiumUrl_originalUrl_key" ON "premiumUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "premiumUrl_shortUrl_key" ON "premiumUrl"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
