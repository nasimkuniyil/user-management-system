import { NextFunction, Request, Response } from "express";

export const register = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const userData = req.body;
        
        res.status(200).json({message:"success", userData})
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