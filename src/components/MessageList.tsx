
import React from 'react';
import { Message } from '../pages/Chat';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (timestamp: Date) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const grouped: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = message.timestamp.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="space-y-6">
      {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
        <div key={dateKey} className="space-y-2">
          {/* Date separator */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-white border border-gray-200 px-4 py-1 rounded-full shadow-sm">
              <span className="text-xs font-medium text-gray-600">
                {formatDate(new Date(dateKey))}
              </span>
            </div>
          </div>

          {/* Messages for this date */}
          {dayMessages.map((message) => {
            const isOwnMessage = message.userId === currentUserId;
            const isSystemMessage = message.userId === 'system';

            if (isSystemMessage) {
              return (
                <div key={message.id} className="flex justify-center my-6">
                  <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg max-w-md">
                    <p className="text-sm text-blue-800 text-center font-medium">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="group hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {message.username.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {message.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-800 leading-relaxed">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
