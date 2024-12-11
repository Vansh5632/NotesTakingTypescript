import express from 'express';
import { UserZodSchema } from '../models/User.model';
import validate from '../middlewares/validate';
import signup from '../controllers/userController';

const router = express.Router();

// Define the signup route
router.post('/signup', validate(UserZodSchema), signup);

export default router;
