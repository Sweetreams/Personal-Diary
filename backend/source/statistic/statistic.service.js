import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Statistic {
    prisma = prisma;

    getCountUserAndPost =async(id) => {
        return await this.prisma.$transaction(async(prisma) => {
            const countPost = await prisma.post.count({
                where: {
                    id_user: Number(id)
                },
            });
            const countEmotions = await prisma.$queryRaw`SELECT emotions, COUNT(*)::int FROM public."Post" where id_user=${id} AND emotions <> 'none' GROUP BY emotions ORDER BY count DESC`;
            return [countPost, countEmotions];
        });
    };

    // getuser = async() => {
    //     return await this.prisma.user.findMany();
    // };
}