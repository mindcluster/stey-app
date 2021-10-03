import { Router } from "express";
import integrationController from "../controllers/integration.controller";

const integrationRouter = Router();

integrationRouter.get("/", integrationController.getAll);
integrationRouter.get("/me", integrationController.getByEmployee );

export default integrationRouter;

