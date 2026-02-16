import { Request, Response } from 'express';
import CancelAppointmentService from '../services/CancelAppointmentService';

export class CancelAppointmentController {
    async handle(req: Request, res: Response) {
        const appointmentId = String(req.params.id);
        const { id: userId, role: userRole } = req.user;

        await CancelAppointmentService.execute({
            appointmentId,
            userId,
            userRole
        });

        return res.status(204).send();
    }
}