import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { AppError } from '../utils/AppError';

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateUserDTO) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new AppError("Invalid email/password combination.", 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Invalid email/password combination.", 401);
        }

        const token = sign(
            { role: user.role },
            process.env.JWT_SECRET || 'secret_de_cria_123',
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }
}

export default new AuthenticateUserService();