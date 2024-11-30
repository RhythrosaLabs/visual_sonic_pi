import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const defaultCode = `// Welcome to Visual Sonic Pi Studio
use_synth :saw
live_loop :melody do
  play scale(:e3, :minor_pentatonic).choose
  sleep 0.25
end

live_loop :bass do
  play :e2, release: 0.5
  sleep 1
end`;

interface Props {
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<Props> = ({ onChange }) => {
  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
      <CodeMirror
        value={defaultCode}
        height="100%"
        theme={oneDark}
        extensions={[javascript()]}
        onChange={onChange}
        className="text-sm"
      />
    </div>
  );
};