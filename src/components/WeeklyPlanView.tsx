
import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  description: string;
  day: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: string;
}

const WeeklyPlanView = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly sync with the development team',
      day: 'Monday',
      priority: 'high',
      completed: false,
      estimatedTime: '1h',
    },
    {
      id: '2',
      title: 'Review Project Proposal',
      description: 'Go through the new client proposal',
      day: 'Tuesday',
      priority: 'medium',
      completed: true,
      estimatedTime: '2h',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedTime: '',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const addTask = () => {
    if (newTask.title.trim() && selectedDay) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        day: selectedDay,
        priority: newTask.priority,
        completed: false,
        estimatedTime: newTask.estimatedTime,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium', estimatedTime: '' });
      setSelectedDay('');
      setShowAddForm(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksForDay = (day: string) => {
    return tasks.filter(task => task.day === day);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Plan</h1>
          <p className="text-gray-600 mt-1">Organize your week and stay productive</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Day</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <Textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <Input
                placeholder="Estimated time (e.g., 2h, 30min)"
                value={newTask.estimatedTime}
                onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={addTask}>Add Task</Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setShowAddForm(false);
                  setNewTask({ title: '', description: '', priority: 'medium', estimatedTime: '' });
                  setSelectedDay('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const dayTasks = getTasksForDay(day);
          const completedTasks = dayTasks.filter(task => task.completed).length;
          
          return (
            <Card key={day} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{day}</CardTitle>
                  <Badge variant="secondary">
                    {completedTasks}/{dayTasks.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No tasks planned</p>
                  </div>
                ) : (
                  dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border transition-all ${
                        task.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium ${
                          task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h4>
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`ml-2 ${
                            task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {task.description && (
                        <p className={`text-sm mb-2 ${
                          task.completed ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.estimatedTime && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.estimatedTime}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyPlanView;
