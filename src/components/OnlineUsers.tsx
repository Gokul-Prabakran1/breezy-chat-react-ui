
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
    { id: '2', name: 'Alice', status: 'online' },
    { id: '3', name: 'Bob', status: 'away' },
    { id: '4', name: 'Charlie', status: 'online' },
    { id: '5', name: 'Diana', status: 'busy' },
    { id: '6', name: 'Eve', status: 'online' },
  ];

  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-400';
      case 'away':
        return 'text-yellow-400';
      case 'busy':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'busy':
        return 'Busy';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white mb-2">Online Users</h3>
        <p className="text-sm text-gray-400">
          {onlineUsers.filter(u => u.status === 'online').length} online
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {onlineUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <Circle 
                  className={`h-4 w-4 ${getStatusColor(user.status)} fill-current`}
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className={`text-xs ${getStatusColor(user.status)}`}>
                {getStatusText(user.status)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
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
