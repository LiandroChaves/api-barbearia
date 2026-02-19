import { startOfHour, isBefore } from 'date-fns';
import { prisma } from '../config/database';
import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO';
import { AppError } from '../utils/AppError';

class CreateAppointmentService {
    async execute({ barberId, serviceId, date, customerId }: CreateAppointmentDTO) {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, new Date())) {
            throw new AppError("Cannot schedule appointments in the past.", 400);
        }

        const barberExists = await prisma.barber.findUnique({ where: { id: barberId } });
        if (!barberExists) {
            throw new AppError("Barber not found.", 404);
        }

        const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });
        if (!serviceExists) {
            throw new AppError("Service not found.", 404);
        }

        const appointment = await prisma.appointment.create({
            data: {
                barberId,
                serviceId,
                customerId,
                date: appointmentDate,
            }
        });

        return appointment;
    }
}

export default new CreateAppointmentService();