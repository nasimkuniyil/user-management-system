import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../modal/user.modal";
import { loginService, registerService } from "../services/auth.service";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { AuthResponse } from "../types/user";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: IUser = req.body;
        const loggedUser = req.user;

        console.log('user data : ', userData);
        const user = await registerService(userData);
        console.log("user: ", user)

        if (loggedUser) {
            return res.status(201).json({
                message: 'User created successfully by admin.',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        }

        const payload = {
            id: user._id,
            role: user.role
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "60s" });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });

        const responseData: AuthResponse = {
            name: user.name,
            email: user.email,
            role: user.role,
            token: accessToken,
            refreshToken: refreshToken,
        };

        res.status(200).json({ message: "success", responseData })
    } catch (error) {
        console.log('hey register error.')
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req data : ", req.body);
        const user = await loginService(req.body);
        console.log("user: ", user)

        const payload = {
            id: user._id,
            role: user.role
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "60s" });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });

        const responseData: AuthResponse = {
            name: user.name,
            email: user.email,
            role: user.role,
            token: accessToken,
            refreshToken: refreshToken,
        };

        res.status(200).json({ message: "success", responseData });
    } catch (error) {
        console.log('login error');
        next(error)
    }
}


export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        console.log('Cleared cookies, user logged out!')
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        next(error);
    }
};


export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const admin = await User.findOne({ role: 'admin' });

        console.log("admin ", admin)

        if (admin) {
            console.log('admin exist.');
            return next({ message: "admin exist", statusCode: 400 })
        }

        const userData = req.body;
        userData.role = "admin";
        userData.password = await bcrypt.hash(userData.password, 10)
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

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;

        console.log('refreshToken: ', refreshToken)
        if (!refreshToken) {
            const error: any = new Error("Refresh token not found");
            error.statusCode = 401;
            throw error;
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                const error: any = new Error("Invalid refresh token");
                error.statusCode = 403;
                throw error;
            }
            console.log('Refresh token verified!')

            const { id, role } = decoded as JwtPayload;

            const newAccessToken = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '60s' });
            console.log('New access token created!')

            res.status(200).json({ token: newAccessToken });
        });
    } catch (error) {
        console.log('refresh token error.');
        next(error);
    }
}