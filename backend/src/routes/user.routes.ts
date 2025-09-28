import express from 'express';
import { editProfile, getProfile } from '../controller/user/user.controller';

const userRoutes = express.Router();

userRoutes.get('/profile/:id', getProfile);
userRoutes.get('/profile/edit/:id', editProfile);

export default userRoutes;