import express from "express";
import { userRouter } from "./source/user/user.controller.js";
import { PrismaClient } from "@prisma/client";
import { HTTPState } from "./source/utils/HTTPState.js";
import { postRouter } from "./source/post/post.controller.js";
import { errorHandling } from "./source/middleware/errorHandling.js";

const app = express();
const prisma = new PrismaClient();

async function main() {
    app.use(express.json({ limit: "5mb" }));

    app.use(errorHandling);

    app.use("/user", userRouter);

    app.use("/post", postRouter);

    app.listen(8000, () => {
        console.log("8000");
    });
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });