import { Request, Response } from "express";
import UpdateUserProfileService from "../services/UpdateUserProfileService";
import { z } from "zod";

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const updateUserSchema = z.object({
            name: z.string().min(2, "Name must be at least 2 characters.").optional(),
            password: z.string().min(6, "Password must be at least 6 characters.").optional()
        });

        const { name, password } = updateUserSchema.parse(req.body);
        const userId = req.user.id;

        const user = await UpdateUserProfileService.execute({ userId, name, password });

        return res.json(user);
    }
}