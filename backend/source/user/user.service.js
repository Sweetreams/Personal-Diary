import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class User {
    prisma = prisma;

    getUser(login, bcryptpassword, email) {
        
        return this.prisma.user.findMany({
            where:{
                login: login,
                email: email,
                bcryptpassword: bcryptpassword
            }
        });
    }

    getUserID(id){
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

    getUserLogin(login){
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

    editingUser(id, data){
        return this.prisma.user.update({
            where: { id: Number(id)},
            data: {
                ...data
            }
        });
    }

    deleteUser(id) {
        return this.prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
    }
    

}