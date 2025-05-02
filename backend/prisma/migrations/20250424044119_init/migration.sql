-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_user_fkey";

-- DropForeignKey
ALTER TABLE "TagsAndPost" DROP CONSTRAINT "TagsAndPost_id_post_fkey";

-- DropForeignKey
ALTER TABLE "TagsAndPost" DROP CONSTRAINT "TagsAndPost_id_tags_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_tags_fkey" FOREIGN KEY ("id_tags") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsAndPost" ADD CONSTRAINT "TagsAndPost_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
