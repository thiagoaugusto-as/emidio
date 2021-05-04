import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureIsAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    if(!id) {
        throw new AppError("Invalid route!", 401);
    }

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if(!user.isAdmin) {
        throw new AppError("User isn' admin!", 401);
    }

    return next();
}