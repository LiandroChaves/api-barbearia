import { Request, Response } from 'express';
import CreateServiceService from '../services/CreateServiceService';
import { z } from 'zod';

export class CreateServiceController {
    async handle(req: Request, res: Response) {
        const createServiceSchema = z.object({
            name: z.string().min(2, "Name must be at least 2 characters."),
            price: z.number().positive("Price must be a positive number."),
            duration: z.number().int().positive("Duration must be a positive integer (minutes).")
        });

        const { name, price, duration } = createServiceSchema.parse(req.body);

        const service = await CreateServiceService.execute({
            name,
            price,
            duration
        });

        return res.status(201).json(service);
    }
}