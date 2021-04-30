import { Router } from "express";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";

const taskRoutes = Router();

const createTaskController = new CreateTaskController();

taskRoutes.use("/", createTaskController.handle);

export { taskRoutes };