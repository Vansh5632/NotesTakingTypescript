import {createContext,useContext,useReducer,useCallback} from 'react';
import {NotesState,Note} from "@/types/notes.types";

interface NotesContextType extends NotesState{
    addNote:(note: Omit<Note,"id"|'createdAt'>)=>void;
}