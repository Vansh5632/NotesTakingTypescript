import {Card,CardHeader,CardTitle,CardContent,CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { Edit2,Trash2 } from "lucide-react";
import { Note } from "@/types/notes.types";
import {formatDate} from "@/utils/dateUtils";

interface NoteCardProps{
    note:Note;
    onEdit:(note:Note)=>void;
    onDelete:(id:string)=>void;
}

export const NoteCard:React.FC<NoteCardProps> = ({note,onEdit,onDelete})=>{
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground"> 
                    Created:{formatDate(note.createdAt)}
                </p>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{note.content}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={()=>onEdit(note)} className="flex gap-2">
                    <Edit2 className="h-4 w-4"/>
                    Edit
                </Button>
                <Button variant="destructive" onClick={()=>onDelete(note.id)} className="flex gap-2">
                    <Trash2 className="h-4 w-4"/>
                    Delete
                    </Button>
            </CardFooter>
        </Card>
    )
}