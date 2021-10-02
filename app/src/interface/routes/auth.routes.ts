import { Router } from "express";
import authController from "../controllers/auth.controller";
import employeeController from "../controllers/employee.controller";

const authRouter = Router();

authRouter.post('/auth', authController.authenticate)
authRouter.post('/user', employeeController.create)

export default authRouter;

