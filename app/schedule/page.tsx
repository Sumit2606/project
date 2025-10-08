'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Home, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  Bell,
  Video,
  Mic,
  Brain,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';

interface ScheduledSession {
  id: number;
  title: string;
  type: 'Mock Interview' | 'Technical Practice' | 'Behavioral Practice' | 'System Design' | 'HR Practice';
  date: string;
  time: string;
  duration: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  reminder: boolean;
  status: 'scheduled' | 'completed' | 'missed';
}

const scheduledSessions: ScheduledSession[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer Mock Interview',
    type: 'Mock Interview',
    date: '2025-01-10',
    time: '10:00',
    duration: 60,
    difficulty: 'Hard',
    category: 'Technical',
    reminder: true,
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'React Performance Optimization',
    type: 'Technical Practice',
    date: '2025-01-11',
    time: '14:30',
    duration: 45,
    difficulty: 'Medium',
    category: 'Technical',
    reminder: true,
    status: 'scheduled'
  },
  {
    id: 3,
    title: 'Leadership Scenario Practice',
    type: 'Behavioral Practice',
    date: '2025-01-09',
    time: '16:00',
    duration: 30,
    difficulty: 'Medium',
    category: 'Behavioral',
    reminder: false,
    status: 'completed'
  },
  {
    id: 4,
    title: 'System Design: Social Media Platform',
    type: 'System Design',
    date: '2025-01-12',
    time: '11:00',
    duration: 90,
    difficulty: 'Hard',
    category: 'Technical',
    reminder: true,
    status: 'scheduled'
  }
];

export default function SchedulePage() {
  const [sessions, setSessions] = useState(scheduledSessions);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    type: 'Mock Interview' as const,
    date: '',
    time: '',
    duration: 60,
    difficulty: 'Medium' as const,
    category: 'Technical',
    reminder: true
  });

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getSessionsForDate = (date: string) => {
    return sessions.filter(session => session.date === date);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const id = sessions.length + 1;
    const session: ScheduledSession = {
      ...newSession,
      id,
      status: 'scheduled'
    };
    setSessions(prev => [...prev, session]);
    setShowNewSessionForm(false);
    setNewSession({
      title: '',
      type: 'Mock Interview',
      date: '',
      time: '',
      duration: 60,
      difficulty: 'Medium',
      category: 'Technical',
      reminder: true
    });
  };

  const deleteSession = (id: number) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Mock Interview': return <Video className="h-4 w-4" />;
      case 'Technical Practice': return <Brain className="h-4 w-4" />;
      case 'Behavioral Practice': return <Mic className="h-4 w-4" />;
      case 'System Design': return <Brain className="h-4 w-4" />;
      case 'HR Practice': return <Mic className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-xl font-bold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
            Interview Schedule
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Schedule Management</h2>
            <p className="text-gray-600 mt-2">Plan and manage your interview practice sessions</p>
          </div>
          <Button 
            onClick={() => setShowNewSessionForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 h-auto"
          >
            <Plus className="mr-2 h-5 w-5" />
            Schedule Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{formatDate(currentDate)}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="h-12"></div>;
                    }

                    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const sessionsForDay = getSessionsForDate(dateStr);
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                    return (
                      <div
                        key={day}
                        className={`h-12 border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors relative ${
                          isToday 
                            ? 'bg-blue-100 border-blue-300 text-blue-900' 
                            : 'hover:bg-gray-50 border-gray-200'
                        } ${selectedDate === dateStr ? 'bg-blue-50 border-blue-400' : ''}`}
                        onClick={() => setSelectedDate(dateStr)}
                      >
                        <span className="text-sm font-medium">{day}</span>
                        {sessionsForDay.length > 0 && (
                          <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-600" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>Your next interview practice sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions
                  .filter(session => session.status === 'scheduled')
                  .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                  .slice(0, 3)
                  .map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-100 p-1 rounded">
                            {getTypeIcon(session.type)}
                          </div>
                          <div className="text-sm font-medium line-clamp-1">{session.title}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{session.time}</span>
                        <span>({session.duration}min)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{session.type}</Badge>
                          <Badge className={`text-xs ${getDifficultyColor(session.difficulty)}`}>
                            {session.difficulty}
                          </Badge>
                        </div>
                        {session.reminder && (
                          <Bell className="h-3 w-3 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                
                {sessions.filter(s => s.status === 'scheduled').length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No upcoming sessions</p>
                    <Button 
                      variant="link" 
                      className="text-xs mt-1"
                      onClick={() => setShowNewSessionForm(true)}
                    >
                      Schedule your first session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      {sessions.filter(s => s.status === 'scheduled').length}
                    </div>
                    <div className="text-xs text-blue-800">Scheduled</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {sessions.filter(s => s.status === 'completed').length}
                    </div>
                    <div className="text-xs text-green-800">Completed</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {sessions.reduce((total, session) => total + session.duration, 0)}
                  </div>
                  <div className="text-xs text-purple-800">Total Minutes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Session Details for Selected Date */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>
                Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getSessionsForDate(selectedDate).length > 0 ? (
                <div className="space-y-4">
                  {getSessionsForDate(selectedDate).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          {getTypeIcon(session.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{session.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{session.time}</span>
                            <span>•</span>
                            <span>{session.duration} minutes</span>
                            <span>•</span>
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        {session.reminder && (
                          <Bell className="h-4 w-4 text-blue-600" />
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteSession(session.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No sessions scheduled for this date</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setShowNewSessionForm(true)}
                  >
                    Schedule Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* New Session Form Modal */}
        {showNewSessionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Schedule New Session</CardTitle>
                <CardDescription>Create a new interview practice session</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateSession} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Session Title</Label>
                    <Input
                      id="title"
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      required
                      placeholder="e.g., Frontend Developer Mock Interview"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <select
                      id="type"
                      value={newSession.type}
                      onChange={(e) => setNewSession({...newSession, type: e.target.value as any})}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      required
                    >
                      <option value="Mock Interview">Mock Interview</option>
                      <option value="Technical Practice">Technical Practice</option>
                      <option value="Behavioral Practice">Behavioral Practice</option>
                      <option value="System Design">System Design</option>
                      <option value="HR Practice">HR Practice</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newSession.date}
                        onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newSession.time}
                        onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newSession.duration}
                        onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
                        required
                        min="15"
                        max="180"
                      />
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <select
                        id="difficulty"
                        value={newSession.difficulty}
                        onChange={(e) => setNewSession({...newSession, difficulty: e.target.value as any})}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        required
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newSession.category}
                      onChange={(e) => setNewSession({...newSession, category: e.target.value})}
                      required
                      placeholder="e.g., Technical, Behavioral"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminder"
                      checked={newSession.reminder}
                      onChange={(e) => setNewSession({...newSession, reminder: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="reminder">Send reminder notification</Label>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Schedule Session
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowNewSessionForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}