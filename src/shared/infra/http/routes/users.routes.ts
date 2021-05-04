import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsProfessor } from "../middlewares/ensureIsProfessor";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post(
    "/",
    ensureAuthenticated,
    ensureIsProfessor,
    createUserController.handle
)

export { usersRoutes };