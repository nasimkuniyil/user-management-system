import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';

const ZAuthSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .regex(/^[A-Za-z0-9._%+-]+@gmail\.com$/i, "Only Gmail addresses allowed"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^[A-Za-z0-9]+$/, "Password must contain only letters and numbers"),
});

export const validateAuthData = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = ZAuthSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error("Validation failed");
            (error as any).statusCode = 400;
            (error as any).errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            throw error;
        }
        next();
    } catch (error) {
        console.log('login data validation error.');
        next(error);
    }
}