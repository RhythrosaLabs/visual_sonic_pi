import { create } from 'zustand';
import { AudioState, VisualizerState, Parameters } from '../types';

interface Store {
  audio: AudioState;
  visualizer: VisualizerState;
  parameters: Parameters;
  setAudio: (audio: Partial<AudioState>) => void;
  setVisualizer: (visualizer: Partial<VisualizerState>) => void;
  setParameters: (parameters: Partial<Parameters>) => void;
}

export const useStore = create<Store>((set) => ({
  audio: {
    isPlaying: false,
    isRecording: false,
    mediaRecorder: null,
    chunks: [],
    synth: null,
    effects: {
      reverb: null,
      delay: null,
      distortion: null,
      filter: null,
    },
  },
  visualizer: {
    particles: [],
    animationId: null,
  },
  parameters: {
    reverb: 0.1,
    delay: 0,
    distortion: 0,
    filter: 20000,
    particleCount: 5,
    particleSize: 2,
    particleSpeed: 2,
    visualMode: 'particles',
    colorScheme: 'rainbow',
    trailLength: 0.1,
  },
  setAudio: (audio) =>
    set((state) => ({ audio: { ...state.audio, ...audio } })),
  setVisualizer: (visualizer) =>
    set((state) => ({ visualizer: { ...state.visualizer, ...visualizer } })),
  setParameters: (parameters) =>
    set((state) => ({ parameters: { ...state.parameters, ...parameters } })),
}));