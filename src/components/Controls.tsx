import React from 'react';
import { Play, Square, Circle, Save, Maximize } from 'lucide-react';
import { useStore } from '../store';
import { setupAudio, startPlayback, stopPlayback } from '../utils/audio';

export const Controls: React.FC = () => {
  const { audio, setAudio } = useStore();
  const { isPlaying, isRecording } = audio;

  const handlePlay = async () => {
    if (!audio.synth) {
      const success = await setupAudio();
      if (!success) return;
    }

    if (!isPlaying) {
      startPlayback();
      setAudio({ isPlaying: true });
    } else {
      stopPlayback();
      setAudio({ isPlaying: false });
    }
  };

  const handleRecord = () => {
    if (!isRecording) {
      const stream = document.querySelector('canvas')?.captureStream(30);
      if (!stream) return;

      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        setAudio({ chunks });
      };

      mediaRecorder.start();
      setAudio({ isRecording: true, mediaRecorder, chunks: [] });
    } else {
      audio.mediaRecorder?.stop();
      setAudio({ isRecording: false, mediaRecorder: null });
    }
  };

  const handleExport = () => {
    if (!audio.chunks.length) return;

    const blob = new Blob(audio.chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sonic-pi-studio-recording.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFullscreen = () => {
    const visualizer = document.querySelector('.visualizer');
    if (!document.fullscreenElement && visualizer instanceof HTMLElement) {
      visualizer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={handlePlay}
        className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        title={isPlaying ? 'Stop' : 'Play'}
      >
        {isPlaying ? <Square size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={handleRecord}
        className={`p-2 rounded-lg transition-colors ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        title="Record"
      >
        <Circle size={20} className={isRecording ? 'animate-pulse' : ''} />
      </button>
      <button
        onClick={handleExport}
        className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!audio.chunks.length}
        title="Export"
      >
        <Save size={20} />
      </button>
      <button
        onClick={handleFullscreen}
        className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        title="Toggle Fullscreen"
      >
        <Maximize size={20} />
      </button>
    </div>
  );
};