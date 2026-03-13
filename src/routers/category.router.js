import { Router } from "express";
import { createCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router()

router.post("/", authMiddleware, isAdmin, createCategory)
router.get("/", authMiddleware, getCategories)
router.put("/:id", authMiddleware, updateCategory)


export { router as categoryRouter};