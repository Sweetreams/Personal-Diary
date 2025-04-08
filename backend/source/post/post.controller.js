import { Router } from "express";
import { Post } from "./post.service.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";
import { HTTPState } from "../utils/HTTPState.js";
import { changePostSchema, createPostSchema, deletePostSchema } from "../utils/validator/schemaValidation.js";

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
router.get("/getPosts", jwtVerefite, async (req, res) => {
    try {
        const data = await postService.getPosts(req.dataFromMiddlewareJwtVerefite);
        return res.status(200).json(data);
    } catch {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Ошибка получения данных"
        });
    }
});

router.get("/getPost", jwtVerefite, async (req, res) => {
    try {
        const data = await postService.getPost(req.dataFromMiddlewareJwtVerefite, req.body.id_post);
        if (data.length == 0) {
            return res.status(204).json({
                httpState: HTTPState.SUCCESS,
                message: "Ничего не найдено"
            });
        }
        return res.status(200).json(data);
    } catch {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Ошибка получения данных"
        });
    }
});

router.post("/createPost", jwtVerefite, async (req, res) => {
    try {
        try {
            await createPostSchema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorPath: err.path,
                    errorMessage: "Ошибка валидации! Проверьте все поля на наличие ошибок",
                }
            });
        }
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
                errorMessage: "Произошла ошибка"
            }
        });
    }
});

router.put("/changePost", jwtVerefite, async (req, res) => {
    try {
        try {
            await changePostSchema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorPath: err.path,
                    errorMessage: "Ошибка валидации! Проверьте все поля на наличие ошибок",
                }
            });
        }

        await postService.changePost(req.dataFromMiddlewareJwtVerefite, req.body);

        return res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Обновлён"
        });
    } catch (err) {
        return res.status(400).json({
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
        try {
            await deletePostSchema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorPath: err.path,
                    errorMessage: "Ошибка валидации! Проверьте все поля на наличие ошибок",
                }
            });
        }

        const deletePost = await postService.deletePost(req.body.id, req.dataFromMiddlewareJwtVerefite);

        if (deletePost.count == 1) {
            return res.status(200).json({
                httpState: HTTPState.SUCCESS,
                message: "Пост удалён"
            });
        } else {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorMessage: "Пост не удалён",
                    err: err
                }
            });
        }

    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!",
            }
        });
    }
});

export const postRouter = router;