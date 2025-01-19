import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Note from '../models/note.model';

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.user?.id })
      .sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const note = new Note({
      title,
      content,
      tags,
      userId: req.user?.id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Error creating note' });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { title, content, tags },
      { new: true }
    );
    
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: 'Error updating note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });
    
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: 'Error deleting note' });
  }
};
