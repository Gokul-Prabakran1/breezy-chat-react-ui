
import React, { useState } from 'react';
import { Plus, Check, X, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedToday: boolean;
  weeklyGoal: number;
  completedThisWeek: number;
  createdAt: Date;
}

const HabitsView = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Exercise',
      description: '30 minutes of workout',
      streak: 5,
      completedToday: true,
      weeklyGoal: 5,
      completedThisWeek: 3,
      createdAt: new Date('2024-01-10'),
    },
    {
      id: '2',
      name: 'Read 30 minutes',
      description: 'Daily reading habit',
      streak: 12,
      completedToday: false,
      weeklyGoal: 7,
      completedThisWeek: 4,
      createdAt: new Date('2024-01-05'),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        description: newHabitDescription,
        streak: 0,
        completedToday: false,
        weeklyGoal: 7,
        completedThisWeek: 0,
        createdAt: new Date(),
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setNewHabitDescription('');
      setShowAddForm(false);
    }
  };

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          completedThisWeek: !wasCompleted 
            ? habit.completedThisWeek + 1 
            : Math.max(0, habit.completedThisWeek - 1),
        };
      }
      return habit;
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Habits</h1>
          <p className="text-gray-600 mt-1">Track your daily habits and build consistency</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Habit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Habit name (e.g., Morning Meditation)"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={newHabitDescription}
              onChange={(e) => setNewHabitDescription(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={addHabit}>Create Habit</Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setShowAddForm(false);
                  setNewHabitName('');
                  setNewHabitDescription('');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
                    <Badge variant={habit.completedToday ? "default" : "secondary"}>
                      {habit.streak} day streak
                    </Badge>
                  </div>
                  {habit.description && (
                    <p className="text-gray-600 mb-3">{habit.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {habit.completedThisWeek}/{habit.weeklyGoal} this week
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Today</div>
                    <div className={`text-lg font-semibold ${
                      habit.completedToday ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {habit.completedToday ? 'Done' : 'Pending'}
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleHabitCompletion(habit.id)}
                    variant={habit.completedToday ? "default" : "outline"}
                    size="lg"
                    className={`h-12 w-12 rounded-full ${
                      habit.completedToday 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    {habit.completedToday ? (
                      <Check className="h-6 w-6 text-white" />
                    ) : (
                      <Check className="h-6 w-6 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
          <p className="text-gray-500 mb-4">Start building better habits by creating your first one</p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Habit
          </Button>
        </div>
      )}
    </div>
  );
};

export default HabitsView;
