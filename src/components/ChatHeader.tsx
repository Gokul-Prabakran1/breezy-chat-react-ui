
import React from 'react';
import { LogOut, Users, Menu, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  showOnlineUsers: boolean;
  onToggleUsers: () => void;
  onLogout: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  showOnlineUsers,
  onToggleUsers,
  onLogout
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onToggleUsers}
          variant="ghost"
          size="sm"
          className="lg:hidden text-slate-600 hover:text-slate-900"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Hash className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">general</h2>
        </div>
        <div className="hidden sm:flex items-center text-sm text-slate-500">
          <span>Team workspace</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={onToggleUsers}
          variant="ghost"
          size="sm"
          className="hidden lg:flex text-slate-600 hover:text-slate-900"
        >
          <Users className="h-5 w-5" />
          <span className="hidden xl:inline ml-2">Members</span>
        </Button>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className="text-slate-600 hover:text-slate-900"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline ml-2">Sign out</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
