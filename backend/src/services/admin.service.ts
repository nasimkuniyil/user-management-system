import User from "../modal/user.modal";

export const getAllUsersService = async () => {
    const users = await User.find({ role: 'user' });
    if (!users) {
        const error:any = new Error("Users not found.");
        error.statusCode=404
        console.log('No users were found');
        throw error
    }
    return users;
}

export const deleteUserService = async (id:string) => {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      const error = new Error("User not found");
      (error as any).statusCode = 404;
      throw error;
    }

    console.log("Deleted user:", deletedUser);
    return deletedUser;
}