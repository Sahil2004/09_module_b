import { Router } from "express";
import { login, userRegister, getProfile, logout } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router()

router.post("/register", userRegister)
router.post("/login", login)
router.get("/profile", authMiddleware, getProfile)
router.post("/logout", authMiddleware, logout)


export { router as authRouter};