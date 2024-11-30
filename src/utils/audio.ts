import * as Tone from 'tone';
import { useStore } from '../store';
import { AdvancedEffectsChain } from '../lib/dsp/effects';
import { AudioAnalyzer } from '../lib/dsp/analyzer';
import { AdvancedSequencer } from '../lib/engine/sequencer';
import { MusicTheory } from '../lib/music/theory';

let effectsChain: AdvancedEffectsChain;
let analyzer: AudioAnalyzer;
let sequencer: AdvancedSequencer;

export const setupAudio = async () => {
  try {
    await Tone.start();
    const { setAudio } = useStore.getState();

    // Create advanced effects chain
    effectsChain = new AdvancedEffectsChain();
    
    // Create synth with multiple oscillators
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'custom',
        partials: [1, 0.5, 0.3, 0.2],
      },
      envelope: {
        attack: 0.05,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8,
      },
    }).connect(effectsChain.chain[0]);

    // Initialize analyzer
    analyzer = new AudioAnalyzer();
    analyzer.connect(effectsChain.chain[effectsChain.chain.length - 1]);

    // Initialize sequencer
    sequencer = new AdvancedSequencer(synth);

    // Set up initial patterns
    const scale = MusicTheory.getScale('C4', 'minor');
    const chordProg = MusicTheory.getChordProgression('C4', ['1', '6', '4', '5']);
    
    sequencer.addPattern('melody', {
      notes: MusicTheory.generateMelody(scale, 8, {
        maxInterval: 3,
        rhythmPattern: [0.25, 0.25, 0.5, 0.25, 0.25, 0.5]
      }).map(n => n.note),
      durations: [0.25, 0.25, 0.5, 0.25, 0.25, 0.5],
      probability: 0.9
    });

    sequencer.addPattern('chords', {
      notes: chordProg,
      durations: [2, 2, 2, 2],
      velocity: 0.6
    });

    sequencer.addPattern('bass', {
      notes: ['C2', 'A1', 'F2', 'G2'],
      durations: [1, 1, 1, 1],
      euclideanLength: 8,
      euclideanFills: 3
    });

    effectsChain.connect(Tone.Destination);
    effectsChain.start();

    setAudio({
      synth,
      effects: effectsChain,
      analyzer,
      sequencer
    });

    return true;
  } catch (error) {
    console.error('Audio setup failed:', error);
    return false;
  }
};

export const startPlayback = () => {
  const { audio } = useStore.getState();
  const { sequencer } = audio;

  if (!sequencer) return;

  sequencer.startPattern('melody', '8n');
  sequencer.startPattern('chords', '1n');
  sequencer.startPattern('bass', '4n');

  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();
};

export const stopPlayback = () => {
  const { audio } = useStore.getState();
  const { sequencer } = audio;

  if (sequencer) {
    sequencer.stopPattern('melody');
    sequencer.stopPattern('chords');
    sequencer.stopPattern('bass');
  }

  Tone.Transport.stop();
  Tone.Transport.cancel();
};

export const updateAudioParameters = (name: string, value: number | string) => {
  if (!effectsChain) return;

  switch (name) {
    case 'bitDepth':
      effectsChain.updateParams({ bitDepth: value as number });
      break;
    case 'chorusFreq':
      effectsChain.updateParams({ chorusFreq: value as number });
      break;
    case 'pitchShift':
      effectsChain.updateParams({ pitchShift: value as number });
      break;
    case 'filterFreq':
      effectsChain.updateParams({ filterFreq: value as number });
      break;
    case 'tremoloDepth':
      effectsChain.updateParams({ tremoloDepth: value as number });
      break;
  }
};

export const cleanup = () => {
  if (effectsChain) {
    effectsChain.stop();
    effectsChain.dispose();
  }
  if (analyzer) {
    analyzer.dispose();
  }
  if (sequencer) {
    sequencer.dispose();
  }
};