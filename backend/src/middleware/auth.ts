import {Request,Response,NextFunction} from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { AuthRequest } from '../definitions/interfaces';

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void => {
    // Example: decoding JWT token and adding userId
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as any).userId; // Add userId to req
        next();
      } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  };
