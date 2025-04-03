/*
  Warnings:

  - You are about to drop the column `id_user` on the `TagsAndPost` table. All the data in the column will be lost.
  - Added the required column `id_post` to the `TagsAndPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagsAndPost" DROP CONSTRAINT "TagsAndPost_id_user_fkey";

-- AlterTable
ALTER TABLE "TagsAndPost" DROP COLUMN "id_user",
ADD COLUMN     "id_post" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
