import { Router } from "express";
import * as multer from "multer";

import uploadConfig from "../../../../config/upload";

import { CreateTaskFileController } from "../../../../modules/task/useCases/createTaskFile/CreateTaskFileController";
import { CreateTaskController } from "../../../../modules/task/useCases/createTask/CreateTaskController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";
import { ListTasksController } from "../../../../modules/task/useCases/listTasks/ListTasksController";
import { ListTaskFilesController } from "../../../../modules/task/useCases/listTaskFiles/ListTaskFilesController";
import { CreateSendedTaskController } from "../../../../modules/task/useCases/createSendedTask/CreateSendedTaskController";
import { UpdateTaskController } from "../../../../modules/task/useCases/updateTask/UpdateTaskControllet";
import { ListTasksWithCompleteInfoController } from "../../../../modules/task/useCases/listTasksWithCompleteInfo/ListTasksWithCompleteInfoController";

const taskRoutes = Router();

const upload = multer(uploadConfig)

const createTaskFileController = new CreateTaskFileController()
const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const listTaskController = new ListTasksController();
const listTaskFilesController = new ListTaskFilesController();
const createSendedTaskController = new CreateSendedTaskController();
const listTasksWithCompletedInfo = new ListTasksWithCompleteInfoController();

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

taskRoutes.put(
    "/:id",
    ensureAuthenticated, 
    ensureIsProfessor,
    updateTaskController.handle
);

taskRoutes.get(
    "/find",
    ensureAuthenticated,
    listTaskController.handle
);

taskRoutes.get(
    "/return-completed-info",
    ensureAuthenticated,
    listTasksWithCompletedInfo.handle
);

taskRoutes.post(
    "/send-task",
    ensureAuthenticated,
    createSendedTaskController.handle
);

export { taskRoutes };