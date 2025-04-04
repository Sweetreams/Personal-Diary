import { redis } from "../utils/redis.js";

export const cacheMiddleware = async (req, res, next) => {
    const cachedData = await redis.get(req.originalUrl);
    if (cachedData) {
        return res.json(cachedData);
    }
    next();
};
