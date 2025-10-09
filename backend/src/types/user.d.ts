import User from "../modal/user.modal";

declare global{
    namespace Express {
        interface Request {
            user?:User
        }
    }
}

export interface LoginDTO{
    email : string;
    password : string;
}

export interface AuthResponse {
    name: string;
    email: string;
    role?: string;
    token?: string;
    refreshToken?: string;
}