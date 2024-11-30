import * as Tone from 'tone';

export class AdvancedEffectsChain {
  private bitcrusher: Tone.BitCrusher;
  private chorus: Tone.Chorus;
  private pitchShift: Tone.PitchShift;
  private autoFilter: Tone.AutoFilter;
  private tremolo: Tone.Tremolo;
  private phaser: Tone.Phaser;
  private vibrato: Tone.Vibrato;
  private feedbackDelay: Tone.FeedbackDelay;
  private reverb: Tone.Reverb;
  private compressor: Tone.Compressor;
  private chain: Tone.ToneAudioNode[];

  constructor() {
    // Initialize effects with advanced parameters
    this.bitcrusher = new Tone.BitCrusher({
      bits: 8,
      wet: 0.5
    });

    this.chorus = new Tone.Chorus({
      frequency: 4,
      delayTime: 2.5,
      depth: 0.5,
      spread: 180
    });

    this.pitchShift = new Tone.PitchShift({
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0
    });

    this.autoFilter = new Tone.AutoFilter({
      frequency: 1,
      type: "sine",
      depth: 1,
      baseFrequency: 200,
      octaves: 2.6,
      filter: {
        type: "lowpass",
        rolloff: -12,
        Q: 1
      }
    });

    this.tremolo = new Tone.Tremolo({
      frequency: 10,
      type: "sine",
      depth: 0.5,
      spread: 180
    });

    this.phaser = new Tone.Phaser({
      frequency: 15,
      octaves: 5,
      baseFrequency: 1000,
      Q: 10
    });

    this.vibrato = new Tone.Vibrato({
      maxDelay: 0.005,
      frequency: 5,
      depth: 0.1,
      type: "sine"
    });

    this.feedbackDelay = new Tone.FeedbackDelay({
      delayTime: "8n",
      feedback: 0.25,
      maxDelay: 1
    });

    this.reverb = new Tone.Reverb({
      decay: 3,
      preDelay: 0.01,
      wet: 0.3
    });

    this.compressor = new Tone.Compressor({
      threshold: -24,
      ratio: 12,
      attack: 0.003,
      release: 0.25,
      knee: 30
    });

    this.chain = [
      this.bitcrusher,
      this.chorus,
      this.pitchShift,
      this.autoFilter,
      this.tremolo,
      this.phaser,
      this.vibrato,
      this.feedbackDelay,
      this.reverb,
      this.compressor
    ];

    // Connect the chain
    this.chain.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });
  }

  connect(destination: Tone.ToneAudioNode) {
    this.chain[this.chain.length - 1].connect(destination);
  }

  updateParams(params: {
    bitDepth?: number;
    chorusFreq?: number;
    pitchShift?: number;
    filterFreq?: number;
    tremoloDepth?: number;
    phaserFreq?: number;
    vibratoDepth?: number;
    delayTime?: number;
    reverbDecay?: number;
    compression?: number;
  }) {
    if (params.bitDepth !== undefined) {
      this.bitcrusher.bits = params.bitDepth;
    }
    if (params.chorusFreq !== undefined) {
      this.chorus.frequency.value = params.chorusFreq;
    }
    if (params.pitchShift !== undefined) {
      this.pitchShift.pitch = params.pitchShift;
    }
    if (params.filterFreq !== undefined) {
      this.autoFilter.baseFrequency = params.filterFreq;
    }
    if (params.tremoloDepth !== undefined) {
      this.tremolo.depth.value = params.tremoloDepth;
    }
    if (params.phaserFreq !== undefined) {
      this.phaser.frequency.value = params.phaserFreq;
    }
    if (params.vibratoDepth !== undefined) {
      this.vibrato.depth.value = params.vibratoDepth;
    }
    if (params.delayTime !== undefined) {
      this.feedbackDelay.delayTime.value = params.delayTime;
    }
    if (params.reverbDecay !== undefined) {
      this.reverb.decay = params.reverbDecay;
    }
    if (params.compression !== undefined) {
      this.compressor.threshold.value = params.compression;
    }
  }

  start() {
    this.chorus.start();
    this.autoFilter.start();
    this.tremolo.start();
    this.phaser.start();
  }

  stop() {
    this.chorus.stop();
    this.autoFilter.stop();
    this.tremolo.stop();
    this.phaser.stop();
  }

  dispose() {
    this.chain.forEach(node => node.dispose());
  }
}