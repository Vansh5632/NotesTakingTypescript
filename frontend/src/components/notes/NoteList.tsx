import { useState,useMemo } from "react";
import {NoteCard} from "@/components/notes/NoteCard";
import { useNotes } from "@/contexts/NotesContext";
import {SearchSort} from "@/components/notes/SearchSort";
import {Note} from "@/types/notes.types";

export const NoteList:React.FC = ()=>{
    const {notes,setCurrentNote,setIsEditing,deleteNote} = useNotes();
    const [searchQuery,setSearchQuery] = useState('');
    const [sortOrder,setSortOrder] = useState<'asc'|'desc'>('asc');
    
    const filteredAndSortedNotes = useMemo(() => {
        return notes
          .filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'asc' 
              ? dateA - dateB 
              : dateB - dateA;
          });
      }, [notes, searchQuery, sortOrder]);

      const handleEdit = (note:Note)=>{
            setCurrentNote(note);
            setIsEditing(true);
      };

      const handleDelete = (id:string)=>{
        if(window.confirm('Are you sure you want to delete this note?')){
            deleteNote(id);
        }
      };

      return (
        <div>
            <SearchSort searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
            {filteredAndSortedNotes.length ===0?(<div className="text-center py-8 text-muted-foreground">{searchQuery?'No notes found matching your search':'No Notes yet'}</div>):(
                <div className="space-y-4">
                    {filteredAndSortedNotes.map(note=>(
                        <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete}/>
                    ))}
                </div>
            )}
        </div>
      )

}