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
}