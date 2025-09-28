import express, { type Request, type Response } from 'express';
import cors from "cors";
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(cors())

//routes
app.use('/api/admin/',adminRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, ()=>console.log('server started.'))