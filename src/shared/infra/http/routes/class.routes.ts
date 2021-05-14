import { Router } from "express";
import { CreateClassController } from "../../../../modules/class/useCases/CreateClassController";

const classRoutes = Router();

const createClassController = new CreateClassController();

classRoutes.post("/", createClassController.handle);

export { classRoutes };