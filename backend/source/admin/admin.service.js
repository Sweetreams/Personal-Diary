import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Admin {
    prisma = prisma;

    
}