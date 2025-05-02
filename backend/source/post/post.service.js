import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Post {
    prisma = prisma;

    getPostsDate = async (id) => {
        return this.prisma.$queryRaw`SELECT DISTINCT "updatedAt"::date FROM public."Post" WHERE "id_user" = ${id} ORDER BY "updatedAt" DESC`;
    };

    getPostsonDate = async (date, id) => {
        const dateCurrent = new Date(date);
        const dateNextDay = new Date(dateCurrent);
        dateNextDay.setDate(dateCurrent.getDate() + 1);
        return this.prisma.post.findMany({
            orderBy: {
                updatedAt: "desc"
            },
            where: {
                id_user: Number(id),
                updatedAt: {
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
                TagsAndPost: {
                    select: {
                        tags: true
                    }
                },
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