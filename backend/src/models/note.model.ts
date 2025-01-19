import mongoose, { Schema, Document } from 'mongoose';
import { INote } from '../definitions/interfaces';

export interface INoteDocument extends INote, Document {}

const noteSchema = new Schema({
  noteId: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Pre-save hook to generate a unique numeric ID for each note
noteSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Fetch the last note ID from the collection
      const lastNote = await mongoose.model('Note').findOne().sort({ noteId: -1 });
      this.noteId = lastNote ? lastNote.noteId + 1 : 1; // Increment the last ID or start from 1
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

export default mongoose.model<INoteDocument>('Note', noteSchema);
