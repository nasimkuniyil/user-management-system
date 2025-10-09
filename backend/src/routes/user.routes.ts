import express from 'express';
import { editProfile, getProfile } from '../controller/user.controller';

const userRoutes = express.Router();

userRoutes.get('/profile/:id', getProfile);
userRoutes.put('/profile/edit/:id', editProfile);

export default userRoutes;