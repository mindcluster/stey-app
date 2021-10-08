import { Router } from "express";
import overviewController from "../controllers/overview.controller";

const overviewRouter = Router();

overviewRouter.get("/", overviewController.getOverview);
overviewRouter.get('/promotion', overviewController.getPromotion)
overviewRouter.get('/entry-exit', overviewController.getEntryExit)
overviewRouter.get('/turnover', overviewController.getTurnover)
overviewRouter.get('/use-employee/:id', overviewController.getUseEmployee)
overviewRouter.get('/future-level-experience/:id', overviewController.getFutureLevelExperience)


export default overviewRouter;

