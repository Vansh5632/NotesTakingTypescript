import {useState,useEffect} from 'react';
import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Plus,Save,X} from "lucide-react";
import {useNotes} from "@/contexts/NotesContext";
import {useAuth} from "@/contexts/AuthContext";

export const NoteForm:React.FC = ()=>{
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const {user} = useAuth();

    const {addNote,currentNote,updateNote,isEditing,setIsEditing,setCurrentNote} = useNotes();

    useEffect(()=>{
        if(currentNote && isEditing){
            setTitle(currentNote.title);
            setContent(currentNote.content);
        }
    },[currentNote,isEditing]);

    const handleSubmit = ()=>{
        if(!user) return;

        if(isEditing && currentNote){
            updateNote({
                ...currentNote,
                title,
                content,
            });
        }else{
            addNote({
                title,
                content,
                userId:user.id
            });
        }
            
        setTitle('');
        setContent('');
        setIsEditing(false);
        setCurrentNote(null);
    }

    const handleCancel = ()=>{
        setIsEditing(false);
        setCurrentNote(null);
        setTitle('');
        setContent('');
    }

    return (
        <Card className='mb-6'>
            <CardHeader>
                <CardTitle>{isEditing ? 'Edit Note' : 'Add Note'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <Input
                        label='Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <Textarea
                        label='Content'
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={handleSubmit} className='flex-1' disabled={!title || !content}>
                            {isEditing ?(<><Save className='mr-2 h-4 w-4'/>Update Note</>):(<><Plus className='mr-2 h-4 w-4'/>Add Note</>)}
                        </Button>
                        {isEditing && (
                            <Button onClick={handleCancel} className='flex-1' variant='danger'>
                                <X className='mr-2 h-4 w-4'/>Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}