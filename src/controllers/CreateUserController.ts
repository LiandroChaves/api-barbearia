import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import { z } from 'zod';

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const createUserSchema = z.object({
            name: z.string().min(2, "Name must be at least 2 characters."),
            email: z.string().email("Invalid email format."),
            password: z.string().min(6, "Password must be at least 6 characters.")
        });

        const { name, email, password } = createUserSchema.parse(req.body);

        const user = await CreateUserService.execute({
            name,
            email,
            password
        });

        return res.status(201).json(user);
    }
}