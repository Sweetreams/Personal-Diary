import { Router } from "express";
import { Statistic } from "./statistic.service.js";
import adminVerefite from "../middleware/adminVerefite.js";
import { HTTPState } from "../utils/HTTPState.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";

const router = Router();
const statisticService = new Statistic();

router.get("/statisticCount", jwtVerefite, async (req, res) => {
    try {

        const statistic = await statisticService.getCountUserAndPost(req.dataFromMiddlewareJwtVerefite);

        return res.status(200).json({
            httpState: HTTPState.SUCCESS,
            data: statistic
        });
    } catch {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorMessage: "Произошла ошибка!",
            }
        });
    }
});

export const statisticRouter = router;