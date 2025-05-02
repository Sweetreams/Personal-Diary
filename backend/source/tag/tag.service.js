import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class TagService {
    prisma = prisma;

    getTags = () => {
        return this.prisma.tags.findMany();
    };
}