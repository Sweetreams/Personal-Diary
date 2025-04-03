import { Router } from "express";
import { Post } from "./post.service.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";
import { HTTPState } from "../utils/HTTPState.js";

const router = Router();
const postService = new Post();

router.get("/getPosts", jwtVerefite, async (req, res) => {
    try {
        res.status(200).json(await postService.getPosts(req.dataFromMiddlewareJwtVerefite));
    } catch {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Ошибка получения данных"
        });
    }
});

router.get("/getPost", jwtVerefite, async (req, res) => {
    try {
        res.status(200).json(await postService.getPost(req.dataFromMiddlewareJwtVerefite, req.body.id_post));
    } catch {
        res.status(400).json({
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

router.put("/changePost", jwtVerefite, async(req, res) => {
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