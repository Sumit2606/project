'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Brain,
  Clock,
  CheckCircle,
  RotateCcw,
  Home,
  Settings,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  category: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    category: 'Technical',
    question: 'Can you explain the difference between let, const, and var in JavaScript?',
    difficulty: 'Medium',
    timeLimit: 180
  },
  {
    id: 2,
    category: 'Behavioral',
    question: 'Tell me about a time when you had to work with a difficult team member.',
    difficulty: 'Medium',
    timeLimit: 300
  },
  {
    id: 3,
    category: 'Technical',
    question: 'How would you optimize a React application for better performance?',
    difficulty: 'Hard',
    timeLimit: 240
  },
  {
    id: 4,
    category: 'HR',
    question: 'Why do you want to work for our company?',
    difficulty: 'Easy',
    timeLimit: 120
  }
];

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mockQuestions[0].timeLimit);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (sessionStarted && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return mockQuestions[currentQuestion + 1]?.timeLimit || 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [sessionStarted, isPaused, timeLeft, currentQuestion]);

  const startSession = () => {
    setSessionStarted(true);
    setTimeLeft(mockQuestions[0].timeLimit);
    speakQuestion(mockQuestions[0].question);
  };

  const speakQuestion = (question: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsListening(true);
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Generate AI feedback (mock)
    generateFeedback();
  };

  const generateFeedback = () => {
    const feedbacks = [
      "Great answer! Your explanation was clear and comprehensive. Consider adding more specific examples.",
      "Good response! You covered the key points well. Try to be more concise in your delivery.",
      "Excellent technical knowledge demonstrated. Work on structuring your answer better.",
      "Nice job! Your enthusiasm comes through clearly. Practice maintaining eye contact."
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    const randomScore = Math.floor(Math.random() * 20) + 75;
    
    setFeedback(randomFeedback);
    setScore(randomScore);
  };

  const handleNextQuestion = () => {
    setAnswers(prev => [...prev, transcript]);
    
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(mockQuestions[currentQuestion + 1].timeLimit);
      setTranscript('');
      setFeedback('');
      setScore(0);
      setIsRecording(false);
      setIsListening(false);
      
      // Speak next question after a brief pause
      setTimeout(() => {
        speakQuestion(mockQuestions[currentQuestion + 1].question);
      }, 2000);
    } else {
      // End session
      setSessionCompleted(true);
      setSessionStarted(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setTimeLeft(mockQuestions[currentQuestion - 1].timeLimit);
      setTranscript(answers[currentQuestion - 1] || '');
      setFeedback('');
      setScore(0);
    }
  };

  const restartSession = () => {
    setCurrentQuestion(0);
    setTimeLeft(mockQuestions[0].timeLimit);
    setTranscript('');
    setFeedback('');
    setScore(0);
    setSessionCompleted(false);
    setAnswers([]);
    startSession();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (sessionCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold">Interview Complete!</h1>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-6">
          <Card className="text-center p-8">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Award className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-8">You've completed your AI interview session</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {Math.floor(Math.random() * 10) + 85}%
                </div>
                <div className="text-sm text-blue-800">Overall Score</div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {mockQuestions.length}
                </div>
                <div className="text-sm text-purple-800">Questions Answered</div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {Math.floor(Math.random() * 5) + 15} min
                </div>
                <div className="text-sm text-green-800">Session Duration</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold">AI Analysis Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Strong communication skills demonstrated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Good technical knowledge across topics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Recommended: Practice behavioral questions more</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <Button onClick={restartSession} className="px-8">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link href="/progress">
                <Button variant="outline" className="px-8">
                  View Progress
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="px-8">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold">AI Voice Interview</h1>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-6">
          <Card className="text-center p-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Ready for Your AI Interview?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI will ask you {mockQuestions.length} questions across different categories. 
              Speak naturally and get instant feedback on your performance.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {mockQuestions.map((q, index) => (
                <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{q.category}</span>
                    <Badge className={getDifficultyColor(q.difficulty)}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(q.timeLimit)} time limit
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-3 flex items-center justify-center">
                <Zap className="mr-2 h-5 w-5 text-blue-600" />
                AI Features
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Voice Recognition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instant Feedback</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={startSession} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg h-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Interview
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </div>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{currentQ.category}</Badge>
                  <Badge className={getDifficultyColor(currentQ.difficulty)}>
                    {currentQ.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{currentQ.question}</CardTitle>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                  <Clock className="h-6 w-6 text-blue-600" />
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Recording Interface */}
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-100 animate-pulse' 
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}>
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white shadow-lg`}
                >
                  {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                </Button>
              </div>
              
              {isListening && (
                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-red-400 animate-ping"></div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {isRecording ? 'Recording...' : 'Click to start recording your answer'}
              </h3>
              <p className="text-gray-600 text-sm">
                Speak clearly and naturally. Our AI will analyze your response in real-time.
              </p>
            </div>

            {/* Live Transcript */}
            {transcript && (
              <div className="bg-gray-50 p-4 rounded-lg max-h-32 overflow-y-auto">
                <div className="text-sm text-gray-700">
                  <strong>Your Response:</strong>
                  <p className="mt-2">{transcript}</p>
                </div>
              </div>
            )}

            {/* AI Feedback */}
            {feedback && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">AI Feedback</h4>
                    <p className="text-sm text-blue-800 mb-3">{feedback}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Score:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={score} className="w-24 h-2" />
                        <span className="text-sm font-bold text-blue-600">{score}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                
                <Button variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleNextQuestion}>
                Next Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}