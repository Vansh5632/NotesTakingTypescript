import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import { NotesState, Note } from '@/types/notes.types';

interface NotesContextType extends NotesState {
  fetchNotes: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setCurrentNote: (note: Note) => void;
  setIsEditing: (isEditing: boolean) => void;
}

type NotesAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'SET_CURRENT_NOTE'; payload: Note | null }
  | { type: 'SET_IS_EDITING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: NotesState = {
  notes: [],
  isLoading: false,
  error: null,
  currentNote: null,
  isEditing: false,
};

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_NOTES':
      return { ...state, notes: action.payload, isLoading: false };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload : note)),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case 'SET_CURRENT_NOTE':
      return { ...state, currentNote: action.payload };
    case 'SET_IS_EDITING':
      return { ...state, isEditing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.get<Note[]>('/api/notes');
      // Ensure the response data is an array
      const notesData = Array.isArray(response.data) ? response.data : [];
      dispatch({ type: 'SET_NOTES', payload: notesData });
    } catch (error) {
      console.error('Error fetching notes:', error);
      dispatch({ type: 'SET_NOTES', payload: [] }); // Set empty array on error
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch notes' });
    }
  }, []);

  // Add a note
  const addNote = useCallback(async (note: Omit<Note, 'id' | 'createdAt'>) => {
    try {
      const response = await axios.post('/api/notes', note);
      dispatch({ type: 'ADD_NOTE', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add note' });
    }
  }, []);

  // Update a note
  const updateNote = useCallback(async (note: Note) => {
    try {
      const response = await axios.put(`/api/notes/${note.id}`, note);
      dispatch({ type: 'UPDATE_NOTE', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update note' });
    }
  }, []);

  // Delete a note
  const deleteNote = useCallback(async (id: string) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete note' });
    }
  }, []);

  // Set current note
  const setCurrentNote = useCallback((note: Note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', payload: note });
  }, []);

  // Set editing mode
  const setIsEditing = useCallback((isEditing: boolean) => {
    dispatch({ type: 'SET_IS_EDITING', payload: isEditing });
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <NotesContext.Provider
      value={{
        ...state,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
        setCurrentNote,
        setIsEditing,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};
