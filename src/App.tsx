import React from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Controls } from './components/Controls';
import { Parameters } from './components/Parameters';
import { Visualizer } from './components/Visualizer';
import { Music, Settings, Info } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useStore } from './store';

function App() {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
              <CodeEditor onChange={(value) => console.log(value)} />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowSidebar(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
              
              <button
                onClick={() => window.open('/docs/FAQ.md', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Info size={16} />
                <span>Documentation</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 h-[400px]">
              <Visualizer />
              <Controls />
            </div>
            
            <Parameters />
          </div>
        </div>
      </main>

      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}

export default App;