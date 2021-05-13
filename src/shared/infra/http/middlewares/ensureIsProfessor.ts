import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureIsProfessor(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if(!user.isProfessor || !user.isAdmin) {
        throw new AppError("User isn' professor!", 401);
    }

    return next();
}