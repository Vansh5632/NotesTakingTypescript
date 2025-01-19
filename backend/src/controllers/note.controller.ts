import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Note from '../models/note.model';
import { Types } from 'mongoose';

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

    // Fetch the last note to determine the next noteId
    const lastNote = await Note.findOne().sort({ noteId: -1 });
    const noteId = lastNote ? Number(lastNote.noteId) + 1 : 1; // Increment the last noteId or start at 1

    const note = new Note({
      title,
      content,
      tags,
      userId: req.user?.id,
      noteId, // Assign the generated noteId
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
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
  const noteId = req.params.id;


  try {
    // Perform the deletion query
    const note = await Note.findOneAndDelete({
      noteId: noteId,
      userId: req.user?.id,
    });

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting note' });
  }
};
