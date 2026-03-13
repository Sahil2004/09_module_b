import express, { Router } from "express";
import cors from "cors";
import { authRouter } from "./routers/auth.router.js";
import { userRouter } from "./routers/user.router.js";
import { categoryRouter } from "./routers/category.router.js";
import { requestRouter } from "./routers/requests.router.js";

const app = express()

app.use(express.json())
app.use(cors())

const mainRouter = Router()

app.use("/01_module_b/api", mainRouter)

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter)
mainRouter.use("/categories", categoryRouter)
mainRouter.use("/requests", requestRouter)

mainRouter.get("/", (req, res) => {
    res.status(200).send("API is up")
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})