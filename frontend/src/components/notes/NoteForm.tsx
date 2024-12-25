import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from 'framer-motion';

export const NoteForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth();

    const { addNote, currentNote, updateNote, isEditing, setIsEditing, setCurrentNote } = useNotes();

    useEffect(() => {
        if (currentNote && isEditing) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        }
    }, [currentNote, isEditing]);

    const handleSubmit = () => {
        if (!user) return;

        if (isEditing && currentNote) {
            updateNote({
                ...currentNote,
                title,
                content,
            });
        } else {
            addNote({
                title,
                content,
                userId: user.id
            });
        }

        setTitle('');
        setContent('');
        setIsEditing(false);
        setCurrentNote(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentNote(null);
        setTitle('');
        setContent('');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Card className='mb-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200'>
                {/* Header */}
                <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-xl p-4">
                    <CardTitle className="text-lg font-bold tracking-wide">
                        {isEditing ? 'Edit Note' : 'Add Note'}
                    </CardTitle>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-6 space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your note title"
                            className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Content Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note content"
                            className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4'>
                        <Button 
                            onClick={handleSubmit} 
                            className='flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-all'
                            disabled={!title || !content}
                        >
                            {isEditing ? (
                                <>
                                    <Save className='mr-2 h-4 w-4' />
                                    Update Note
                                </>
                            ) : (
                                <>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Add Note
                                </>
                            )}
                        </Button>
                        {isEditing && (
                            <Button 
                                onClick={handleCancel} 
                                className='flex-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition-all'
                            >
                                <X className='mr-2 h-4 w-4' />
                                Cancel
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
