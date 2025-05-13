import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class User {
    prisma = prisma;

    getUser(login, bcryptpassword, email) {

        return this.prisma.user.findMany({
            where: {
                login: login,
                email: email,
                bcryptpassword: bcryptpassword
            }
        });
    }

    getUserID(id) {
        return this.prisma.user.findMany({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                email: true,
                login: true,
                name: true,
                imgURL: true,
                role: true
            }
        });
    }

    getUserLogin(login) {
        return this.prisma.user.findMany({
            where: {
                login: login
            }
        });
    }

    createUser(user) {
        return this.prisma.user.create({
            data: user
        });
    }

    editingUser(id, data) {
        return this.prisma.user.update({
            where: { id: Number(id) },
            data: {
                ...data
            }
        });
    }

    editingPasswordUser = async (data) => {
        const login = data.login;
        const email = data.email;
        const password = data.bcryptpassword;
        return await this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findMany({
                where: {
                    login: login,
                    email: email
                }
            });
            const userId = user[0].id;
            return this.prisma.user.update({
                where: {
                    id: Number(userId),
                    login: login,
                    email: email
                },
                data: {
                    bcryptpassword: password
                }
            });
        });
    };

    deleteUser(id) {
        return this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
    }
}