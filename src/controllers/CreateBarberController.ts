import { Request, Response } from 'express';
import CreateBarberService from '../services/CreateBarberService';
import { z } from 'zod';

export class CreateBarberController {
    async handle(req: Request, res: Response) {
        const createBarberSchema = z.object({
            name: z.string().min(2, "Name must be at least 2 characters."),
            bio: z.string().optional()
        });

        const { name, bio } = createBarberSchema.parse(req.body);

        const barber = await CreateBarberService.execute({
            name,
            bio
        });

        return res.status(201).json(barber);
    }
}