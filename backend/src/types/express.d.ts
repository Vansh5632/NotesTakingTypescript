// src/types/express.d.ts or @types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Assuming `userId` is a string, adjust if it's a different type
    }
  }
}
