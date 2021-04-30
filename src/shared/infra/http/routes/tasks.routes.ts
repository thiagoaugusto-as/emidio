import { Router } from "express";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const taskRoutes = Router();

const createTaskController = new CreateTaskController();

taskRoutes.post(
    "/",
    ensureAuthenticated, 
    createTaskController.handle
);

export { taskRoutes };