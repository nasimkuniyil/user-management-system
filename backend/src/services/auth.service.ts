import User, { IUser } from "../modal/user.modal";

export const registerService = async (userData: IUser) => {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            const error = new Error("User already exists");
            (error as any).statusCode = 400;
            throw error;
        }
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
}