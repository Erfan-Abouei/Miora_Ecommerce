import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validateQuery =
    <T = unknown>(schema: ZodType<T>) =>
        (req: Request, _res: Response, next: NextFunction): void => {
            try {
                schema.parse(req.query);
                next();
            } catch (error: unknown) {
                next(error);
            }
        };