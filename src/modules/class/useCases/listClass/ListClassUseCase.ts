import { inject, injectable } from "tsyringe";
import { ClassRepository } from "../../infra/typeorm/repositories/ClassRepository";

@injectable()
class ListClassUseCase {
    constructor(
        @inject("ClassRepository")
        private classRepository: ClassRepository

    ) {}
}