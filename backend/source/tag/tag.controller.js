import { Router } from "express";
import { TagService } from "./tag.service.js";
import { HTTPState } from "../utils/HTTPState.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";

const router = Router();
const tagService = new TagService();

router.get("/tagGet", jwtVerefite, async (req, res) => {
    try {
        const tags = await tagService.getTags(req.dataFromMiddlewareJwtVerefite);
        res.status(200).json(tags);
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Ошибка получения тэгов",
            }
        });
    }
});

router.post("/tagcreate", jwtVerefite, async(req, res) => {
    try {
        await tagService.createTags(req.dataFromMiddlewareJwtVerefite, req.body);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Тэг создан!"
        });
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Ошибка создания тэгов",
            }
        });
    }
});

router.delete("/tagdelete", jwtVerefite, async(req, res) => {
    try {
        await tagService.deleteTag(req.dataFromMiddlewareJwtVerefite, req.body);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Тэг удалён!"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Ошибка создания тэгов",
            }
        });
    }
});

export const tagRouter = router;