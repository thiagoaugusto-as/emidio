import { Router } from "express";
import { authenticateRoute } from "./authenticate.routes";
import { taskRoutes } from "./tasks.routes";

import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/tasks", taskRoutes);
router.use(authenticateRoute);

export { router };