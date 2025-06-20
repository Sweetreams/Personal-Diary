import { Router } from "express";
import { jwtVerefite } from "../middleware/jwtVerefite.js";
import adminVerefite from "../middleware/adminVerefite.js";
import dotenv from "dotenv";

const router = Router();

dotenv.config();

router.get("/userGeneralInfo", async(res, req) => {
    
});

export const adminRouter = router;