// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div
      className="relative w-full min-h-[calc(100vh-70px)] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center text-white overflow-hidden py-12"
      
    >
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-[#0F0F23]/90 to-pink-900/70"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-5xl animate-fadeUp">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Novy Grafyniq
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300">What We Offer</h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">
              <strong className="text-purple-300">Novy Grafyniq</strong> is your creative companion — a modern, online design tool built with the MERN stack,
              giving you the power to create posters, banners, and social media visuals with ease. 
              No complicated software, no limits to your imagination.
            </p>
          </div>

          {/* Right Column */}
          <div className="bg-white/5 backdrop-blur-md border border-pink-500/20 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-300">Our Mission</h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              We're here to make designing accessible for everyone — from students to social media managers.
              Novy Grafyniq's simple yet powerful tools help you create beautiful designs, fast.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Canvas Editor</h3>
                <p className="text-sm text-gray-300">Intuitive drag-and-drop interface</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Image Uploads</h3>
                <p className="text-sm text-gray-300">Import from your device instantly</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Text Tools</h3>
                <p className="text-sm text-gray-300">Custom fonts, colors & sizes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Undo/Redo</h3>
                <p className="text-sm text-gray-300">Full history control</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Cloud Save</h3>
                <p className="text-sm text-gray-300">Access designs anywhere</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Secure Auth</h3>
                <p className="text-sm text-gray-300">JWT-based authentication</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-400 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
            © {new Date().getFullYear()} Novy Grafyniq. Built with ❤️ using React, Redux, TailwindCSS, and Node.js.
          </p>
        </div>
      </div>
    </div>
  );
}
