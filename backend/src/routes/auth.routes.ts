import express from 'express';
import { createAdmin, login, logout, register } from '../controller/auth.controller';
import { validateRegisterData } from '../validators/register.validator';
import { validateAuthData } from '../validators/login.validator';
const authRoutes = express.Router();

authRoutes.post("/admin/register/",validateRegisterData, createAdmin);
authRoutes.post('/register', validateRegisterData, register);
authRoutes.post('/login', validateAuthData,login);
authRoutes.delete('/logout',logout);


export default authRoutes;