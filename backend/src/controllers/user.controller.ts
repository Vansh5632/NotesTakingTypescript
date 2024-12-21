import { Request, Response } from 'express';
import User, { IUserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { IUser } from '../definitions/interfaces';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
} as const;

const createUserResponse = (user: IUserDocument) => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    const savedUser = await user.save();
    
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET!);
    
    // Set token in cookie
    res.cookie('token', token, COOKIE_OPTIONS);
    console.log('Cookies set:', res.getHeaders()['set-cookie']); // Debug line
    
    res.status(201).json({ user: createUserResponse(savedUser) });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Error creating user' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    
    // Set token in cookie
    res.cookie('token', token, COOKIE_OPTIONS);
    console.log('Cookies set:', res.getHeaders()['set-cookie']); // Debug line
    
    res.json({ user: createUserResponse(user) });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error logging in' });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      ...COOKIE_OPTIONS,
      maxAge: 0
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error logging out' });
    }
  }
};