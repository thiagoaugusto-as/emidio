import { Router } from "express";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

const taskRoutes = Router();

const createTaskController = new CreateTaskController();

taskRoutes.post(
    "/",
    ensureAuthenticated, 
    ensureIsProfessor,
    createTaskController.handle
);

export { taskRoutes };