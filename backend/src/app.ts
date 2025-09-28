import express, { type Request, type Response } from 'express';
import cors from "cors";
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(cors())

//routes
app.use('/api/auth/', authRoutes);
app.use('/api/admin/',adminRoutes);
app.use('/api/user/',userRoutes)

app.listen(3000, ()=>console.log('server started.'))