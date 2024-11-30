export interface Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  gravity: number;
  rotation: number;
  rotationSpeed: number;
}

export interface AudioState {
  isPlaying: boolean;
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  chunks: Blob[];
  synth: any;
  effects: {
    reverb: any;
    delay: any;
    distortion: any;
    filter: any;
  };
}

export interface VisualizerState {
  particles: Particle[];
  animationId: number | null;
}

export interface Parameters {
  reverb: number;
  delay: number;
  distortion: number;
  filter: number;
  particleCount: number;
  particleSize: number;
  particleSpeed: number;
  visualMode: 'particles' | 'waves' | 'spectrum';
  colorScheme: 'rainbow' | 'monochrome' | 'neon';
  trailLength: number;
}