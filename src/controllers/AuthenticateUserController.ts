import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { z } from 'zod';

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const authenticateUserSchema = z.object({
            email: z.string().email("Invalid email format."),
            password: z.string().min(1, "Password is required.")
        });

        const { email, password } = authenticateUserSchema.parse(req.body);

        const session = await AuthenticateUserService.execute({
            email,
            password
        });

        return res.json(session);
    }
}