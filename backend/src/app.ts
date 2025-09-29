import express, { type Request, type Response } from 'express';
import cors from "cors";
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

//routes
app.use('/api/admin/',adminRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>console.log(`server running on port number ${PORT}.`))