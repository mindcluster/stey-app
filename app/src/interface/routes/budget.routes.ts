import { Router } from "express";
import budgetController from "../controllers/budget.controller";

const budgetRouter = Router();

budgetRouter.get("/", budgetController.getAll);
budgetRouter.get("/current", budgetController.getCurrentBudget);
budgetRouter.get("/:id", budgetController.getByID);
budgetRouter.patch("/:id", budgetController.update);

export default budgetRouter;

