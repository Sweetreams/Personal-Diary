import { Router } from "express";
import { Post } from "./post.service.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";
import { HTTPState } from "../utils/HTTPState.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { redis } from "../utils/redis.js";

const router = Router();
const postService = new Post();

router.get("/searchPost", async (req, res) => {
    try {
        const search = await postService.postSearch(req.body.text);
        if (search.length == 0) {
            return res.status(204).json({
                httpState: HTTPState.SUCCESS,
                message: "Ничего не найдено"
            });
        }
        return res.status(200).json(search);
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Не удалось создать пост"
            }
        });
    }
});

router.get("/getPosts", jwtVerefite, cacheMiddleware, async (req, res) => {
    try {
        const data = await postService.getPosts(req.dataFromMiddlewareJwtVerefite);
        const redisData = await redis.set(req.originalUrl, JSON.stringify(data), { ex: 60 });
        if (redisData == "OK") {
            res.status(200).json(data);
        } else {
            res.status(200).json(redisData);
        }

    } catch {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Ошибка получения данных"
        });
    }
});

router.get("/getPost", jwtVerefite, cacheMiddleware, async (req, res) => {
    try {
        const redisData = await redis.get(req.originalUrl + req.body.id_post);
        if (redisData === null){
            const data = await postService.getPost(req.dataFromMiddlewareJwtVerefite, req.body.id_post);
            if (data.length == 0 && redisData === null) {
                return res.status(204).json({
                    httpState: HTTPState.SUCCESS,
                    message: "Ничего не найдено"
                });
            }
            return res.status(200).json(data);
        }
        return res.status(200).json(redisData);

    } catch {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Ошибка получения данных"
        });
    }
});

router.post("/createPost", jwtVerefite, async (req, res) => {
    try {
        await postService.createPost(req.dataFromMiddlewareJwtVerefite, req.body);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Пост создан"
        });
    } catch (err) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Не удалось создать пост"
            }
        });
    }
});

router.put("/changePost", jwtVerefite, async (req, res) => {
    try {
        await postService.changePost(req.dataFromMiddlewareJwtVerefite, req.body);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Обновлён"
        });
    } catch (err) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Не удалось Обновить пост"
            }
        });
    }

});

router.delete("/deletePost", jwtVerefite, async (req, res) => {
    try {
        await postService.deletePost(req.body.id, req.dataFromMiddlewareJwtVerefite);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Пост удалён"
        });

    } catch (err) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!",
                err: err
            }
        });
    }
});

export const postRouter = router;