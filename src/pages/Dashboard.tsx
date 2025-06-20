
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, CheckSquare, Calendar, Search, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import NotesView from '@/components/NotesView';
import HabitsView from '@/components/HabitsView';
import WeeklyPlanView from '@/components/WeeklyPlanView';

type ViewType = 'notes' | 'habits' | 'weekly';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'notes', label: 'Notes', icon: FileText, path: '/notes', color: 'from-blue-500 to-indigo-500' },
    { id: 'habits', label: 'Habits', icon: CheckSquare, path: '/habits', color: 'from-green-500 to-emerald-500' },
    { id: 'weekly', label: 'Weekly Plan', icon: Calendar, path: '/weekly-plan', color: 'from-purple-500 to-pink-500' },
  ];

  const handleNavigation = (path: string, viewId: string) => {
    setCurrentView(viewId as ViewType);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Sidebar */}
      <div className="w-72 bg-white/90 backdrop-blur-sm border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Workspace</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <Button 
            className="w-full justify-start bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-[1.02] transition-all duration-200" 
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Page
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className="w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
                <div className="relative flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.id === 'notes' && 'Capture your thoughts'}
                      {item.id === 'habits' && 'Track your progress'}
                      {item.id === 'weekly' && 'Plan your week'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group">
            <Settings className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-200" />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {currentView === 'notes' && 'Notes'}
                  {currentView === 'habits' && 'Habits'}
                  {currentView === 'weekly' && 'Weekly Plan'}
                </h2>
                <p className="text-gray-500 mt-1">
                  {currentView === 'notes' && 'Organize your thoughts and ideas'}
                  {currentView === 'habits' && 'Build better habits, one day at a time'}
                  {currentView === 'weekly' && 'Plan and organize your week'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search everything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                />
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with simple dotted background */}
        <div className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 opacity-50"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3
          }}></div>
          <div className="relative">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
