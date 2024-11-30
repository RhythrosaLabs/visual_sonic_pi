import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { parameters, setParameters } = useStore();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Dark', 'Light', 'System'].map((theme) => (
                <button
                  key={theme}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Editor</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  step="1"
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Tab Size</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="2"
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Performance</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Reduce animations</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-500" />
                <span>Limit particle count</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}