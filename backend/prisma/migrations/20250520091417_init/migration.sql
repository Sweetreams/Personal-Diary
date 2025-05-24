-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "EMOTIONS" AS ENUM ('none', 'happiness', 'anticipation', 'sadness', 'anger', 'excitement', 'boredom', 'embarrassment', 'other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "bcryptpassword" TEXT NOT NULL,
    "name" TEXT,
    "imgURL" TEXT,
    "role" "ROLE" NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "emotions" "EMOTIONS" DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsAndPost" (
    "id" SERIAL NOT NULL,
    "id_tags" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "TagsAndPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailToken" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "MailToken_email_key" ON "MailToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MailToken_token_key" ON "MailToken"("token");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_tags_fkey" FOREIGN KEY ("id_tags") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
