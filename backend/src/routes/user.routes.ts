import express from 'express';
import { editProfile, getProfile } from '../controller/user.controller';
import { authenticateToken } from '../middlewares/auth.middelware';

const userRoutes = express.Router();

userRoutes.get('/profile/', authenticateToken, getProfile);
userRoutes.put('/profile/edit/', authenticateToken, editProfile);

export default userRoutes;