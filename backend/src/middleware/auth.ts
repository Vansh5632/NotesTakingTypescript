import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "vansh";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.split(' ')[1]; // Assuming "Bearer <token>"
  console.log("Extracted Token:", token);

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Payload:", decoded);

    req.userId = (decoded as any).userId; // Add userId to request
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
