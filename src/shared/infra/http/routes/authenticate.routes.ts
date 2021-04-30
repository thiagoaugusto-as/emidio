import { Router } from "express";
import { AuthenticateCotroller } from "../../../../modules/accounts/useCases/authenticate/AuthenticateController";

const authenticateRoute = Router();

const authenticateController = new AuthenticateCotroller();

authenticateRoute.post("/sessions", authenticateController.handle);

export { authenticateRoute };