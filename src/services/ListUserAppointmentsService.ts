import { prisma } from '../config/database';

class ListUserAppointmentsService {
    async execute(customerId: string) {
        const appointments = await prisma.appointment.findMany({
            where: {
                customerId,
            },
            include: {
                barber: true,
                service: true,
            },
            orderBy: {
                date: 'asc',
            },
        });

        return appointments;
    }
}

export default new ListUserAppointmentsService();