import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Mail {
    prisma = prisma;

    checkMail = (mail, token) => {
        return this.prisma.mailToken.findUnique({
            where: {
                email: mail,
                token: String(token)
            }
        });
    };

    searchMail = (mail, token) => {
        return this.prisma.$transaction(async (prisma) => {
            const mailAndToken = await prisma.mailToken.findUnique({
                where: {
                    email: mail
                }
            });
            if (mailAndToken != null) {
                return await prisma.mailToken.update({
                    where: {
                        email: mail
                    },
                    data: {
                        token: String(token)
                    }
                });
            } else {
                return 1;
            }
        });
    };

    sendMail = (mail, token) => {
        
        return this.prisma.mailToken.createMany({
            data: {
                email: mail,
                token: String(token)
            },

        });
    };
}