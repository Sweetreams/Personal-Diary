import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class TagService {
    prisma = prisma;

    getTags = (id) => {
        return this.prisma.tags.findMany({
            where: {
                id_user: Number(id)
            }
        });
    };

    createTags = (id, data) => {
        return this.prisma.tags.create({
            data: {
                ...data,
                id_user: Number(id)
            }
        });
    };

    deleteTag = async (id_user, data) => {
        return await this.prisma.$transaction(async (prisma) => {
            await prisma.tagsAndPost.deleteMany({
                where: {
                    id_tags: Number(data.id_tags)
                }
            });
            await prisma.tags.deleteMany({
                where: {
                    id_user: Number(id_user),
                    id: Number(data.id_tags)
                }
            });
        });
    };
}