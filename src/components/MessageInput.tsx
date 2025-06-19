
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit
}) => {
  return (
    <div className="bg-white border-t border-slate-200 p-4 lg:p-6">
      <form onSubmit={onSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Message #general"
            className="pr-12 h-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
          <Button
            type="submit"
            disabled={!value.trim()}
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
      <p className="text-xs text-slate-500 mt-2">
        Press Enter to send your message
      </p>
    </div>
  );
};

export default MessageInput;
