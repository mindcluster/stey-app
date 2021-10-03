import { Router } from "express"
import authMiddleware from "../../infrastructure/middleware/auth.middleware"
import authRouter from "./auth.routes";
import employeeRouter from "./employee.routes";
import integrationRouter from "./integrations.routes";
import overviewRouter from "./overview.routes";


const router = Router()

router.use("/", authRouter)

router.use(authMiddleware);

router.use("/integration", integrationRouter);
router.use("/employee", employeeRouter)
router.use("/overview", overviewRouter)

export default router