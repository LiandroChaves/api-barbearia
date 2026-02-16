import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { role } = req.user;

    if (role !== 'ADMIN') {
        throw new AppError("Access denied! Admins only.", 403);
    }

    return next();
}