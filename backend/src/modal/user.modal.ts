import { Document, model, Schema } from "mongoose";
import { optional } from "zod";

export interface IUser extends Document {
    name: string;
    image?:string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = model<IUser>('User', UserSchema);
export default User;