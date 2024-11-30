# Visual Sonic Pi Studio Coding Dictionary

## Music Theory Concepts

### Notes and Scales
```ruby
# Note Names
:c4  # Middle C
:e3  # E in third octave
:g5  # G in fifth octave

# Scale Types
:major          # Major scale
:minor          # Natural minor scale
:harmonic_minor # Harmonic minor scale
:melodic_minor  # Melodic minor scale
:pentatonic     # Major pentatonic
:blues          # Blues scale
```

### Chords
```ruby
# Basic Chords
chord(:c4, :major)     # C major triad
chord(:a3, :minor)     # A minor triad
chord(:g3, :dominant7) # G dominant 7th

# Chord Progressions
progression = [:i, :iv, :v]  # Common progression
```

### Rhythm
```ruby
# Duration Values
1     # Whole note
0.5   # Half note
0.25  # Quarter note
0.125 # Eighth note

# Time Signatures
time_signature = [4, 4]  # 4/4 time
time_signature = [3, 4]  # 3/4 time
```

## Audio Programming

### Synthesis
```ruby
# Oscillator Types
use_synth :saw      # Sawtooth wave
use_synth :sine     # Sine wave
use_synth :square   # Square wave
use_synth :tri      # Triangle wave

# Envelope Parameters
attack: 0.1    # Attack time
decay: 0.2     # Decay time
sustain: 0.5   # Sustain level
release: 1     # Release time
```

### Effects
```ruby
# Effect Types
with_fx :reverb do    # Reverberation
with_fx :echo do      # Echo/delay
with_fx :distortion do # Distortion
with_fx :lpf do       # Low-pass filter
with_fx :hpf do       # High-pass filter

# Effect Parameters
room: 0.8       # Reverb room size
mix: 0.5        # Wet/dry mix
decay: 2        # Effect decay time
cutoff: 100     # Filter cutoff
resonance: 0.3  # Filter resonance
```

### Control
```ruby
# Amplitude
amp: 0.5        # Volume (0-1)
pan: -1         # Stereo position (-1 to 1)

# Modulation
mod_range: 12   # Modulation range
mod_phase: 0.25 # Modulation phase
```

## Advanced Techniques

### Pattern Generation
```ruby
# Euclidean Rhythms
spread(3, 8)    # Distribute 3 hits over 8 steps
ring(1,0,1,0)   # Create repeating pattern

# Randomization
rrand(60, 72)   # Random value between 60-72
choose([1,2,3]) # Random selection from array
shuffle(scale)  # Randomize scale order
```

### Live Coding
```ruby
# Live Loop Control
live_loop :name do
  sync :other_loop  # Synchronize with other loop
  cue :event       # Trigger event
  stop             # Stop current loop
end

# Pattern Manipulation
.reverse    # Reverse pattern
.rotate     # Rotate pattern
.take(n)    # Take first n elements
.drop(n)    # Drop first n elements
```

### Signal Processing
```ruby
# Analysis
current_bpm           # Get current tempo
current_random_seed   # Get random seed
current_sample_rate   # Get sample rate

# Control
use_bpm 120          # Set tempo
use_random_seed 42   # Set random seed
use_sample_rate 44100 # Set sample rate
```

## Visual Programming

### Particle System
```typescript
interface Particle {
  x: number;          // X position
  y: number;          // Y position
  color: string;      // Color (HSL)
  size: number;       // Size in pixels
  speedX: number;     // Horizontal velocity
  speedY: number;     // Vertical velocity
  life: number;       // Lifetime (0-1)
  rotation: number;   // Rotation angle
}
```

### Color Mapping
```typescript
// Frequency to Color
const hue = (frequency / 20000) * 360;
const color = `hsl(${hue}, 70%, 60%)`;

// Amplitude to Brightness
const brightness = amplitude * 100;
const color = `hsl(${hue}, 70%, ${brightness}%)`;
```

### Animation
```typescript
// Frame Update
function animate() {
  // Clear with trail effect
  ctx.fillStyle = `rgba(0, 0, 0, ${1 - trailLength})`;
  ctx.fillRect(0, 0, width, height);
  
  // Update particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}
```