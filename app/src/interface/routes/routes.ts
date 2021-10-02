import { Router } from "express"
import authMiddleware from "../../infrastructure/middleware/auth.middleware"
import authRouter from "./auth.routes";


const router = Router()

router.use("/", authRouter)

router.use(authMiddleware);

export default router