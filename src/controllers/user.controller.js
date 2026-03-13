import { ROLES, TOKENPRIVATEKEY } from "../config/vars.js";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken"

export async function userRegister(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    if (!ROLES.includes(role)) {
        res.status(400).json({
            success: false,
            message: "role not correct"
        })
    }
    try {
        await db.none("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, password, role]);
        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await db.one("SELECT * FROM users WHERE email = $1", [email])
        if (user.password === password) {
            const newUser = {
                email: user.email,
                name: user.name,
                id: user.id,
                created_at: user.created_at,
                role: user.role,
            }
            const token = jwt.sign(newUser, TOKENPRIVATEKEY, {
                expiresIn: "2h"
            })
            res.setHeader('Authorization', `Bearer ${token}`)
            res.status(200).json({
                success: true,
                token: token
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export function getProfile(req, res) {
    const user = req.user
    res.status(200).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

export function logout(req, res) {
    res.removeHeader("Authorization")
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

export async function getUsers(req, res) {
    try {
        const users = await db.manyOrNone("SELECT * FROM users");
        const filtered = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                role: user.role
            }
        })
        res.status(200).json({
            success: true,
            data: filtered
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function getUser(req, res) {
    const id = req.params.id
    try {
        const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}