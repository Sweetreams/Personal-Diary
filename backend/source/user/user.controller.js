import { Router } from "express";
import { User } from "./user.service.js";
import { changePasswordSchema, changeUserSchema, userCreateSchema, userLoginSchema } from "../utils/validator/schemaValidation.js";
import { HTTPState } from "../utils/HTTPState.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getUrlPhoto, uploadPhoto } from "../utils/supabaseHepler.js";
import { jwtVerefite } from "../middleware/jwtVerefite.js";

const router = Router();
const userService = new User();

dotenv.config();

router.post("/createUser", async (req, res) => {
    try {
        await userCreateSchema.validate(req.body);
    } catch (error) {
        return res.status(400).json({
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
                res.cookie("token", token, {
                    maxAge: Math.floor(Date.now() / 1000) + (60 * 30),
                    httpOnly: true,
                    sameSite: "strict"
                });

                return res.status(200).json({
                    httpState: HTTPState.SUCCESS,
                    message: "Вы успешно создали аккаунт!"
                });
            } catch (err) {
                return res.status(400).json({
                    httpState: HTTPState.ERROR,
                    message: {
                        errorMessage: "Произошла ошибка!",
                    }
                });
            }
        });
    });

});

router.post("/loginUser", async (req, res) => {
    try {
        try {
            await userLoginSchema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorPath: err.path,
                    errorMessage: err.errors,
                }
            });
        }
        const user = await userService.getUserLogin(req.body.login);

        if (!user.length) return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: "userService",
                errorPath: "userService",
                errorMessage: "Пользователь не существует!"
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].bcryptpassword);

        if (!match) return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: "userService",
                errorPath: "userService",
                errorMessage: "Неверный пароль!"
            }
        });

        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 30), id: user[0].id, role: user[0].role }, process.env.SECRETKEYJWT);

        res.cookie("token", token, {
            maxAge: Math.floor(Date.now() / 1000) + (60 * 30),
            httpOnly: true,
            sameSite: "strict"
        });

        return res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Вы успешно вошли в аккаунт!"
        });

    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorPath: error.path,
                errorMessage: "Произошла ошибка!",
            }
        });
    }
});

router.get("/profileUser", jwtVerefite, async (req, res) => {
    try {
        const user = await userService.getUserID(req.dataFromMiddlewareJwtVerefite);

        if (!user.length) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: "Пользователя не существует"
            });
        }

        return res.status(200).json({
            httpState: HTTPState.SUCCESS,
            data: user
        });
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

router.put("/changePasswordUser", async (req, res) => {
    try {
        try {
            await changePasswordSchema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorPath: err.path,
                    errorMessage: err.errors,
                }
            });
        }

        const password = await bcrypt.hash(req.body.password, 10);

        const userPasswordChange = await userService.editingPasswordUser({
            login: req.body.login,
            bcryptpassword: password,
            email: req.body.email
        });

        if (!userPasswordChange) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorMessage: "Не удалось обновить пароль"
                }
            });
        }

        return res.status(200).json({
            httpState: HTTPState.SUCCESS,
            message: "Данные успешно обновлены!"
        });
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!"
            }
        });
    }

});

router.delete("/deleteUser", jwtVerefite, async (req, res) => {
    try {
        const user = await userService.deleteUser(req.dataFromMiddlewareJwtVerefite);
        if (user.count == 0) {
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: "Аккаунт не был удалён"
            });
        }
        res.clearCookie("token");
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

router.get(("/logout"), (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json("user logout");
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