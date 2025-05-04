/*
  Warnings:

  - The values [none] on the enum `EMOTIONS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EMOTIONS_new" AS ENUM ('happiness', 'anticipation', 'sadness', 'anger', 'excitement', 'boredom', 'embarrassment', 'other');
ALTER TABLE "Post" ALTER COLUMN "emotions" TYPE "EMOTIONS_new" USING ("emotions"::text::"EMOTIONS_new");
ALTER TYPE "EMOTIONS" RENAME TO "EMOTIONS_old";
ALTER TYPE "EMOTIONS_new" RENAME TO "EMOTIONS";
DROP TYPE "EMOTIONS_old";
COMMIT;
