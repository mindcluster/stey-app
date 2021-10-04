import { Router } from "express";
import employeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", employeeController.getAll);
employeeRouter.get("/:id/info-salary", employeeController.infoSalary);
employeeRouter.post("/:id/salary-increase", employeeController.increaseSalary);

export default employeeRouter;

