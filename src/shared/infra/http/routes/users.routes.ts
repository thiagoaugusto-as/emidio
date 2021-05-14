import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../../../../modules/accounts/useCases/listUsers/ListUsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

const usersRoutes = Router();

const createUserController = new CreateUserController();

const listUserController = new ListUserController();

usersRoutes.post(
    "/",
    ensureAuthenticated,
    ensureIsProfessor,
    createUserController.handle
)

usersRoutes.get(
    "/find",
    ensureAuthenticated,
    ensureIsProfessor,
    listUserController.handle
)

export { usersRoutes };