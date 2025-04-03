import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTPState } from "../utils/HTTPState.js";

dotenv.config();

export const jwtVerefite = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRETKEYJWT, (err, decode) => {
            if (!err) {
                req.dataFromMiddlewareJwtVerefite = decode.id;
                req.dataFromMiddlewareUserRole = decode.role;
                
                next();
            }
            else return res.status(401).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorMessage: err.message
                }
            });
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
};