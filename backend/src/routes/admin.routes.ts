import express from 'express';
import { blockUser, getUsers, unblockUser } from '../controller/admin.controller';

const adminRoutes = express.Router();

adminRoutes.get("/users",getUsers);
adminRoutes.put("/block-user/:id",blockUser);
adminRoutes.put("/unblock-user/:id",unblockUser);

export default adminRoutes;