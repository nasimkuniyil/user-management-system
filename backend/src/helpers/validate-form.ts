import { ZUserSchema } from "../schema/zod.shema";

interface IUserData {
    name: string;
    email: string;
    password: string;
}

const validateForm: (userData: IUserData) => IUserData | undefined = ({ name, email, password }) => {
    try {
        const data = ZUserSchema.parse({name,email, password});
        console.log('validation done. data:',data);
        return data;

    } catch (error) {
        console.log("validation error :",error);
        //error code
    }
}


export default validateForm;