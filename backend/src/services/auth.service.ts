import User, { IUser } from "../modal/user.modal";
import bcrypt from 'bcrypt';
import { LoginDTO } from "../types/user";
import jwt from 'jsonwebtoken';

export const registerService: (userData: IUser) => Promise<IUser> = async ({ name, email, password }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("User already exists");
        (error as any).statusCode = 400;
        throw error;
    }

    const userData = {
        name,
        email,
        password: await bcrypt.hash(password, 10)
    }

    const newUser = await User.create(userData);
    return newUser;
}

export const loginService = async (loginData:LoginDTO) => {
    const user = await User.findOne({email:loginData.email})
    if(!user){
        console.log('user not exist')
        const error:any = new Error("User not found");
        error.statusCode = 400;
        throw error; 
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);

    console.log("check password : ",isMatch);

    if(!isMatch){
        const error:any = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    return user;
}