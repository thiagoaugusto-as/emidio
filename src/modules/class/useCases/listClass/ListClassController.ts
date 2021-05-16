import { Request, Response } from "express";
import { container } from "tsyringe";
import { IResponseClassDTO } from "../../mapper/IClassResponseDTO";
import { ListClassUseCase } from "./ListClassUseCase";

class ListClassController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { class_id } = request.body;

        const listClassUseCase = container.resolve(ListClassUseCase)

        const classe = await listClassUseCase.execute(class_id);

        return response.json(classe);
    }
}

export { ListClassController }