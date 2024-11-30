import React from 'react';
import { Music, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Music size={32} className="text-indigo-500" />
            <div>
              <h1 className="text-2xl font-bold">Visual Sonic Pi Studio</h1>
              <p className="text-sm text-gray-400">Create music with code</p>
            </div>
          </div>
          
          <a
            href="https://github.com/yourusername/visual-sonic-pi-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}