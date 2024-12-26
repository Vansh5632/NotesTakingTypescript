import {api} from "./api";
import {Note} from '../types/notes.types';


export const notesService = {
    async getNotes():Promise<Note[]>{
        const response = await api.get<Note[]>('/notes');
        return response.data;
    },
    async createNote(note:Omit<Note,"id"|"createdAt">):Promise<Note>{
        const response = await api.post<Note>('/notes',note);
        return response.data;
    },
    async updateNote(id:string,note:Partial<Note>):Promise<Note>{
        const response = await api.put<Note>(`/notes/${id}`,note);
        return response.data;
    },
    async deleteNote(id:string):Promise<string>{
        await api.delete(`/notes/${id}`);
        return id;
    }
}