import express from 'express';
import { deleteUser, getUsers } from '../controller/admin.controller';
import { authenticateToken } from '../middlewares/auth.middelware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const adminRoutes = express.Router();

adminRoutes.get("/users", authenticateToken, isAdmin, getUsers);
adminRoutes.delete("/delete-user/:id", authenticateToken, isAdmin, deleteUser);

export default adminRoutes;

// complete user delete system
// admin can add user
// admin can edit user

// then move to frontend

// in the last add profile image option