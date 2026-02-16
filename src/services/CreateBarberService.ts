import { prisma } from '../config/database';
import { CreateBarberDTO } from '../dtos/CreateBarberDTO';

class CreateBarberService {
    async execute({ name, bio }: CreateBarberDTO) {
        const barber = await prisma.barber.create({
            data: {
                name,
                bio,
            }
        });

        return barber;
    }
}

export default new CreateBarberService();