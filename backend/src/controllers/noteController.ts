import { Request, Response } from "express";
import { Note } from "../models/note";
import { INote } from "../definitions/interfaces";

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId; // Assuming `userId` is added by authentication middleware

    const note = new Note({
      userId,
      title,
      content,
      tags: tags || [],
    });
    await note.save();
    res.status(201).json({ note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // Assuming `userId` is added by authentication middleware
    const { search, tag, archived } = req.query;
    let query: any = { userId, isArchived: archived === "true" };
    if (search) {
      query.$text = { $search: search };
    }
    if (tag) {
      query.tags = tag;
    }
    const notes = await Note.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .exec();
    res.json({ notes });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ message: "Error getting notes", error });
  }
};

export const getNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.userId, // Assuming `userId` is added by authentication middleware
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json({ note });
  } catch (error) {
    console.error("Error getting note:", error);
    res.status(500).json({ message: "Error getting note", error });
  }
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, tags, isPinned, isArchived } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Assuming `userId` is added by authentication middleware
      { title, content, tags, isPinned, isArchived },
      { new: true }
    );
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note", error });
  }
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, // Assuming `userId` is added by authentication middleware
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
};
