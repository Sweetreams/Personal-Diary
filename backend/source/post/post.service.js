import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class Post {
    prisma = prisma;

    getPostsDate = async (id) => {
        const result = await prisma.$transaction(async (prisma) => {
            const postDate = await prisma.$queryRaw`SELECT DISTINCT "createdAt"::date FROM public."Post" WHERE "id_user" = ${id} ORDER BY "createdAt" DESC`;
            const postTage = await prisma.$queryRaw`SELECT "Tags".tag, Count("Tags".id)::int as count, "Tags".color From "Post" Join "TagsAndPost" On "Post".id = "TagsAndPost".id_post JOIN "Tags" on "TagsAndPost".id_tags = "Tags".id where "Post".id_user = ${id} Group By "Tags".tag, "Tags".color order by count desc limit 5 `;
            return { postDate, postTage };
        });

        return result;
    };

    getPostsonDate = async (date, id) => {
        const dateCurrent = new Date(date);
        const dateNextDay = new Date(dateCurrent);
        dateNextDay.setDate(dateCurrent.getDate() + 1);
        return this.prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                id_user: Number(id),
                createdAt: {
                    gte: dateCurrent,
                    lt: dateNextDay
                }
            },
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
                updatedAt: true,
                emotions: true,
                TagsAndPost: {
                    select: {
                        tags: true
                    }
                },
            }

        });
    };

    getAllPost = async (id_user) => {
        return this.prisma.post.findMany({
            where: {
                id_user: Number(id_user)
            },
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
                updatedAt: true,
                emotions: true,
                TagsAndPost: {
                    select: {
                        tags: true
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    };

    getPost = async (id_user, id_post) => {
        return this.prisma.post.findMany({
            where: {
                id_user: Number(id_user),
                id: Number(id_post)
            },
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
                updatedAt: true,
                TagsAndPost: {
                    select: {
                        tags: true
                    }
                },
            }
        });
    };

    postSearch = async (text, user_id) => {
        let textSearch = "";
        if (text < 0) {
            throw new Error("Ошибка");
        } else {
            textSearch = text + ":*";
            return this.prisma.$queryRaw`select * from public."Post" where id_user = ${user_id} and to_tsvector('simple', "desc") || to_tsvector('simple', "title") @@ to_tsquery(${textSearch})`;
        }
    };

    postSearchTag = async (text, user_id) => {
        return this.prisma.$queryRaw`select post.title, post.desc, post."createdAt", JSONB_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'tag', tag.tag,
            'color', tag.color
        )
    ) AS tags, post.id
from public."Post" as post
join public."TagsAndPost" as tagsPost on post.id = tagsPost.id_post
join public."Tags" as tag on post.id_user = tag.id_user
where post.id_user = ${Number(user_id)} AND tag.tag IN (${Prisma.join(text)})
group by post.id`;
    };

    createPost = async (id, data) => {
        return await this.prisma.$transaction(async (prisma) => {
            const post = await prisma.post.create({
                data: {
                    id_user: Number(id),
                    title: data.title,
                    desc: data.desc
                }
            });
            if (data.tags) {
                for (const tag of data.tags) {
                    try {
                        await prisma.tagsAndPost.create({
                            data: {
                                id_tags: Number(tag),
                                id_post: Number(post.id)
                            }
                        });
                    } catch {
                        throw new Error("Ошибка присвоения");
                    }
                }
            }
        });
    };

    changePostEmotions = async (id, data) => {
        return await this.prisma.post.update({
            where: {
                id_user: Number(id),
                id: Number(data.id_post)
            },
            data: {
                emotions: data.emotions
            }
        });
    };

    changePost = async (id, data) => {
        return await this.prisma.$transaction(async (prisma) => {
            const post = await prisma.post.update({
                where: {
                    id_user: Number(id),
                    id: Number(data.id_post)
                },
                data: {
                    title: data.title,
                    desc: data.desc
                }
            });
            if (data.tags) {
                await prisma.tagsAndPost.deleteMany({
                    where: {
                        id_post: Number(post.id)
                    }
                });

                for (const tag of data.tags) {
                    try {
                        await prisma.tagsAndPost.create({
                            data: {
                                id_tags: Number(tag),
                                id_post: Number(post.id)
                            }
                        });
                    } catch {
                        throw new Error("Ошибка присвоения");
                    }
                }
            }
        });
    };

    deletePost = async (id_post, id_user) => {
        return await this.prisma.$transaction(async (prisma) => {
            await prisma.tagsAndPost.deleteMany({
                where: {
                    id_post: Number(id_post)
                }
            });

            return await prisma.post.deleteMany({
                where: {
                    id: Number(id_post),
                    id_user: Number(id_user)
                }
            });
        });
    };
};