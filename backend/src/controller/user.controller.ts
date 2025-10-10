import { NextFunction, Request, Response } from "express";
import { editProfileService, getProfileService, uploadImageService } from "../services/user.service";

export const getProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {id} = req.user;

        if(!id){
            const error:any = new Error("Invalid user");
            error.statusCode = 404;
            throw error;
        }

        const user = await getProfileService(id);
        res.status(200).json({message:'success', user});

    }catch(error){
        console.log('get profile error.')
        next(error);
    }
}

export const editProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {id} = req.user;
        const {name, password} = req.body;

        if(!id){
            const error:any = new Error("Invalid user");
            error.statusCode = 404;
            throw error;
        }

        const user = await editProfileService(id, {name, password});
        
        res.status(200).json({message:'success', user});
    }catch(error){
        console.log('edit profile error.')
        next(error)
    }
}

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.user;

    if (!req.file) {
      const error: any = new Error("No image uploaded");
      error.statusCode = 400;
      throw error;
    }

    const user = await uploadImageService(id, req.file);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};