import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

interface IPayload {
    sub: string;
    role: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Authentication token missing.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub, role } = verify(token, process.env.JWT_SECRET || 'secret_de_cria_123') as IPayload;

        req.user = {
            id: sub,
            role: role,
        };

        return next();
    } catch (err) {
        throw new AppError("Invalid or expired token. Please login again.", 401);
    }
}