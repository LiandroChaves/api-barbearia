import { hash } from 'bcryptjs';
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';

interface IRequest {
    userId: string;
    name?: string;
    password?: string;
}

class UpdateUserProfileService {
    async execute({ userId, name, password }: IRequest) {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        const data: any = {};
        if (name) data.name = name;
        if (password) data.password = await hash(password, 8);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
            select: { id: true, name: true, email: true }
        });

        return updatedUser;
    }
}

export default new UpdateUserProfileService();