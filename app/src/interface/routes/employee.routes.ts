import { Router } from "express";
import employeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", employeeController.getAll);

export default employeeRouter;

