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
    notes:[
        {
            id: "1a2b3c",
            title: "Introduction to JavaScript",
            content: "JavaScript is a versatile programming language used for web development, game development, and more.",
            createdAt: "2024-12-01T10:45:30Z",
            userId: "user123",
          },
          {
            id: "4d5e6f",
            title: "Understanding React",
            content: "React is a JavaScript library for building user interfaces. It allows developers to create reusable components.",
            createdAt: "2024-12-02T15:12:10Z",
            userId: "user456",
          },
          {
            id: "7g8h9i",
            title: "CSS Basics",
            content: "CSS, or Cascading Style Sheets, is used to style web pages. It provides control over layout, colors, fonts, and more.",
            createdAt: "2024-12-03T09:00:00Z",
            userId: "user789",
          },
          {
            id: "0j1k2l",
            title: "Node.js Overview",
            content: "Node.js is a runtime that allows developers to run JavaScript on the server. It's great for building scalable applications.",
            createdAt: "2024-12-04T18:30:45Z",
            userId: "user101",
          }
    ],
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