import { NextFunction, Request, Response } from "express";
import * as z from 'zod';

const ZUserSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Name must contain only letters and spaces"),
    email: z
        .string()
        .email("Invalid email address")
        .regex(/^[A-Za-z0-9._%+-]+@gmail\.com$/i, "Only Gmail addresses allowed"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^[A-Za-z0-9]+$/, "Password must contain only letters and numbers"),
});

export const validateUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = ZUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
};