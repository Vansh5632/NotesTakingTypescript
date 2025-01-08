import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log('Cookies received:', req.cookies); // Debug line
    const token = req.cookies?.token;

    if (!token) {
      console.log('No token found in cookies'); // Debug line
      res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log('Token decoded:', decoded); // Debug line
    req.user = { id: decoded.id };
    console.log('User set:', req.user); 
    next();
  } catch (error) {
    console.error('Auth error:', error); // Debug line
    res.status(401).json({ error: 'Please authenticate.' });
    return
  }
};