import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/user-management-system');
        console.log('mongoDB connected')
    } catch (error) {
        console.log('mongodb connection error.')
    }
}

export default connectDB;