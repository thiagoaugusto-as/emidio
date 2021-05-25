import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../../../../modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../../../../modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const listUserController = new ListUserController();

usersRoutes.post(
    "/",
    ensureAuthenticated,
    ensureIsProfessor,
    createUserController.handle
);

usersRoutes.put(
    "/:id",
    ensureAuthenticated,
    updateUserController.handle
);


usersRoutes.get(
    "/find",
    ensureAuthenticated,
    listUserController.handle
);

export { usersRoutes };