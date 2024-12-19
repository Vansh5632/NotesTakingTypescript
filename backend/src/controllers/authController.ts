import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "";
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Signup request received');
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = new User({
            email, password
        });
        await user.save();
        console.log('User created successfully');

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Signin request received');
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid credentials: user not found');
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log('Invalid credentials: incorrect password');
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        console.log('User signed in successfully');

        res.json({ token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Error signing in', error });
    }
};