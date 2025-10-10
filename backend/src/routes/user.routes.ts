import express from 'express';
import { editProfile, getProfile, uploadImageController } from '../controller/user.controller';
import { authenticateToken } from '../middlewares/auth.middelware';
import { upload } from '../helpers/upload';

const userRoutes = express.Router();

userRoutes.get('/profile/', authenticateToken, getProfile);
userRoutes.put('/profile/edit/', authenticateToken, editProfile);
userRoutes.post("/profile-upload",authenticateToken, upload.single("image"), uploadImageController);

export default userRoutes;