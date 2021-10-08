import { Router } from "express";
import overviewController from "../controllers/overview.controller";

const overviewRouter = Router();

overviewRouter.get("/", overviewController.getOverview);
overviewRouter.get('/promotion', overviewController.getPromotion)
overviewRouter.get('/entry-exit', overviewController.getEntryExit)
overviewRouter.get('/turnover', overviewController.getTurnover)
overviewRouter.get('/use-employee/:id', overviewController.getUseEmployee)


export default overviewRouter;

