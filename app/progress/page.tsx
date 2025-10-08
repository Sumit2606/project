'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  Trophy, 
  Target, 
  BarChart3, 
  Home,
  Brain,
  Clock,
  Award,
  Zap,
  ChevronRight,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for progress tracking
  const progressData = {
    week: {
      totalInterviews: 8,
      averageScore: 85,
      improvement: 12,
      timeSpent: 180, // minutes
      streakDays: 5
    },
    month: {
      totalInterviews: 32,
      averageScore: 82,
      improvement: 18,
      timeSpent: 720,
      streakDays: 15
    },
    year: {
      totalInterviews: 156,
      averageScore: 78,
      improvement: 35,
      timeSpent: 2880,
      streakDays: 45
    }
  };

  const skillsProgress = [
    { skill: 'Communication', current: 88, target: 95, category: 'Behavioral' },
    { skill: 'Technical Knowledge', current: 75, target: 90, category: 'Technical' },
    { skill: 'Problem Solving', current: 82, target: 88, category: 'Technical' },
    { skill: 'Confidence', current: 92, target: 95, category: 'Behavioral' },
    { skill: 'Leadership', current: 70, target: 85, category: 'Behavioral' },
    { skill: 'System Design', current: 65, target: 80, category: 'Technical' }
  ];

  const recentSessions = [
    {
      id: 1,
      date: '2025-01-08',
      type: 'Technical Interview',
      score: 88,
      duration: 45,
      feedback: 'Excellent problem-solving approach',
      category: 'Technical'
    },
    {
      id: 2,
      date: '2025-01-07',
      type: 'Behavioral Interview',
      score: 92,
      duration: 35,
      feedback: 'Great storytelling and structure',
      category: 'Behavioral'
    },
    {
      id: 3,
      date: '2025-01-06',
      type: 'System Design',
      score: 76,
      duration: 60,
      feedback: 'Good scalability considerations',
      category: 'Technical'
    },
    {
      id: 4,
      date: '2025-01-05',
      type: 'Mock Interview',
      score: 85,
      duration: 50,
      feedback: 'Confident delivery, minor improvements needed',
      category: 'Mixed'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Interview',
      description: 'Completed your first AI interview session',
      earned: true,
      date: '2025-01-01'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Practiced for 7 consecutive days',
      earned: true,
      date: '2025-01-05'
    },
    {
      id: 3,
      title: 'Score Master',
      description: 'Achieved score above 90%',
      earned: true,
      date: '2025-01-07'
    },
    {
      id: 4,
      title: 'Technical Expert',
      description: 'Completed 20 technical interviews',
      earned: false,
      progress: 75
    },
    {
      id: 5,
      title: 'Improvement Champion',
      description: 'Improved average score by 20 points',
      earned: false,
      progress: 60
    }
  ];

  const currentData = progressData[selectedPeriod as keyof typeof progressData];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSkillProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

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
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Progress Analytics
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Period Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Track your interview practice progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              {['week', 'month', 'year'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  onClick={() => setSelectedPeriod(period)}
                  className="capitalize"
                >
                  This {period}
                </Button>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="bg-blue-500 p-3 rounded-full w-fit mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {currentData.totalInterviews}
                </div>
                <div className="text-sm text-blue-800">Total Interviews</div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <div className="bg-purple-500 p-3 rounded-full w-fit mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {currentData.averageScore}%
                </div>
                <div className="text-sm text-purple-800">Average Score</div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="bg-green-500 p-3 rounded-full w-fit mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  +{currentData.improvement}%
                </div>
                <div className="text-sm text-green-800">Improvement</div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="bg-orange-500 p-3 rounded-full w-fit mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {Math.floor(currentData.timeSpent / 60)}h {currentData.timeSpent % 60}m
                </div>
                <div className="text-sm text-orange-800">Time Practiced</div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <div className="bg-yellow-500 p-3 rounded-full w-fit mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {currentData.streakDays}
                </div>
                <div className="text-sm text-yellow-800">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-purple-600" />
                  Skills Development
                </CardTitle>
                <CardDescription>Track your progress across different skill areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillsProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge 
                          variant="outline" 
                          className={skill.category === 'Technical' ? 'border-blue-300 text-blue-700' : 'border-purple-300 text-purple-700'}
                        >
                          {skill.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {skill.current}% / {skill.target}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress 
                        value={(skill.current / skill.target) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: {skill.current}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Recent Sessions
                </CardTitle>
                <CardDescription>Your latest interview practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{session.type}</span>
                          <Badge variant="outline">{session.category}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {new Date(session.date).toLocaleDateString()} • {session.duration} min
                        </div>
                        <div className="text-sm text-gray-700">{session.feedback}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(session.score)}`}>
                          {session.score}%
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-600" />
                  Achievements
                </CardTitle>
                <CardDescription>Your milestones and badges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-400 text-white'
                      }`}>
                        {achievement.earned ? (
                          <Award className="h-4 w-4" />
                        ) : (
                          <Star className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{achievement.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {achievement.description}
                        </div>
                        {achievement.earned ? (
                          <div className="text-xs text-yellow-700 mt-2">
                            Earned: {achievement.date ? new Date(achievement.date).toLocaleDateString() : "N/A"}
                          </div>
                        ) : (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1 mb-1" />
                            <div className="text-xs text-gray-500">
                              {achievement.progress}% complete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/interview">
                  <Button className="w-full justify-between">
                    Start New Interview
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/study">
                  <Button variant="outline" className="w-full justify-between">
                    Study Materials
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/schedule">
                  <Button variant="outline" className="w-full justify-between">
                    Schedule Practice
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}