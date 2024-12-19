import mongoose,{Schema,Document} from "mongoose";
import { INote } from "../definitions/interfaces";
const noteSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    isPinned: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true,
    versionKey: false
  });

  noteSchema.index({title: 'text', content: 'text', tags: 'text'});

  export const Note = mongoose.model<INote>('Note', noteSchema);
