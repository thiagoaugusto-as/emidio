import { container } from "tsyringe";

//import "@shared/container/providers";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { TasksRepository } from "../../modules/task/infra/typeorm/repositories/TasksRepository";
import { ITasksRepository } from "../../modules/task/repositories/ITaskRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ITasksRepository>(
    "TasksRepository",
    TasksRepository
);