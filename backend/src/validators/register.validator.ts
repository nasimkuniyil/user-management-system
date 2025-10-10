import { NextFunction, Request, Response } from "express";
import * as z from 'zod';

const ZRegisterSchema = z.object({
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

export const validateRegisterData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("hey : ", req.body)
        const result = ZRegisterSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error("Validation failed");
            (error as any).statusCode = 400;
            (error as any).errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            throw error;
        }

        req.body = result.data;
        next();
    } catch (error) {
        console.log("catch validation error.");
        next(error);
    }
};