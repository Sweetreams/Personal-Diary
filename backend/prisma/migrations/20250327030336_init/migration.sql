-- DropForeignKey
ALTER TABLE "TagsAndPost" DROP CONSTRAINT "TagsAndPost_id_fkey";

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
