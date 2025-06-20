
import React, { useState } from 'react';
import { Plus, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesViewProps {
  searchQuery: string;
}

const NotesView: React.FC<NotesViewProps> = ({ searchQuery }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discussed project timeline and deliverables...',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Ideas for Blog Post',
      content: 'Write about productivity tips and time management...',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
    },
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNote = () => {
    if (newNoteTitle.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsCreating(false);
      setSelectedNote(newNote);
    }
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date() }
        : note
    ));
  };

  return (
    <div className="flex h-full">
      {/* Notes List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Notes</h2>
            <Button
              size="sm"
              onClick={() => setIsCreating(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {isCreating && (
            <div className="space-y-2">
              <Input
                placeholder="Note title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="text-sm font-virgil-notes"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={createNote}>
                  Create
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    setIsCreating(false);
                    setNewNoteTitle('');
                    setNewNoteContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedNote?.id === note.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {note.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <div className="flex-1 p-6">
            <Input
              value={selectedNote.title}
              onChange={(e) => {
                const updated = { ...selectedNote, title: e.target.value };
                setSelectedNote(updated);
                updateNote(updated);
              }}
              className="text-xl font-medium border-none p-0 mb-4 focus:ring-0 font-virgil-notes"
              placeholder="Untitled"
            />
            <Textarea
              value={selectedNote.content}
              onChange={(e) => {
                const updated = { ...selectedNote, content: e.target.value };
                setSelectedNote(updated);
                updateNote(updated);
              }}
              placeholder="Start writing..."
              className="flex-1 border-none resize-none text-base leading-relaxed focus:ring-0 font-virgil-notes"
              rows={20}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a note to start editing</p>
              <p className="text-sm">Or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;
