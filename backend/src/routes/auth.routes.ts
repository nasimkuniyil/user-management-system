import express from 'express';
import { createAdmin, login, logout, register } from '../controller/auth.controller';
import { validateUserData } from '../middlewares/validate-data';
const authRoutes = express.Router();

authRoutes.post("/admin/register/",validateUserData, createAdmin);
authRoutes.post('/register', validateUserData,register);
authRoutes.post('/login',login);
authRoutes.delete('/logout',logout);


export default authRoutes;