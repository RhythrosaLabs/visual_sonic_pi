import * as Tone from 'tone';
import { MusicTheory } from '../music/theory';

export class AdvancedSequencer {
  private sequences: Map<string, Tone.Sequence>;
  private patterns: Map<string, any[]>;
  private synth: Tone.PolySynth;
  private key: string;
  private scale: string[];

  constructor(synth: Tone.PolySynth) {
    this.sequences = new Map();
    this.patterns = new Map();
    this.synth = synth;
    this.key = 'C4';
    this.scale = MusicTheory.getScale(this.key, 'minor');
  }

  addPattern(name: string, {
    notes,
    durations,
    velocity = 0.8,
    probability = 1,
    euclideanLength,
    euclideanFills
  }: {
    notes: string[];
    durations: number[];
    velocity?: number;
    probability?: number;
    euclideanLength?: number;
    euclideanFills?: number;
  }) {
    let pattern;

    if (euclideanLength && euclideanFills) {
      pattern = this.generateEuclideanRhythm(notes, euclideanLength, euclideanFills);
    } else {
      pattern = notes.map((note, i) => ({
        note,
        duration: durations[i % durations.length],
        velocity,
        probability
      }));
    }

    this.patterns.set(name, pattern);
  }

  startPattern(name: string, interval = '8n') {
    if (!this.patterns.has(name)) return;

    const pattern = this.patterns.get(name)!;
    const sequence = new Tone.Sequence(
      (time, event) => {
        if (event && Math.random() < event.probability) {
          this.synth.triggerAttackRelease(
            event.note,
            event.duration,
            time,
            event.velocity
          );
        }
      },
      pattern,
      interval
    ).start(0);

    this.sequences.set(name, sequence);
  }

  stopPattern(name: string) {
    const sequence = this.sequences.get(name);
    if (sequence) {
      sequence.stop();
      sequence.dispose();
      this.sequences.delete(name);
    }
  }

  setKey(newKey: string) {
    this.key = newKey;
    this.scale = MusicTheory.getScale(this.key, 'minor');
    // Update all patterns to the new key
    this.patterns.forEach((pattern, name) => {
      const transposed = pattern.map((event: any) => ({
        ...event,
        note: MusicTheory.transpose([event.note], this.getInterval(this.key, newKey))[0]
      }));
      this.patterns.set(name, transposed);
    });
  }

  private generateEuclideanRhythm(notes: string[], length: number, fills: number) {
    const pattern = [];
    const bucket = fills;
    let total = 0;

    for (let i = 0; i < length; i++) {
      total += bucket;
      if (total >= length) {
        total -= length;
        pattern.push({
          note: notes[i % notes.length],
          duration: '16n',
          velocity: 0.8,
          probability: 1
        });
      } else {
        pattern.push(null);
      }
    }

    return pattern;
  }

  private getInterval(note1: string, note2: string): number {
    return Tone.Frequency(note2).toMidi() - Tone.Frequency(note1).toMidi();
  }

  dispose() {
    this.sequences.forEach(sequence => {
      sequence.stop();
      sequence.dispose();
    });
    this.sequences.clear();
    this.patterns.clear();
  }
}