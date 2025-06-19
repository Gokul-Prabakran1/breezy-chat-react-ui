
import React from 'react';
import { User, Circle } from 'lucide-react';

interface OnlineUser {
  id: string;
  name: string;
  status: 'online' | 'away' | 'busy';
  avatar?: string;
}

const OnlineUsers = () => {
  // Mock data - replace with real data from your backend
  const onlineUsers: OnlineUser[] = [
    { id: '1', name: 'You', status: 'online' },
    { id: '2', name: 'Alice Johnson', status: 'online' },
    { id: '3', name: 'Bob Wilson', status: 'away' },
    { id: '4', name: 'Charlie Brown', status: 'online' },
    { id: '5', name: 'Diana Martinez', status: 'busy' },
    { id: '6', name: 'Eve Thompson', status: 'online' },
  ];

  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-400';
      case 'away':
        return 'text-yellow-400 bg-yellow-400';
      case 'busy':
        return 'text-red-400 bg-red-400';
      default:
        return 'text-gray-400 bg-gray-400';
    }
  };

  const getStatusText = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'Active';
      case 'away':
        return 'Away';
      case 'busy':
        return 'Busy';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-1">Team Members</h3>
        <p className="text-sm text-gray-500">
          {onlineUsers.filter(u => u.status === 'online').length} online
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {onlineUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status).split(' ')[1]}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {getStatusText(user.status)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
