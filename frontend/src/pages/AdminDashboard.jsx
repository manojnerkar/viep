//Hello
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, DollarSign, Briefcase, Award, TrendingUp, 
  ArrowLeft, Search, Filter, MoreVertical, Eye, Edit, Trash
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Revenue', value: '₹4.5L', change: '+23%', icon: DollarSign, color: 'green' },
    { title: 'Active Projects', value: '48', change: '+5%', icon: Briefcase, color: 'purple' },
    { title: 'Certificates', value: '892', change: '+18%', icon: Award, color: 'yellow' }
  ];

  const recentUsers = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'fresher', joined: '2024-03-15', status: 'active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'fresher', joined: '2024-03-14', status: 'active' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', role: 'mentor', joined: '2024-03-13', status: 'active' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', role: 'fresher', joined: '2024-03-12', status: 'pending' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'fresher', joined: '2024-03-11', status: 'active' }
  ];

  const recentPayments = [
    { id: 1, user: 'Rahul Kumar', plan: 'Pro', amount: 1999, date: '2024-03-15', status: 'completed' },
    { id: 2, user: 'Priya Sharma', plan: 'Basic', amount: 999, date: '2024-03-14', status: 'completed' },
    { id: 3, user: 'Amit Patel', plan: 'Enterprise', amount: 3999, date: '2024-03-13', status: 'completed' },
    { id: 4, user: 'Sneha Gupta', plan: 'Pro', amount: 1999, date: '2024-03-12', status: 'pending' },
    { id: 5, user: 'Vikram Singh', plan: 'Basic', amount: 999, date: '2024-03-11', status: 'completed' }
  ];

  const projects = [
    { id: 1, name: 'E-Commerce Website', participants: 23, status: 'active', mentor: 'John Doe' },
    { id: 2, name: 'Social Media Dashboard', participants: 45, status: 'active', mentor: 'Jane Smith' },
    { id: 3, name: 'Task Management System', participants: 32, status: 'active', mentor: 'Mike Johnson' },
    { id: 4, name: 'AI Chatbot Integration', participants: 15, status: 'active', mentor: 'Sarah Wilson' },
    { id: 5, name: 'Blog Platform', participants: 38, status: 'completed', mentor: 'Tom Brown' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color];
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      inactive: 'bg-gray-100 text-gray-700'
    };
    return styles[status] || styles.active;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              Admin Panel
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${getColorClasses(stat.color)} flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp size={16} />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6">
              {['overview', 'users', 'payments', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-4 font-semibold border-b-2 transition ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <p className="text-sm text-gray-700">New user registered: Rahul Kumar</p>
                      <span className="ml-auto text-xs text-gray-500">2 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <p className="text-sm text-gray-700">Payment received: ₹1,999 from Priya Sharma</p>
                      <span className="ml-auto text-xs text-gray-500">15 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <p className="text-sm text-gray-700">Project completed: Task Management System</p>
                      <span className="ml-auto text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{user.joined}</td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Plan</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 font-medium text-gray-900">{payment.user}</td>
                          <td className="px-4 py-4 text-gray-600">{payment.plan}</td>
                          <td className="px-4 py-4 font-semibold text-gray-900">₹{payment.amount}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{payment.date}</td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.status)}`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Management</h3>
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{project.participants} participants</span>
                            <span>•</span>
                            <span>Mentor: {project.mentor}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                            {project.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
