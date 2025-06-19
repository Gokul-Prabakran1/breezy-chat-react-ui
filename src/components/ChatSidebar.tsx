
import React from 'react';
import { MessageCircle, Hash } from 'lucide-react';

interface ChatSidebarProps {
  userName?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ userName }) => {
  return (
    <div className="hidden lg:flex w-64 bg-slate-800 flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-white font-bold text-lg">DevOps Hub</h1>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        <div className="text-slate-400 text-xs uppercase font-semibold tracking-wide mb-2">
          Channels
        </div>
        <div className="flex items-center space-x-2 px-2 py-1.5 text-white bg-blue-600 rounded-md">
          <Hash className="h-4 w-4" />
          <span className="text-sm font-medium">general</span>
        </div>
        <div className="flex items-center space-x-2 px-2 py-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md cursor-pointer">
          <Hash className="h-4 w-4" />
          <span className="text-sm">devops-alerts</span>
        </div>
        <div className="flex items-center space-x-2 px-2 py-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md cursor-pointer">
          <Hash className="h-4 w-4" />
          <span className="text-sm">deployments</span>
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {userName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-green-400 text-xs">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
