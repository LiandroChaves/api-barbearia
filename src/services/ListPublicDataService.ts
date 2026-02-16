import { prisma } from '../config/database';

class ListPublicDataService {
    async listBarbers() {
        return await prisma.barber.findMany();
    }

    async listServices() {
        return await prisma.service.findMany();
    }
}

export default new ListPublicDataService();