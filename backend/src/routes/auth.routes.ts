import express from 'express';
import { login, logout, register } from '../controller/auth/auth.controller';
const authRoutes = express.Router();

authRoutes.post('/register',register);
authRoutes.post('/login',login);
authRoutes.delete('/logout',logout);

export default authRoutes;