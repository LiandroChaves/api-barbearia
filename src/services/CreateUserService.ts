import { hash } from 'bcryptjs';
import { prisma } from '../config/database';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AppError } from '../utils/AppError';

class CreateUserService {
    async execute({ name, email, password }: CreateUserDTO) {
        const userAlreadyExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new AppError("Email already registered.", 409);
        }

        const passwordHash = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        return user;
    }
}

export default new CreateUserService();