import express from 'express';
import { Request, Response } from 'express';
import { createNote, getNote, getNotes, updateNote, deleteNote } from '../controllers/noteController';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../definitions/interfaces';

const router = express.Router();

// Helper function to type the request handler
const handleAuth = (
  fn: (req: AuthRequest, res: Response) => Promise<void>
): express.RequestHandler => {
  return (req, res, next) => {
    fn(req as AuthRequest, res).catch(next);
  };
};

// Apply authentication middleware
router.use(authenticateToken);

// Use the wrapper for each route
router.post('/', handleAuth(createNote));
router.get('/', handleAuth(getNotes));
router.get('/:id', handleAuth(getNote));
router.put('/:id', handleAuth(updateNote));
router.delete('/:id', handleAuth(deleteNote));

export default router;