
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MessageList from '../components/MessageList';
import OnlineUsers from '../components/OnlineUsers';
import ChatSidebar from '../components/ChatSidebar';
import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MobileUserOverlay from '../components/MobileUserOverlay';

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
      message: 'Great work Alice! I\'ll run the automated tests and let you know the results.',
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

  const toggleOnlineUsers = () => {
    setShowOnlineUsers(!showOnlineUsers);
  };

  const closeMobileOverlay = () => {
    setShowOnlineUsers(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Left Sidebar - Channel List */}
      <ChatSidebar userName={user?.name} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <ChatHeader
          showOnlineUsers={showOnlineUsers}
          onToggleUsers={toggleOnlineUsers}
          onLogout={handleLogout}
        />

        {/* Messages Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              <MessageList messages={messages} currentUserId={user?.id || ''} />
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSubmit={handleSendMessage}
            />
          </div>

          {/* Right Sidebar - Online Users (Desktop) */}
          <div className={`${showOnlineUsers ? 'block' : 'hidden'} lg:block w-72 border-l border-slate-200 bg-white`}>
            <OnlineUsers />
          </div>
        </div>
      </div>

      {/* Mobile Online Users Overlay */}
      <MobileUserOverlay
        isOpen={showOnlineUsers}
        onClose={closeMobileOverlay}
      />
    </div>
  );
};

export default Chat;
