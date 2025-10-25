import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Eye, Award, Calendar, CheckCircle, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Certificates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const certificates = [
    {
      id: 1,
      certificateId: 'VIEP-2024-001',
      projectTitle: 'E-Commerce Website',
      issueDate: '2024-03-15',
      completionDate: '2024-03-10',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      skills: ['Full-Stack Development', 'REST APIs', 'Authentication'],
      mentorName: 'John Doe',
      rating: 4.8,
      status: 'active',
      verificationUrl: 'https://viep.com/verify/VIEP-2024-001'
    },
    {
      id: 2,
      certificateId: 'VIEP-2024-002',
      projectTitle: 'Social Media Dashboard',
      issueDate: '2024-02-20',
      completionDate: '2024-02-15',
      techStack: ['React', 'Chart.js', 'Firebase'],
      skills: ['Data Visualization', 'Frontend Development', 'Firebase'],
      mentorName: 'Jane Smith',
      rating: 4.5,
      status: 'active',
      verificationUrl: 'https://viep.com/verify/VIEP-2024-002'
    },
    {
      id: 3,
      certificateId: 'VIEP-2024-003',
      projectTitle: 'Task Management System',
      issueDate: '2024-01-10',
      completionDate: '2024-01-05',
      techStack: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      skills: ['Real-time Features', 'Database Design', 'WebSockets'],
      mentorName: 'Mike Johnson',
      rating: 4.9,
      status: 'active',
      verificationUrl: 'https://viep.com/verify/VIEP-2024-003'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (cert) => {
    toast.success(`Downloading certificate: ${cert.certificateId}`);
    // TODO: Implement actual PDF download
  };

  const handleShare = (cert) => {
    navigator.clipboard.writeText(cert.verificationUrl);
    toast.success('Verification link copied to clipboard!');
  };

  const handleView = (cert) => {
    // TODO: Open certificate preview modal
    toast.success('Opening certificate preview...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
                <p className="text-sm text-gray-600">View and download your achievements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <Award className="mb-3" size={32} />
            <div className="text-3xl font-bold mb-1">{certificates.length}</div>
            <div className="text-blue-100">Total Certificates</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <CheckCircle className="mb-3" size={32} />
            <div className="text-3xl font-bold mb-1">{certificates.filter(c => c.status === 'active').length}</div>
            <div className="text-green-100">Active Certificates</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <Calendar className="mb-3" size={32} />
            <div className="text-3xl font-bold mb-1">
              {new Date(certificates[certificates.length - 1]?.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
            <div className="text-purple-100">Latest Issue</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-center border-b border-gray-200">
                <Award className="mx-auto text-blue-600 mb-3" size={48} />
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.projectTitle}</h3>
                <p className="text-sm text-gray-600 mb-3">Certificate of Completion</p>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  ✓ Verified
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                {/* Certificate ID */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Certificate ID</div>
                  <div className="font-mono text-sm text-gray-900">{cert.certificateId}</div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Issue Date</div>
                    <div className="text-sm text-gray-900">{cert.issueDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Completed</div>
                    <div className="text-sm text-gray-900">{cert.completionDate}</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Skills Acquired</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentor & Rating */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500">Mentor</div>
                    <div className="text-sm font-medium text-gray-900">{cert.mentorName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="text-sm font-bold text-yellow-600">⭐ {cert.rating}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleView(cert)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => handleShare(cert)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600 mb-6">Complete projects to earn certificates</p>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Projects
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Certificate Verification</h3>
          <p className="text-blue-100 mb-4">
            All certificates come with a unique ID and QR code for verification. 
            Employers can verify your certificates using the verification link.
          </p>
          <button
            onClick={() => toast.info('Feature coming soon!')}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Verify a Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificates;