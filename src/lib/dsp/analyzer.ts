import * as Tone from 'tone';

export class AudioAnalyzer {
  private analyzer: Tone.Analyser;
  private meter: Tone.Meter;
  private fft: Tone.FFT;
  private waveform: Tone.Waveform;
  private onsetDetector: Tone.OnsPitch;

  constructor() {
    this.analyzer = new Tone.Analyser('waveform', 2048);
    this.meter = new Tone.Meter();
    this.fft = new Tone.FFT(2048);
    this.waveform = new Tone.Waveform(2048);
    this.onsetDetector = new Tone.OnsPitch();
  }

  connect(source: Tone.ToneAudioNode) {
    source.connect(this.analyzer);
    source.connect(this.meter);
    source.connect(this.fft);
    source.connect(this.waveform);
    source.connect(this.onsetDetector);
  }

  detectBPM(): number {
    const buffer = this.waveform.getValue() as Float32Array;
    const onsets = this.detectOnsets(buffer);
    const intervals = this.calculateIntervals(onsets);
    const medianInterval = this.getMedianInterval(intervals);
    
    // Convert interval to BPM
    return medianInterval ? Math.round(60 / (medianInterval / Tone.context.sampleRate)) : 120;
  }

  private detectOnsets(buffer: Float32Array): number[] {
    const onsets: number[] = [];
    const threshold = 0.1;
    const windowSize = 1024;
    
    for (let i = windowSize; i < buffer.length - windowSize; i++) {
      const currentEnergy = this.calculateEnergy(buffer, i, windowSize);
      const previousEnergy = this.calculateEnergy(buffer, i - windowSize, windowSize);
      
      if (currentEnergy > previousEnergy * 1.5 && currentEnergy > threshold) {
        onsets.push(i);
        i += windowSize; // Skip ahead to avoid multiple detections of the same onset
      }
    }
    
    return onsets;
  }

  private calculateEnergy(buffer: Float32Array, start: number, length: number): number {
    let energy = 0;
    for (let i = start; i < start + length && i < buffer.length; i++) {
      energy += buffer[i] * buffer[i];
    }
    return energy / length;
  }

  private calculateIntervals(onsets: number[]): number[] {
    const intervals: number[] = [];
    for (let i = 1; i < onsets.length; i++) {
      intervals.push(onsets[i] - onsets[i - 1]);
    }
    return intervals;
  }

  private getMedianInterval(intervals: number[]): number {
    if (intervals.length === 0) return 0;
    
    const sorted = intervals.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  getSpectralData() {
    return {
      fft: this.fft.getValue(),
      waveform: this.waveform.getValue(),
      rms: this.meter.getValue(),
      spectralCentroid: this.calculateSpectralCentroid(this.fft.getValue() as Float32Array),
      spectralFlux: this.calculateSpectralFlux(),
      spectralRolloff: this.calculateSpectralRolloff()
    };
  }

  private calculateSpectralCentroid(fftData: Float32Array): number {
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < fftData.length; i++) {
      const magnitude = Math.abs(fftData[i]);
      numerator += magnitude * i;
      denominator += magnitude;
    }

    return numerator / denominator;
  }

  private calculateSpectralFlux(): number {
    const currentSpectrum = this.fft.getValue() as Float32Array;
    let flux = 0;
    
    for (let i = 0; i < currentSpectrum.length - 1; i++) {
      const diff = Math.abs(currentSpectrum[i + 1]) - Math.abs(currentSpectrum[i]);
      flux += diff > 0 ? diff : 0;
    }
    
    return flux;
  }

  private calculateSpectralRolloff(): number {
    const spectrum = this.fft.getValue() as Float32Array;
    const totalEnergy = spectrum.reduce((sum, value) => sum + Math.abs(value), 0);
    const threshold = totalEnergy * 0.85; // 85% of total energy
    
    let cumulative = 0;
    for (let i = 0; i < spectrum.length; i++) {
      cumulative += Math.abs(spectrum[i]);
      if (cumulative >= threshold) {
        return i / spectrum.length * (Tone.context.sampleRate / 2);
      }
    }
    
    return 0;
  }

  dispose() {
    this.analyzer.dispose();
    this.meter.dispose();
    this.fft.dispose();
    this.waveform.dispose();
    this.onsetDetector.dispose();
  }
}