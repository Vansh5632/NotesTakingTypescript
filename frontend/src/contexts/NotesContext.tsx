import {createContext,useContext,useReducer,useCallback} from 'react';
import {NotesState,Note} from "@/types/notes.types";

interface NotesContextType extends NotesState{
    addNote:(note: Omit<Note,"id"|'createdAt'>)=>void; //to create new type in between this types
    updateNote:(note:Note)=>void;
    deleteNote:(id:string)=>void;
    setCurrentNote:(note:Note)=>void;
    setIsEditing:(isEditing:boolean)=>void;
}

type NotesAction = 
    |{type:'SET_LOADING'}
    |{type:'SET_NOTES',payload:Note[]}
    |{type:'ADD_NOTE',payload:Note}
    |{type:'UPDATE_NOTE',payload:Note}
    |{type:'DELETE_NOTE',payload:string}
    |{type:'SET_CURRENT_NOTE',payload:Note | null}
    |{type:'SET_IS_EDITING',payload:boolean}
    |{type:'SET_ERROR',payload:string};

const initialState:NotesState = {
    notes:[],
    isLoading:false,
    error:null,
    currentNote:null,
    isEditing:false
}

const notesReducer = (state:NotesState,action:NotesAction):NotesState=>{
    switch (action.type){
        case 'SET_LOADING':
            return{
                ...state,
                isLoading:true,
            }
        case 'SET_NOTES':
            return{
                ...state,
                notes:action.payload,
                isLoading:false,
            }
        case 'ADD_NOTE':
            return{
                ...state,
                notes:[action.payload,...state.notes],
            }
        case 'UPDATE_NOTE':
            return{
                ...state,
                notes:state.notes.map(note=>note.id === action.payload.id ? action.payload : note),
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                notes:state.notes.filter(note=>note.id !== action.payload),
            }
        case 'SET_CURRENT_NOTE':
            return {
                ...state,
                currentNote:action.payload,
            }
        case 'SET_IS_EDITING':
            return{
                ...state,
                isEditing:action.payload,
            }
        case 'SET_ERROR':
            return{
                ...state,
                error:action.payload,
                isLoading:false,
            }
        default:
            return state;
    }
};

const NotesContext = createContext<NotesContextType|undefined>(undefined);

export const NotesProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [state,dispatch] = useReducer(notesReducer,initialState);

    const addNote = useCallback((note:Omit<Note,"id"|"createdAt">)=>{
        const newNote = {
            ...note,
            id:Date.now().toString(),
            createdAt:new Date().toISOString(),
        };
        dispatch({type:'ADD_NOTE',payload:newNote});
    },[]);
    const updateNote = useCallback((note:Note)=>{
        dispatch({type:'UPDATE_NOTE',payload:note});
    },[]);
    const deleteNote = useCallback((id:string)=>{
        dispatch({type:'DELETE_NOTE',payload:id});
    },[]);
    const setCurrentNote = useCallback((note:Note)=>{
        dispatch({type:'SET_CURRENT_NOTE',payload:note});
    },[]);
    const setIsEditing = useCallback((isEditing:boolean)=>{
        dispatch({type:'SET_IS_EDITING',payload:isEditing});
    },[]);
    return(
        <NotesContext.Provider value={{...state,addNote,updateNote,deleteNote,setCurrentNote,setIsEditing}}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = ()=>{
    const context = useContext(NotesContext);
    if(!context){
        throw new Error('useNotes must be used within NotesProvider');
    }
    return context;
}