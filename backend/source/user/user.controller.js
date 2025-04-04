import { Router } from "express";
import { User } from "./user.service.js";
import { changeUserSchema, userCreateSchema, userLoginSchema } from "../utils/validator/schemaValidation.js";
import { HTTPState } from "../utils/HTTPState.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getUrlPhoto, uploadPhoto } from "../utils/supabaseHepler.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { redis } from "../utils/redis.js";

const router = Router();
const userService = new User();

dotenv.config();

router.post("/createUser", async (req, res) => {
    try {
        await userCreateSchema.validate(req.body);
    } catch (error) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: error.name,
                errorPath: error.path,
                errorMessage: error.errors,
            }
        });
    }

    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            try {
                const user = await userService.createUser({
                    login: req.body.login,
                    bcryptpassword: hash,
                    email: req.body.mail,
                    name: req.body.login,
                    imgURL: await getUrlPhoto("/noteuser.png")
                });
                const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 30), id: user.id, role: user.role }, process.env.SECRETKEYJWT);

                return res.status(200).json({
                    httpState: HTTPState.SUCCESS,
                    token: token,
                    expToken: Math.floor(Date.now() / 1000) + (60 * 30),
                    message: "Вы успешно зарегистрировались"
                });

            } catch {
                res.status(400).json({
                    httpState: HTTPState.ERROR,
                    message: {
                        errorMessage: "Произошла ошибка!",
                    }
                });
            }
        });
    });

});

router.get("/loginUser", async (req, res) => {
    try {
        await userLoginSchema.validate(req.body);
    } catch (error) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: error.name,
                errorPath: error.path,
                errorMessage: error.errors,
            }
        });
    }
    const user = await userService.getUserLogin(req.body.login);
    if (!user.length) return res.status(400).json({
        httpState: HTTPState.ERROR,
        message: "Пользователь не существует!"
    });
    const match = await bcrypt.compare(req.body.password, user[0].bcryptpassword);
    if (!match) return res.status(400).json({
        httpState: HTTPState.ERROR,
        message: "Неверный пароль!"
    });
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 30), id: user[0].id, role: user[0].role }, process.env.SECRETKEYJWT);
    return res.status(200).json({
        httpState: HTTPState.SUCCESS,
        token: token,
        expToken: Math.floor(Date.now() / 1000) + (60 * 30),
        message: "Вы успешно вошли в аккаунт!"
    });
});

router.get("/profileUser", jwtVerefite, cacheMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserID(req.dataFromMiddlewareJwtVerefite);
        const redisData = await redis.set(req.originalUrl, JSON.stringify(user), { ex: 60 });

        if (!user.length) return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: "Пользователя не существует"
        });
        
        if (redisData == "OK") {
            return res.status(200).json({
                httpState: HTTPState.SUCCESS,
                data: user
            });
        } else {
            return res.status(200).json({
                httpState: HTTPState.SUCCESS,
                data: redisData
            });
        }
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: err.message
            }
        });
    }
});

router.put("/changeUser", jwtVerefite, async (req, res) => {
    try {
        await changeUserSchema.validate(req.body);
        if (req.body.imgURL) req.body.imgURL = await uploadPhoto(req.body.imgURL);
        if (req.body.bcryptpassword) req.body.bcryptpassword = await bcrypt.hash(req.body.bcryptpassword, 10);
        if (req.dataFromMiddlewareUserRole != "admin") {
            if (req.body.role) return res.status(403).json({
                httpState: HTTPState.ERROR,
                message: "У вас недостаточно прав!"
            });
        }
        await userService.editingUser(req.dataFromMiddlewareJwtVerefite, req.body);
        res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Данные успешно обновлены!"
        });
    } catch (err) {
        res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: err.message
            }
        });
    }

});

router.delete("/deleteUser", jwtVerefite, async (req, res) => {
    try {
        const user = await userService.deleteUser(req.dataFromMiddlewareJwtVerefite);
        if (user.count == 0) {
            return res.status(200).json({
                httpState: HTTPState.ERROR,
                message: "Аккаунт не был удалён"
            });
        }
        return res.status(200).json({
            httpState: HTTPState.ERROR,
            message: "Аккаунт успешно удалён!"
        });
    } catch (err) {
        return res.status(401).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: err.message
            }
        });
    }
});

export const userRouter = router;