import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { LogOut, User, Briefcase, CheckCircle, Award, DollarSign, FolderOpen, Settings, Shield, ListTodo, FileText } from 'lucide-react';
import Notifications from '../components/Notifications';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const quickActions = [
    { title: 'Browse Projects', desc: 'Explore available projects', icon: FolderOpen, path: '/projects', color: 'blue' },
    { title: 'My Tasks', desc: 'View and manage tasks', icon: ListTodo, path: '/tasks', color: 'green' },
    { title: 'Certificates', desc: 'View your achievements', icon: FileText, path: '/certificates', color: 'purple' },
    { title: 'View Pricing', desc: 'Check subscription plans', icon: DollarSign, path: '/pricing', color: 'yellow' },
    { title: 'Edit Profile', desc: 'Update your information', icon: User, path: '/profile', color: 'pink' },
  ];

  // Add admin action if user is admin
  if (user?.role === 'admin') {
    quickActions.push({ 
      title: 'Admin Panel', 
      desc: 'Manage platform', 
      icon: Shield, 
      path: '/admin', 
      color: 'red' 
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">VIEP Platform</h1>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Notifications />
            
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              <User size={20} />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
          <p className="text-blue-100">Ready to continue your learning journey?</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Active Projects</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Tasks Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-600">Certificates</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <User className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">0%</h3>
            <p className="text-gray-600">Profile Complete</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                red: 'from-red-500 to-red-600',
                yellow: 'from-yellow-500 to-yellow-600',
                pink: 'from-pink-500 to-pink-600'
              };
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`bg-gradient-to-br ${colorClasses[action.color]} rounded-xl p-6 text-white text-left hover:shadow-lg transform hover:scale-105 transition-all`}
                >
                  <Icon size={32} className="mb-3" />
                  <h4 className="font-bold text-lg mb-1">{action.title}</h4>
                  <p className="text-sm text-white/80">{action.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Complete Your Profile</h4>
                <p className="text-gray-600 text-sm">Add your skills, education, and experience to get matched with relevant projects.</p>
                <button
                  onClick={() => navigate('/profile')}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Go to Profile →
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Choose a Plan</h4>
                <p className="text-gray-600 text-sm">Select a subscription plan to access projects and mentorship.</p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  View Pricing →
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Start Your First Project</h4>
                <p className="text-gray-600 text-sm">Browse available projects and get assigned to start building real-world experience.</p>
                <button
                  onClick={() => navigate('/projects')}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Browse Projects →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;