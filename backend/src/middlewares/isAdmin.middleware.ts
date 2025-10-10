import { NextFunction, Request, Response } from "express";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.user;
        if (role != "admin") {
            const error = new Error("Access denied: Only admins can view users");
            (error as any).statusCode = 403;
            throw error;
        }
        next();
    } catch (error) {
        console.log('isAdmin error');
        next(error);
    }
}