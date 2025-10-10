import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/error-handler';
import connectDB from './config/db.config';

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/', adminRoutes);
app.use('/api/user/', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port number ${PORT}.`))