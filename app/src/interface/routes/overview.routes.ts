import { Router } from "express";
import overviewController from "../controllers/overview.controller";

const overviewRouter = Router();

overviewRouter.get('/promotion', overviewController.getPromotion)

export default overviewRouter;

