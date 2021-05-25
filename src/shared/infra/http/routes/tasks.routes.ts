import { Router } from "express";
import * as multer from "multer";

import { CreateTaskFileController } from "../../../../modules/task/useCases/createTaskFile/CreateTaskFileController";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

import uploadConfig from "../../../../config/upload";
import { ListTasksController } from "../../../../modules/task/useCases/listTasks/ListTasksController";
import { ListTaskFilesController } from "../../../../modules/task/useCases/listTaskFiles/ListTaskFilesController";
import { CreateSendedTaskController } from "../../../../modules/task/useCases/createSendedTask/CreateSendedTaskController";

const taskRoutes = Router();

const upload = multer(uploadConfig)

const createTaskFileController = new CreateTaskFileController()
const createTaskController = new CreateTaskController();
const listTaskController = new ListTasksController();
const listTaskFilesController = new ListTaskFilesController();
const createSendedTaskController = new CreateSendedTaskController();

taskRoutes.post(
    "/files",
    ensureAuthenticated,
    upload.array("files"),
    createTaskFileController.handle
);

taskRoutes.get(
    "/files/find",
    ensureAuthenticated,
    listTaskFilesController.handle
);;

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

taskRoutes.post(
    "/send",
    ensureAuthenticated,
    createSendedTaskController.handle
);

export { taskRoutes };