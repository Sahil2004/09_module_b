import { db } from "../db/db.js";

export async function createRequest(req, res) {
    const category_id = req.body.category_id;
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const user_id = req.user.id;
    try {
        const request = await db.one("INSERT INTO requests (category_id, title, description, location, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *", [category_id, title, description, location, user_id]);
        res.status(201).json({
            success: true,
            request_id: request.id
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function getOwnRequests(req, res) {
    const userId = req.user.id
    try {
        const result = await db.manyOrNone("SELECT id, title, description, location, category_id, status FROM requests WHERE created_by = $1", [userId])
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

export async function getRequest(req, res) {
    const userId = req.user.id
    const id = req.params.id
    try {
        const result = await db.one("SELECT id, status FROM requests WHERE created_by = $1 AND id = $2", [userId, id])
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function assignRequest(req, res) {
    const req_id = req.params.id
    const staff_id = req.body.staff_id
    const due_date = req.body.due_date
    try {
        await db.none("INSERT INTO request_assign (request_id, staff_id, due_date) VALUES ($1, $2, $3)", [req_id, staff_id, due_date]);
        res.status(201).json({
            success: true,
            message: "Assigned"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function updateStatus(req, res) {
    const userId = req.user.id
    const id = req.params.id
    const status = req.body.status
    try {
        await db.none("UPDATE requests SET status = $1 WHERE created_by = $2 AND id = $3", [status, userId, id])
        res.status(201).json({
            success: true,
            message: "Status updated"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function cancelRequest(req, res) {
    const userId = req.user.id
    const id = req.params.id
    const reason = req.body.reason
    const status = "CANCELLED"
    try {
        await db.none("UPDATE requests SET cancel_reason = $1 WHERE created_by = $2 AND id = $3", [reason, userId, id])
        await db.none("UPDATE requests SET status = $1 WHERE created_by = $2 AND id = $3", [status, userId, id])
        res.status(201).json({
            success: true,
            message: "Cancelled"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export async function addComment(req, res) {
    const id = req.params.id;
    const comment = req.body.comment;
    try {
        await db.none("INSERT INTO comments (request_id, comment) VALUES ($1, $2)", [id, comment]);
        res.status(201).json({
            success: true,
            message: "Comment added"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}