import { Router } from "express";
import { taskRoutes } from "./tasks.routes";

import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/tasks", taskRoutes);

export { router };