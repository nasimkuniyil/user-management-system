import { NextFunction, Request, Response } from "express";
import { deleteUserService, getAllUsersService } from "../services/admin.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService();
        console.log("all users : ", users);

        res.status(200).json({ users });
    } catch (err) {
        console.log("admin get user error.")
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        
        const deletedUser = await deleteUserService(id);


    } catch (err) {
        console.log("admin delete user error.")
        next(err);
    }
}