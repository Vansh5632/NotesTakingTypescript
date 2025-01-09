export interface Note{
    id:string;
    title:string;
    content:string;
    createdAt:string;
    favorite:boolean;
    userId:string;
}

export interface NotesState{
    notes:Note[];
    isLoading:boolean;
    error:string|null;
    currentNote:Note|null;
    isEditing:boolean;
}