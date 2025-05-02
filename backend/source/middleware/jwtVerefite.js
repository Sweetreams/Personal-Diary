import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTPState } from "../utils/HTTPState.js";

dotenv.config();

export const jwtVerefite = (req, res, next) => {
    try {
        const tokenRegExp = req.headers.cookie.match(/=([^\n]+)/);
        const cookie = tokenRegExp?.[1];
        
        if (!cookie) throw new Error("cookies error");

        jwt.verify(cookie, process.env.SECRETKEYJWT, (err, decode) => {
            if (!err) {
                req.dataFromMiddlewareJwtVerefite = decode.id;
                req.dataFromMiddlewareUserRole = decode.role;
                next();
            }
            else return res.status(401).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorMessage: "Пользователь не авторизован!"
                }
            });
        });
    } catch (err) {
        return res.status(401).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!"
            }
        });
    }
};