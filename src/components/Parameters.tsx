import React from 'react';
import { useStore } from '../store';
import { Sliders } from 'lucide-react';

export const Parameters: React.FC = () => {
  const { parameters, setParameters } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'visualMode' || name === 'colorScheme' ? value : parseFloat(value);
    setParameters({ [name]: numValue });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-4">
        <Sliders size={16} className="text-indigo-500" />
        <h2 className="text-lg font-semibold">Parameters</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(parameters).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm text-gray-400 block">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            {typeof value === 'number' ? (
              <input
                type="range"
                name={key}
                min={0}
                max={key.includes('Frequency') ? 20000 : 1}
                step={key.includes('Frequency') ? 100 : 0.01}
                value={value}
                onChange={handleChange}
                className="w-full accent-indigo-500"
              />
            ) : (
              <select
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm"
              >
                {key === 'visualMode' ? (
                  <>
                    <option value="particles">Particles</option>
                    <option value="waves">Waves</option>
                    <option value="spectrum">Spectrum</option>
                  </>
                ) : (
                  <>
                    <option value="rainbow">Rainbow</option>
                    <option value="monochrome">Monochrome</option>
                    <option value="neon">Neon</option>
                  </>
                )}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};