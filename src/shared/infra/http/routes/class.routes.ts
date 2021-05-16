import { Router } from "express";
import { CreateClassController } from "../../../../modules/class/useCases/CreateClass/CreateClassController";
import { ListClassController } from "../../../../modules/class/useCases/listClass/ListClassController";

const classRoutes = Router();

const createClassController = new CreateClassController();

const listClassController = new ListClassController();

classRoutes.post("/", createClassController.handle);

classRoutes.get("/find", listClassController.handle);

export { classRoutes };