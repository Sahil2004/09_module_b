import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { addComment, assignRequest, cancelRequest, createRequest, getOwnRequests, getRequest, updateStatus } from "../controllers/request.controller.js";

const router = Router()

router.post("/", authMiddleware, createRequest)
router.get("/", authMiddleware, getOwnRequests)
router.get("/:id", authMiddleware, getRequest)
router.put("/:id/assign", authMiddleware, assignRequest)
router.put("/:id/status", authMiddleware, updateStatus)
router.put("/:id/cancel", authMiddleware, cancelRequest)
router.post("/:id/comments", authMiddleware, addComment)


export { router as requestRouter};