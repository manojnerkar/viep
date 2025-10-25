import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, 
  GraduationCap, Github, Linkedin, Globe, Save, ArrowLeft, Edit, Plus, X, Camera
} from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    experience: user?.experience || '0-1',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    portfolio: user?.portfolio || '',
    education: {
      degree: user?.education?.degree || '',
      institution: user?.education?.institution || '',
      year: user?.education?.year || ''
    }
  });
  
  const [skills, setSkills] = useState(user?.skills || ['React', 'Node.js', 'MongoDB']);
  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    toast.success('Skill removed!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to update profile
    console.log('Updated profile:', { ...formData, skills });
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 10;

    if (formData.name) completed++;
    if (formData.email) completed++;
    if (formData.phone) completed++;
    if (formData.bio) completed++;
    if (formData.experience) completed++;
    if (skills.length > 0) completed++;
    if (formData.education.degree) completed++;
    if (formData.github || formData.linkedin || formData.portfolio) completed++;

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit size={18} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Completion Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Profile Completion</h3>
            <span className="text-2xl font-bold">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-100 mt-2">
            {profileCompletion === 100 
              ? '🎉 Your profile is complete!' 
              : 'Complete your profile to get better project recommendations'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-lg"
                  >
                    <Camera size={18} />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-3xl font-bold text-gray-900 mb-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none w-full"
                      placeholder="Your Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="text-gray-600 mb-2 border-b border-gray-300 outline-none w-full bg-gray-50 cursor-not-allowed"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.name}</h1>
                    <p className="text-gray-600 flex items-center gap-2 mb-2">
                      <Mail size={18} />
                      {formData.email}
                    </p>
                  </>
                )}
                
                <div className="flex items-center gap-4 mt-4">
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {formData.bio || 'No bio added yet. Click Edit Profile to add one.'}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="1234567890"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {formData.phone || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Briefcase size={18} />
                  Experience Level
                </label>
                {isEditing ? (
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="0-1">0-1 years</option>
                    <option value="1-2">1-2 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="3+">3+ years</option>
                  </select>
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {formData.experience} years
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
            
            {isEditing && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Add a skill (e.g., React, Node.js)"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet. Add some to showcase your expertise!</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap size={24} />
              Education
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="education.degree"
                    value={formData.education.degree}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="B.Tech in Computer Science"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {formData.education.degree || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="education.institution"
                    value={formData.education.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="University Name"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {formData.education.institution || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="education.year"
                    value={formData.education.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="2024"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {formData.education.year || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Github size={18} />
                  GitHub
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://github.com/username"
                  />
                ) : formData.github ? (
                  <a 
                    href={formData.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline bg-gray-50 p-3 rounded-lg block"
                  >
                    {formData.github}
                  </a>
                ) : (
                  <p className="text-gray-500 bg-gray-50 p-3 rounded-lg">Not provided</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Linkedin size={18} />
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                ) : formData.linkedin ? (
                  <a 
                    href={formData.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline bg-gray-50 p-3 rounded-lg block"
                  >
                    {formData.linkedin}
                  </a>
                ) : (
                  <p className="text-gray-500 bg-gray-50 p-3 rounded-lg">Not provided</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Globe size={18} />
                  Portfolio Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                ) : formData.portfolio ? (
                  <a 
                    href={formData.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline bg-gray-50 p-3 rounded-lg block"
                  >
                    {formData.portfolio}
                  </a>
                ) : (
                  <p className="text-gray-500 bg-gray-50 p-3 rounded-lg">Not provided</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;