import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';

interface IRequest {
    appointmentId: string;
    userId: string;
    userRole: string;
}

class CancelAppointmentService {
    async execute({ appointmentId, userId, userRole }: IRequest) {
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!appointment) {
            throw new AppError("Appointment not found.", 404);
        }

        if (userRole !== 'ADMIN' && appointment.customerId !== userId) {
            throw new AppError("You do not have permission to cancel this appointment.", 403);
        }

        await prisma.appointment.delete({
            where: { id: appointmentId }
        });
    }
}

export default new CancelAppointmentService();  