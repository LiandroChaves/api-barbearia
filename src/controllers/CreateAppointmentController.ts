import { Request, Response } from 'express';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { z } from 'zod';

export class CreateAppointmentController {
    async handle(req: Request, res: Response) {
        const createAppointmentSchema = z.object({
            barberId: z.string().uuid("Invalid barber ID."),
            serviceId: z.string().uuid("Invalid service ID."),
            date: z.string().datetime("Invalid date format.")
        });

        const { barberId, serviceId, date } = createAppointmentSchema.parse(req.body);
        const customerId = req.user.id;

        const appointment = await CreateAppointmentService.execute({
            barberId,
            serviceId,
            date: new Date(date),
            customerId
        });

        return res.status(201).json(appointment);
    }
}