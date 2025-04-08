import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Post {
    prisma = prisma;

    getPosts = async (id) => {
        return this.prisma.post.findMany({
            where: {
                id_user: Number(id)
            },
            include: {
                TagsAndPost: {
                    include: {
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
        });
    };

    postSearch = async (text) => {
        return this.prisma.$queryRaw`select * from public."Post" where to_tsvector("desc") || to_tsvector("title") @@ to_tsquery(${text + ":*"})`;
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