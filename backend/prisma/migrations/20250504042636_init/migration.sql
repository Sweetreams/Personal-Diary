-- CreateEnum
CREATE TYPE "EMOTIONS" AS ENUM ('none', 'happiness', 'anticipation', 'sadness', 'anger', 'excitement', 'boredom', 'embarrassment', 'other');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "emotions" "EMOTIONS";
