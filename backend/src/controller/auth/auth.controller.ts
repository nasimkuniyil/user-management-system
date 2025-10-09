import { NextFunction, Request, Response } from "express";
import User from "../../modal/user.modal";
import { error } from "console";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        console.log('user data : ', userData);
        
        res.status(200).json({ message: "success", userData })
    } catch (error) {
        console.log('hey register error.')
        next(error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        //user login code
    } catch (error) {
        //error handler middleware
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        //user logout code
    } catch (error) {
        //error handler middleware
    }
}


export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const admin = await User.findOne({ role: 'admin' });

        console.log("admin " ,admin)

        if (admin) {
            console.log('admin exist.');
            return next({ message: "admin exist", statusCode: 400 })
        }

        const userData = req.body;
        userData.role = "admin";
        console.log(userData);
        const newAdmin = new User(userData);
        await newAdmin.save();
        res.json({ message: "admin created.", admin: newAdmin })
    } catch (error: any) {
        if (error.code === 11000) {
            return next({
                statusCode: 400,
                message: `Duplicate value for field: email`,
            });
        }
        if (error.name === "ValidationError") {
            return next({
                statusCode: 400,
                message: Object.values(error.errors).map((val: any) => val.message).join(", "),
            });
        }
        next(error);
    }
}