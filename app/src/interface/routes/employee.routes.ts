import { Router } from "express";
import employeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", employeeController.getAll);
employeeRouter.get("/:id", employeeController.getById);
employeeRouter.get("/:id/info-salary", employeeController.infoSalary);
employeeRouter.post("/:id/salary-increase", employeeController.increaseSalary);
employeeRouter.put("/:id", employeeController.update);

export default employeeRouter;

