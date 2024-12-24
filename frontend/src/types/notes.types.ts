export interface Note{
    id:string;
    title:string;
    content:string;
    createdAt:string;
    userId:string;
}

export interface NotesState{
    notes:Note[];
    isLoading:boolean;
    error:string|null;
    currentNote:Note|null;
    isEditing:boolean;
}