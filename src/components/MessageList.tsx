
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
        <div key={dateKey} className="space-y-4">
          {/* Date separator */}
          <div className="flex items-center justify-center">
            <div className="glass-dark px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-300">
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
                <div key={message.id} className="flex justify-center">
                  <div className="glass px-4 py-2 rounded-full max-w-md">
                    <p className="text-sm text-gray-300 text-center">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${
                  isOwnMessage ? 'justify-end' : 'justify-start'
                } fade-in-up`}
              >
                <div
                  className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl ${
                    isOwnMessage
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                      : 'glass text-white rounded-bl-sm'
                  }`}
                >
                  {!isOwnMessage && (
                    <p className="text-xs font-semibold text-blue-300 mb-1">
                      {message.username}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <p
                    className={`text-xs mt-2 ${
                      isOwnMessage ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
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
