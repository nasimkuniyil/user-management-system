import { NextFunction, Request, Response } from "express";
import validateUserData from "../../helpers/validate-form";

export const register = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const userData = req.body;
        validateUserData(userData, next);
        res.status(200).json({message:"success", userData})
        //user registration code
    } catch (error) {
        //error handler middleware
        next(error);
    }
}

export const login = async (req:Request, res:Response)=>{
    try {
        //user login code
    } catch (error) {
        //error handler middleware
    }
}

export const logout = async (req:Request, res:Response)=>{
    try {
        //user logout code
    } catch (error) {
        //error handler middleware
    }
}