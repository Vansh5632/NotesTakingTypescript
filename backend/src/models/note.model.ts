import mongoose, { Schema, Document } from 'mongoose';
import { INote } from '../definitions/interfaces';

export interface INoteDocument extends INote, Document {}

const noteSchema = new Schema({
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

export default mongoose.model<INoteDocument>('Note', noteSchema);