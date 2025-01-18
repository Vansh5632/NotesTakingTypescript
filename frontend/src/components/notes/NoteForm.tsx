import { useState } from 'react';
import { useNotes } from '@/contexts/NotesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export const NoteForm: React.FC = () => {
  const { addNote, currentNote, updateNote, setCurrentNote, setIsEditing, isLoading } = useNotes();
  const [title, setTitle] = useState(currentNote?.title || '');
  const [content, setContent] = useState(currentNote?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    try {
      if (currentNote) {
        await updateNote({ ...currentNote, title, content });
        setCurrentNote(null);
        setIsEditing(false);
      } else {
        await addNote({ title, content });
      }
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
        disabled={isLoading}
      />
      <Textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-32"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !title.trim() || !content.trim()}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          currentNote ? 'Update Note' : 'Create Note'
        )}
      </Button>
    </form>
  );
};