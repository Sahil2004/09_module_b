import { db } from "../db/db.js";

export async function createCategory(req, res) {
    const name = req.body.name;
    const priority = req.body.priority;
    try {
        await db.none("INSERT INTO categories (name, priority) VALUES ($1, $2)", [name, priority])
        res.status(201).json({
            success: true,
            message: "Category created"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function getCategories(req, res) {
    try {
        const result = await db.manyOrNone("SELECT id, name, priority FROM categories")
        res.status(201).json({
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function updateCategory(req, res) {
    const id = req.params.id
    const name = req.body.name;
    const priority = req.body.priority;
    try {
        if (name)
        await db.none("UPDATE categories SET name = $1 WHERE id = $2", [name, id])
        if (priority)
        await db.none("UPDATE categories SET priority = $1 WHERE id = $2", [priority, id])
        res.status(201).json({
            success: true,
            message: "Category updated"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
