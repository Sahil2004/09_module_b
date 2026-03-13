import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router()

router.get("/", authMiddleware, isAdmin, getUsers)
router.get("/:id", authMiddleware, isAdmin, getUser)


export { router as userRouter};