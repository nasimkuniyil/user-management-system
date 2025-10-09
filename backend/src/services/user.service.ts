import User from "../modal/user.modal"
import bcrypt from 'bcrypt'

export const getProfileService = async (id: string) => {
    const user = await User.findById(id);
    console.log("hey", user)
    if (!user) {
        const error: any = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
}

export const editProfileService = async (id: string, updatedData: { name?: string, password?: string }) => {
    const user = await User.findById(id);

    if (!user) {
        const error: any = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    if (updatedData.name) {
        user.name = updatedData.name;
    }

    if (updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    const userObj = user.toObject();

    return userObj;
}