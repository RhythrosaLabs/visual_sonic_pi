import { Scale, Chord, Note } from 'tonal';

export class MusicTheory {
  static getScale(root: string, type: string): string[] {
    return Scale.get(`${root} ${type}`).notes;
  }

  static getChordProgression(key: string, progression: string[]): string[] {
    const scale = Scale.get(`${key} major`);
    return progression.map(degree => {
      const chordRoot = scale.notes[parseInt(degree) - 1];
      return Chord.getChord('', chordRoot).notes;
    }).flat();
  }

  static getArpeggio(chord: string[], pattern: number[]): string[] {
    return pattern.map(idx => chord[idx % chord.length]);
  }

  static transpose(notes: string[], semitones: number): string[] {
    return notes.map(note => Note.transpose(note, semitones));
  }

  static generateMelody(scale: string[], length: number, rules: {
    maxInterval?: number;
    rhythmPattern?: number[];
  } = {}): { note: string; duration: number }[] {
    const melody = [];
    let currentIndex = 0;

    for (let i = 0; i < length; i++) {
      const maxJump = rules.maxInterval || 3;
      const possibleMoves = [-2, -1, 0, 1, 2].filter(move => {
        const newIndex = currentIndex + move;
        return newIndex >= 0 && newIndex < scale.length;
      });

      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      currentIndex += move;
      
      const duration = rules.rhythmPattern ? 
        rules.rhythmPattern[i % rules.rhythmPattern.length] :
        [0.25, 0.5, 1][Math.floor(Math.random() * 3)];

      melody.push({
        note: scale[currentIndex],
        duration
      });
    }

    return melody;
  }
}