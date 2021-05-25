import { container } from "tsyringe";

import "../container/providers";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { TasksRepository } from "../../modules/task/infra/typeorm/repositories/TasksRepository";
import { ITasksRepository } from "../../modules/task/repositories/ITaskRepository";
import { ITaskFileRepository } from "../../modules/task/repositories/ITaskFileRepository";
import { TaskFileRepository } from "../../modules/task/infra/typeorm/repositories/TaskFileRepository";
import { ClassRepository } from "../../modules/class/infra/typeorm/repositories/ClassRepository";
import { IClassRepository } from "../../modules/class/repositories/IClassRepository";
import { SendedTaskRepository } from "../../modules/task/infra/typeorm/repositories/SendedTaskRepository";
import { ISendedTaskRepository } from "../../modules/task/repositories/ISendedTaskRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ITasksRepository>(
    "TasksRepository",
    TasksRepository
);

container.registerSingleton<ITaskFileRepository>(
    "TaskFileRepository",
    TaskFileRepository
);

container.registerSingleton<IClassRepository>(
    "ClassRepository",
    ClassRepository
);

container.registerSingleton<ISendedTaskRepository>(
    "SendedTaskRepository",
    SendedTaskRepository
);