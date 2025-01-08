import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Note } from '@/types/notes.types';
import { NotesState } from '@/types/notes.types';

const API_URL = "http://localhost:3000/api";

interface NotesContextType extends NotesState {
    fetchNotes: () => Promise<void>;
    addNote: (note: Pick<Note, 'title' | 'content'>) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    setCurrentNote: (note: Note | null) => void;
    setIsEditing: (isEditing: boolean) => void;
    clearError: () => void;
}

type NotesAction =
    | { type: 'SET_LOADING' }
    | { type: 'SET_NOTES'; payload: Note[] }
    | { type: 'ADD_NOTE'; payload: Note }
    | { type: 'UPDATE_NOTE'; payload: Note }
    | { type: 'DELETE_NOTE'; payload: string }
    | { type: 'SET_CURRENT_NOTE'; payload: Note | null }
    | { type: 'SET_IS_EDITING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' };

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
            return { ...state, isLoading: true, error: null };
        case 'SET_NOTES':
            return { ...state, notes: action.payload, isLoading: false, error: null };
        case 'ADD_NOTE':
            return { 
                ...state, 
                notes: [action.payload, ...state.notes],
                error: null,
                isLoading: false 
            };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) => 
                    note.id === action.payload.id ? action.payload : note
                ),
                error: null,
                isLoading: false
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
                error: null,
                isLoading: false
            };
        case 'SET_CURRENT_NOTE':
            return { ...state, currentNote: action.payload };
        case 'SET_IS_EDITING':
            return { ...state, isEditing: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, initialState);

    const handleApiError = (error: unknown) => {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
    };

    const fetchNotes = useCallback(async () => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: 'GET',
                credentials: 'include', // Include cookies in requests
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch notes: ${response.statusText}`);
            }
            
            const notes: Note[] = await response.json();
            dispatch({ type: 'SET_NOTES', payload: notes });
        } catch (error) {
            handleApiError(error);
        }
    }, []);

    const addNote = useCallback(async (noteData: Pick<Note, 'title' | 'content'>) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`${API_URL}/notes`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            if (!response.ok) {
                throw new Error(`Failed to add note: ${response.statusText}`);
            }

            const newNote: Note = await response.json();
            dispatch({ type: 'ADD_NOTE', payload: newNote });
        } catch (error) {
            handleApiError(error);
        }
    }, []);

    const updateNote = useCallback(async (note: Note) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`${API_URL}/notes/${note.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });

            if (!response.ok) {
                throw new Error(`Failed to update note: ${response.statusText}`);
            }

            const updatedNote: Note = await response.json();
            dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
        } catch (error) {
            handleApiError(error);
        }
    }, []);

    const deleteNote = useCallback(async (id: string) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.statusText}`);
            }

            dispatch({ type: 'DELETE_NOTE', payload: id });
        } catch (error) {
            handleApiError(error);
        }
    }, []);

    useEffect(() => {
        fetchNotes().catch(console.error);
    }, [fetchNotes]);

    const value = {
        ...state,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within NotesProvider');
    }
    return context;
};
