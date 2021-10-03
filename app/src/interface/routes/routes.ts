import { Router } from "express"
import authMiddleware from "../../infrastructure/middleware/auth.middleware"
import authRouter from "./auth.routes";
import integrationRouter from "./integrations.routes";


const router = Router()

router.use("/", authRouter)

router.use(authMiddleware);

router.use("/integration", integrationRouter);

export default router