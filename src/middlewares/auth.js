import jwt from "jsonwebtoken";
import { TOKENPRIVATEKEY } from "../config/vars.js";

export function authMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    try {
        req.user = jwt.verify(token, TOKENPRIVATEKEY)
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    next()
}