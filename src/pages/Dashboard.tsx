
import React, { useState } from 'react';
import { Plus, FileText, CheckSquare, Calendar, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotesView from '@/components/NotesView';
import HabitsView from '@/components/HabitsView';
import WeeklyPlanView from '@/components/WeeklyPlanView';

type ViewType = 'notes' | 'habits' | 'weekly';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>('notes');
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'weekly', label: 'Weekly Plan', icon: Calendar },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'notes':
        return <NotesView searchQuery={searchQuery} />;
      case 'habits':
        return <HabitsView />;
      case 'weekly':
        return <WeeklyPlanView />;
      default:
        return <NotesView searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">My Workspace</h1>
        </div>
        
        <div className="p-4">
          <Button className="w-full justify-start" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </div>

        <nav className="flex-1 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg mb-1 transition-colors ${
                  currentView === item.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
