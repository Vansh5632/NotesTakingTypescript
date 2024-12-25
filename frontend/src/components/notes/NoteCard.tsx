import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Note } from "@/types/notes.types";
import { formatDate } from "@/utils/dateUtils";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <Card className="mb-4 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <CardTitle className="text-lg font-bold">{note.title}</CardTitle>
        <p className="text-sm opacity-90">Created: {formatDate(note.createdAt)}</p>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4">
        <p className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">{note.content}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-end gap-4 p-4 bg-gray-50 border-t">
        <Button
          variant="outline"
          onClick={() => onEdit(note)}
          className="flex gap-2 items-center text-indigo-600 border-indigo-500 hover:bg-indigo-50"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(note.id)}
          className="flex gap-2 items-center bg-red-500 text-white hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
