import { Request, Response } from 'express';
import ListUserAppointmentsService from '../services/ListUserAppointmentsService';

export class ListUserAppointmentsController {
    async handle(req: Request, res: Response) {
        const customerId = req.user.id;

        const appointments = await ListUserAppointmentsService.execute(customerId);

        return res.json(appointments);
    }
}