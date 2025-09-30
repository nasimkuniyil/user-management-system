import express from 'express';
import { login, logout, register } from '../controller/auth/auth.controller';
import { validateUserData } from '../middlewares/validate-data';
const authRoutes = express.Router();

authRoutes.post('/register', validateUserData,register);
authRoutes.post('/login',login);
authRoutes.delete('/logout',logout);

export default authRoutes;