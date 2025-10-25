import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Clock, Users, Filter, Search, Star } from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'Build a full-stack e-commerce platform with payment integration, product management, and user authentication.',
      difficulty: 'intermediate',
      duration: '8 weeks',
      participants: 23,
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      tools: ['GitHub', 'Jira', 'Figma'],
      status: 'available'
    },
    {
      id: 2,
      title: 'Social Media Dashboard',
      description: 'Create a social media analytics dashboard with real-time data visualization and user insights.',
      difficulty: 'beginner',
      duration: '4 weeks',
      participants: 45,
      techStack: ['React', 'Chart.js', 'Firebase'],
      tools: ['GitHub', 'Trello'],
      status: 'available'
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'Develop a Kanban-style task management application with drag-and-drop, team collaboration, and notifications.',
      difficulty: 'intermediate',
      duration: '6 weeks',
      participants: 32,
      techStack: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      tools: ['GitHub', 'Jira', 'Postman'],
      status: 'available'
    },
    {
      id: 4,
      title: 'AI Chatbot Integration',
      description: 'Build an AI-powered customer support chatbot with natural language processing and knowledge base.',
      difficulty: 'advanced',
      duration: '10 weeks',
      participants: 15,
      techStack: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      tools: ['GitHub', 'Docker', 'Kubernetes'],
      status: 'available'
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'Create a modern blogging platform with markdown support, comments, and SEO optimization.',
      difficulty: 'beginner',
      duration: '5 weeks',
      participants: 38,
      techStack: ['Next.js', 'MongoDB', 'TailwindCSS'],
      tools: ['GitHub', 'Vercel'],
      status: 'available'
    },
    {
      id: 6,
      title: 'Real-Time Chat Application',
      description: 'Develop a real-time messaging app with group chats, file sharing, and video calling features.',
      difficulty: 'advanced',
      duration: '12 weeks',
      participants: 12,
      techStack: ['React', 'Socket.io', 'WebRTC', 'Redis'],
      tools: ['GitHub', 'Jira', 'Docker'],
      status: 'available'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700 border-green-300',
      intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      advanced: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[difficulty];
  };

  const filteredProjects = projects.filter(project => {
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Available Projects</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Project Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {project.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{project.participants} enrolled</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Code className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Star className="flex-shrink-0" size={32} />
            <div>
              <h3 className="text-2xl font-bold mb-2">Want to suggest a project?</h3>
              <p className="text-blue-100">
                Have an idea for a project? We'd love to hear it! Contact our team to discuss your suggestions.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;