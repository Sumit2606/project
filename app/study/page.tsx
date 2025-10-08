'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Home, 
  Search, 
  Filter, 
  Play, 
  FileText, 
  Video, 
  Headphones,
  Star,
  Clock,
  Users,
  TrendingUp,
  ChevronRight,
  Download,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';

interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'guide';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  views: number;
  bookmarked: boolean;
}

const studyMaterials: StudyMaterial[] = [
  {
    id: 1,
    title: 'Complete Guide to Technical Interviews',
    description: 'Master data structures, algorithms, and system design questions',
    type: 'guide',
    category: 'Technical',
    difficulty: 'Intermediate',
    duration: '2 hours',
    rating: 4.8,
    views: 15420,
    bookmarked: true
  },
  {
    id: 2,
    title: 'Behavioral Interview Masterclass',
    description: 'Learn the STAR method and handle tough behavioral questions',
    type: 'video',
    category: 'Behavioral',
    difficulty: 'Beginner',
    duration: '45 min',
    rating: 4.9,
    views: 22340,
    bookmarked: false
  },
  {
    id: 3,
    title: 'System Design Interview Patterns',
    description: 'Common patterns and frameworks for system design interviews',
    type: 'article',
    category: 'System Design',
    difficulty: 'Advanced',
    duration: '1.5 hours',
    rating: 4.7,
    views: 8950,
    bookmarked: true
  },
  {
    id: 4,
    title: 'Salary Negotiation Strategies',
    description: 'Audio guide on negotiating your compensation package',
    type: 'audio',
    category: 'Career',
    difficulty: 'Intermediate',
    duration: '30 min',
    rating: 4.6,
    views: 5670,
    bookmarked: false
  },
  {
    id: 5,
    title: 'JavaScript Interview Questions',
    description: 'Top 100 JavaScript questions with detailed explanations',
    type: 'guide',
    category: 'Technical',
    difficulty: 'Intermediate',
    duration: '3 hours',
    rating: 4.8,
    views: 18750,
    bookmarked: false
  },
  {
    id: 6,
    title: 'Leadership Interview Scenarios',
    description: 'Practice common leadership and management scenarios',
    type: 'video',
    category: 'Leadership',
    difficulty: 'Advanced',
    duration: '1 hour',
    rating: 4.5,
    views: 3420,
    bookmarked: true
  }
];

const categories = ['All', 'Technical', 'Behavioral', 'System Design', 'Career', 'Leadership'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const types = ['All', 'article', 'video', 'audio', 'guide'];

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [materials, setMaterials] = useState(studyMaterials);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || material.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || material.type === selectedType;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  const toggleBookmark = (id: number) => {
    setMaterials(prev => 
      prev.map(material => 
        material.id === id 
          ? { ...material, bookmarked: !material.bookmarked }
          : material
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
            <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
            Study Materials
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Comprehensive Interview Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated study materials, guides, and practice resources to enhance your interview preparation.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search study materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedDifficulty('All');
                      setSelectedType('All');
                    }}
                    className="w-full h-10"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="text-sm text-gray-600">
          Showing {filteredMaterials.length} of {materials.length} materials
        </div>

        {/* Study Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card 
              key={material.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                      {getTypeIcon(material.type)}
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {material.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(material.id);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${
                        material.bookmarked 
                          ? 'fill-yellow-500 text-yellow-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>

                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {material.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-2">
                  {material.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Badges */}
                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(material.difficulty)}>
                    {material.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{material.duration}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{material.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{material.views.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1 group-hover:bg-blue-600 transition-colors">
                    <Play className="mr-2 h-4 w-4" />
                    Start Learning
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse our recommended materials.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                  setSelectedType('All');
                }}
              >
                View All Materials
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Featured Resources */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Premium Interview Prep Course</h3>
                <p className="text-blue-100 mb-6">
                  Get access to exclusive content, personalized feedback, and 1-on-1 coaching sessions 
                  with industry experts.
                </p>
                <div className="flex items-center space-x-4 text-blue-100 text-sm mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>20+ hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>4.9 rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>5,000+ students</span>
                  </div>
                </div>
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <div className="font-semibold">95% Success Rate</div>
                  <div className="text-sm text-blue-100">Land your dream job</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <Users className="h-6 w-6 mb-2" />
                  <div className="font-semibold">Expert Mentors</div>
                  <div className="text-sm text-blue-100">Industry professionals</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}