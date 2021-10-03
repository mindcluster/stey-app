import { Router } from "express";
import overviewController from "../controllers/overview.controller";

const overviewRouter = Router();

overviewRouter.get('/promotion', overviewController.getPromotion)
overviewRouter.get('/entry-exit', overviewController.getEntryExit)

export default overviewRouter;

