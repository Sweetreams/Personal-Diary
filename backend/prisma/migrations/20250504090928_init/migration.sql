-- AlterEnum
ALTER TYPE "EMOTIONS" ADD VALUE 'none';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "emotions" SET DEFAULT 'none';
