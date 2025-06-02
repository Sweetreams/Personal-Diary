import express from "express";
import { userRouter } from "./source/user/user.controller.js";
import { PrismaClient } from "@prisma/client";
import { postRouter } from "./source/post/post.controller.js";
import { errorHandling } from "./source/middleware/errorHandling.js";
import { mailRouter } from "./source/mail/mail.controller.js";
import { tagRouter } from "./source/tag/tag.controller.js";
import helmet from "helmet";
import cors from "cors";
import { statisticRouter } from "./source/statistic/statistic.controller.js";

export const app = express();
const prisma = new PrismaClient();

async function main() {
    app.use(express.json({ limit: "5mb" }));

    app.use(cors({
        origin: ["https://cozy-bubblegum-d84f4e.netlify.app", "http://localhost:5173", "https://soultrackserver.ru"],
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
        credentials: true,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "cache-control", "Authorization", "pragma", "expires"],
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
        maxAge: 86400
    }));

    app.use((req, res, next) => {
        if (req.url.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
        }
        next();
    });

    // app.use(errorHandling);

    // app.use(helmet());

    app.use("/user", userRouter);

    app.use("/post", postRouter);

    app.use("/mail", mailRouter);

    app.use("/tag", tagRouter);

    app.use("/stat", statisticRouter);

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