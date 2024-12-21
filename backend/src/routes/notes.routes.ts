import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.patch('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;