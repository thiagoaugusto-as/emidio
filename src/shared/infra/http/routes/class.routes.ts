import { Router } from "express";
import { CreateClassController } from "../../../../modules/class/useCases/CreateClass/CreateClassController";

const classRoutes = Router();

const createClassController = new CreateClassController();

classRoutes.post("/", createClassController.handle);

export { classRoutes };