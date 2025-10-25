import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden flex items-center justify-center px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
        
        {/* Floating Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(500px) rotateX(60deg) translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* 404 Number with Glitch Effect */}
        <div className="relative mb-8">
          <h1 
            className={`text-[12rem] md:text-[16rem] font-black leading-none transition-all duration-200 ${
              glitchActive ? 'blur-sm' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: glitchActive ? '0 0 20px rgba(99, 102, 241, 0.5)' : 'none'
            }}
          >
            404
          </h1>
          
          {/* Glitch layers */}
          {glitchActive && (
            <>
              <h1 
                className="absolute inset-0 text-[12rem] md:text-[16rem] font-black leading-none"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'translate(-3px, -3px)',
                  opacity: 0.7
                }}
              >
                404
              </h1>
              <h1 
                className="absolute inset-0 text-[12rem] md:text-[16rem] font-black leading-none"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #22c55e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'translate(3px, 3px)',
                  opacity: 0.7
                }}
              >
                404
              </h1>
            </>
          )}

          {/* Decorative Elements */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Looks like you've ventured into uncharted territory. The page you're looking for seems to have vanished into the digital void.
          </p>
        </div>

        {/* Glassmorphism Card with Actions */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl" />
          
          <div className="relative z-10">
            <p className="text-slate-300 mb-6 text-lg">
              Don't worry, let's get you back on track:
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="group px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>

              <button
                onClick={() => navigate('/')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center gap-3"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Home Page
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 flex items-center justify-center gap-3"
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Dashboard
              </button>
            </div>

            {/* Popular Links */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-slate-400 text-sm mb-4">Popular destinations:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Courses', 'Tutorials', 'Community', 'Support'].map((link) => (
                  <button
                    key={link}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-slate-500 text-sm">
          <p>Error Code: 404 • Page Not Found</p>
          <p className="mt-2 italic">
            "Not all who wander are lost... but this page definitely is." 🧭
          </p>
        </div>
      </div>

      {/* Animated Shapes */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
      <div className="absolute top-10 right-10 w-16 h-16 border-4 border-cyan-500/30 rounded-lg animate-spin" style={{ animationDuration: '6s' }} />
    </div>
  );
};

export default NotFound;