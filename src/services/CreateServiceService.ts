import { prisma } from '../config/database';
import { CreateServiceDTO } from '../dtos/CreateServiceDTO';

class CreateServiceService {
    async execute({ name, price, duration }: CreateServiceDTO) {
        const service = await prisma.service.create({
            data: {
                name,
                price,
                duration
            }
        });

        return service;
    }
}

export default new CreateServiceService();