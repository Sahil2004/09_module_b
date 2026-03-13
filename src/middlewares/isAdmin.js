export function isAdmin(req, res, next) {
    if (req.user.role === "ADMIN") next()
    else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}