
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, LogOut, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
      message: 'Welcome to the chat room! Start a conversation.',
      timestamp: new Date(),
      userId: 'system',
    },
    {
      id: '2',
      username: 'Alice',
      message: 'Hey everyone! How is everyone doing today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      userId: 'user2',
    },
    {
      id: '3',
      username: 'Bob',
      message: 'Pretty good! Just working on some exciting new features.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      userId: 'user3',
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
    <div className="h-screen flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-dark border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DevOps Chat</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.name}!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 md:hidden"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <MessageList messages={messages} currentUserId={user?.id || ''} />
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="glass-dark border-t border-white/10 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
                <Button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Online Users Sidebar - Desktop */}
          <div className="hidden md:block w-64 border-l border-white/10">
            <OnlineUsers />
          </div>
        </div>
      </div>

      {/* Mobile Online Users Overlay */}
      {showOnlineUsers && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex">
          <div className="ml-auto w-64 h-full glass-dark slide-in-right">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-white">Online Users</h3>
              <Button
                onClick={() => setShowOnlineUsers(false)}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
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
