
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, LogOut, Users, MessageCircle, Menu, Hash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import MessageList from '../components/MessageList';
import OnlineUsers from '../components/OnlineUsers';

export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  userId: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'System',
      message: 'Welcome to the DevOps Chat! 🚀 Start collaborating with your team.',
      timestamp: new Date(),
      userId: 'system',
    },
    {
      id: '2',
      username: 'Alice Johnson',
      message: 'Hey team! Just pushed the latest updates to the staging environment. Ready for review! 📝',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      userId: 'user2',
    },
    {
      id: '3',
      username: 'Bob Wilson',
      message: 'Great work Alice! I'll run the automated tests and let you know the results.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      userId: 'user3',
    },
    {
      id: '4',
      username: 'Charlie Brown',
      message: 'The CI/CD pipeline is running smoothly. All checks passed! ✅',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      userId: 'user4',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const { user, logout } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      username: user.name,
      message: newMessage.trim(),
      timestamp: new Date(),
      userId: user.id,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Left Sidebar - Channel List */}
      <div className="hidden lg:flex w-64 bg-gray-900 flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-white font-bold text-lg">DevOps Hub</h1>
          </div>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          <div className="text-gray-400 text-xs uppercase font-semibold tracking-wide mb-2">
            Channels
          </div>
          <div className="flex items-center space-x-2 px-2 py-1.5 text-white bg-blue-600 rounded-md">
            <Hash className="h-4 w-4" />
            <span className="text-sm font-medium">general</span>
          </div>
          <div className="flex items-center space-x-2 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md cursor-pointer">
            <Hash className="h-4 w-4" />
            <span className="text-sm">devops-alerts</span>
          </div>
          <div className="flex items-center space-x-2 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md cursor-pointer">
            <Hash className="h-4 w-4" />
            <span className="text-sm">deployments</span>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-green-400 text-xs">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">general</h2>
            </div>
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <span>Team workspace</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
              variant="ghost"
              size="sm"
              className="hidden lg:flex text-gray-600 hover:text-gray-900"
            >
              <Users className="h-5 w-5" />
              <span className="hidden xl:inline ml-2">Members</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">Sign out</span>
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              <MessageList messages={messages} currentUserId={user?.id || ''} />
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4 lg:p-6">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message #general"
                    className="pr-12 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim()}
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send your message
              </p>
            </div>
          </div>

          {/* Right Sidebar - Online Users (Desktop) */}
          <div className={`${showOnlineUsers ? 'block' : 'hidden'} lg:block w-72 border-l border-gray-200 bg-white`}>
            <OnlineUsers />
          </div>
        </div>
      </div>

      {/* Mobile Online Users Overlay */}
      {showOnlineUsers && (
        <div className="lg:hidden fixed inset-0 bg-black/20 z-50 flex">
          <div className="ml-auto w-72 h-full bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Team Members</h3>
              <Button
                onClick={() => setShowOnlineUsers(false)}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                ×
              </Button>
            </div>
            <OnlineUsers />
          </div>
          <div 
            className="flex-1" 
            onClick={() => setShowOnlineUsers(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
