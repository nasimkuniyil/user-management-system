import * as z from 'zod';

export const ZUserSchema = z.object({
    name:z.string().min(3).regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
    email:z.string().regex(/^[A-Za-z0-9._%+-]+@gmail\.com$/i),
    password:z.string().regex(/^[A-Za-z0-9]{8,}$/)
})