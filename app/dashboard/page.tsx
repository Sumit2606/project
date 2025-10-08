'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Mic, 
  Brain, 
  Users, 
  BarChart3, 
  Trophy, 
  Settings, 
  LogOut, 
  Play, 
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

interface UserData {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const user = JSON.parse(storedData);
      setUserData(user);
    } else {
      window.location.href = '/';
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const handleGetStarted = () => {
    window.location.href = '/interview';
  };

  const handleInterviewPractice = () => {
    window.location.href = '/interview';
  };

  const handleProgressView = () => {
    window.location.href = '/progress';
  };

  const handleStudyMaterials = () => {
    window.location.href = '/study';
  };

  const handleSchedule = () => {
    window.location.href = '/schedule';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const mockStats = {
    totalInterviews: 12,
    averageScore: 85,
    improvementRate: 15,
    completedSessions: 8,
    upcomingScheduled: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Voice Interview
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-white/60 rounded-full border border-gray-200">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Welcome, {userData.name}!</div>
                  <div className="text-gray-500 text-xs capitalize">{userData.role}</div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Hello {userData.name}! 👋
                </h1>
                <p className="text-blue-100 text-lg mb-6">
                  Ready to ace your next interview? Let's practice with our AI voice agent and boost your confidence!
                </p>
                <Button 
                  onClick={handleGetStarted}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 h-auto"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{mockStats.totalInterviews}</div>
                  <div className="text-blue-100 text-sm">Total Interviews</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{mockStats.averageScore}%</div>
                  <div className="text-blue-100 text-sm">Average Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-blue-50 to-blue-100"
            onClick={handleInterviewPractice}
          >
            <CardHeader className="pb-3">
              <div className="bg-blue-500 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                <Mic className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-blue-900">Interview Practice</CardTitle>
              <CardDescription className="text-blue-700">
                Start a new AI-powered interview session
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                  Voice AI
                </Badge>
                <ChevronRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-purple-50 to-purple-100"
            onClick={handleProgressView}
          >
            <CardHeader className="pb-3">
              <div className="bg-purple-500 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-purple-900">Progress Tracking</CardTitle>
              <CardDescription className="text-purple-700">
                View your improvement analytics
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                  +{mockStats.improvementRate}% This Week
                </Badge>
                <ChevronRight className="h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-green-50 to-green-100"
            onClick={handleStudyMaterials}
          >
            <CardHeader className="pb-3">
              <div className="bg-green-500 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-green-900">Study Materials</CardTitle>
              <CardDescription className="text-green-700">
                Access guides and resources
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="bg-green-200 text-green-800">
                  50+ Resources
                </Badge>
                <ChevronRight className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-orange-50 to-orange-100"
            onClick={handleSchedule}
          >
            <CardHeader className="pb-3">
              <div className="bg-orange-500 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2 text-orange-900">Schedule</CardTitle>
              <CardDescription className="text-orange-700">
                Plan your interview sessions
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                  {mockStats.upcomingScheduled} Upcoming
                </Badge>
                <ChevronRight className="h-4 w-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Overview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Performance Overview
                </CardTitle>
                <CardDescription>Your interview performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-700 font-medium">Communication</span>
                      <span className="text-sm font-semibold text-blue-900">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-700 font-medium">Technical Skills</span>
                      <span className="text-sm font-semibold text-purple-900">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-700 font-medium">Confidence</span>
                      <span className="text-sm font-semibold text-green-900">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-orange-700 font-medium">Problem Solving</span>
                      <span className="text-sm font-semibold text-orange-900">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Overall Score</div>
                      <div className="text-2xl font-bold">{mockStats.averageScore}/100</div>
                    </div>
                    <Award className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Technical Interview</span>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">HR Round Practice</span>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Mock Interview</span>
                  </div>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="mr-2 h-5 w-5 text-purple-600" />
                  Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Weekly Practice Goal</span>
                      <span className="text-sm text-gray-600">5/7</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Score Improvement</span>
                      <span className="text-sm text-gray-600">85/90</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Features Banner */}
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6" />
                  <span className="text-lg font-semibold">AI-Powered Features</span>
                </div>
                <h3 className="text-2xl font-bold">Experience Next-Gen Interview Practice</h3>
                <p className="text-purple-100 max-w-2xl">
                  Our advanced AI analyzes your speech patterns, provides real-time feedback, and creates personalized improvement plans.
                </p>
              </div>
              
              <Button 
                onClick={handleInterviewPractice}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 h-auto"
              >
                Try AI Interview
                <Brain className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}