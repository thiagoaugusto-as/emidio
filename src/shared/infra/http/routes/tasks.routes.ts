import { Router } from "express";
import * as multer from "multer";

import { CreateTaskFileController } from "../../../../modules/task/useCases/createTaskFile/CreateTaskFileController";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

import uploadConfig from "../../../../config/upload";
import { ListTasksController } from "../../../../modules/task/useCases/listTasks/ListTasksController";

const taskRoutes = Router();

const upload = multer(uploadConfig)

const createTaskFileController = new CreateTaskFileController()
const createTaskController = new CreateTaskController();
const listTaskController = new ListTasksController();

taskRoutes.post(
    "/files/:id",
    ensureAuthenticated,
    upload.array("files"),
    createTaskFileController.handle
)

taskRoutes.post(
    "/",
    ensureAuthenticated, 
    ensureIsProfessor,
    createTaskController.handle
);

taskRoutes.get(
    "/find",
    ensureAuthenticated,
    listTaskController.handle
);

export { taskRoutes };