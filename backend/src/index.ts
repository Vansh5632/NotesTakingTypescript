import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import noteRoutes from './routes/notes.routes';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());

app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));

// Enable pre-flight requests for all routes


// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 3000; // Changed to 3000 to match your fetch URL
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});