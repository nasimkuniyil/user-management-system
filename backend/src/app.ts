import express from 'express';
import cors from "cors";
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/error-handler';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

//routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/',adminRoutes);
app.use('/api/user/', userRoutes);

app.use(errorHandler);

app.listen(PORT, ()=>console.log(`server running on port number ${PORT}.`))