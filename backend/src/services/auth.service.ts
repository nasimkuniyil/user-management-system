import User, { IUser } from "../modal/user.modal";
import bcrypt from 'bcrypt';

export const registerService: (userData: IUser) => Promise<IUser> = async ({ name, email, password }) => {
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            (error as any).statusCode = 400;
            throw error;
        }

        const userData = {
            name,
            email,
            password:await bcrypt.hash(password, 10)
        }

        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
}