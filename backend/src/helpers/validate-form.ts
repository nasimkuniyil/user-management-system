import { NextFunction } from "express";
import { ZodError } from "zod";
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

interface IUserData {
    name: string;
    email: string;
    password: string;
}

const validateUserData: (userData: IUserData, next: NextFunction) => IUserData | undefined = ({ name, email, password }, next) => {
    try {

        const data = ZUserSchema.parse({ name, email, password });
        console.log('validation done. data:', data);
        return data;

    } catch (error) {

        console.log("validation error :", error);
        if (error instanceof z.ZodError) {
            let zodErr = new Error("Invalid format");
            next(zodErr)
        }

        next(error)
        //error code
    }
}


export default validateUserData;