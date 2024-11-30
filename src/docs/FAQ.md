# Visual Sonic Pi Studio FAQ

## Getting Started

### What is Visual Sonic Pi Studio?
Visual Sonic Pi Studio is a browser-based music creation environment that combines code-based music composition with real-time visualization. It allows you to create music through programming while seeing your compositions come to life visually.

### How do I start making music?
1. Click the play button to start
2. Edit the code in the editor
3. Use the parameter controls to adjust effects
4. Watch the visualizations react to your music

## Music Programming

### Basic Commands

```ruby
# Play a single note
play :c4

# Play a chord
play_chord [:c4, :e4, :g4]

# Create a loop
live_loop :name do
  play :e3
  sleep 0.5
end

# Add effects
with_fx :reverb do
  play :g4
end
```

### Advanced Techniques

```ruby
# Randomization
use_random_seed 42
notes = scale(:e3, :minor_pentatonic)
play notes.choose

# Arpeggios
play_pattern_timed [:c4, :e4, :g4], [0.25]

# Chord Progressions
progression = chord_progression_names[0..3]
progression.each do |chord|
  play_chord chord_degree(chord, :c4, :major)
  sleep 1
end
```

## Audio Effects

### Available Effects

1. **Bitcrusher**
   - Reduces bit depth for lo-fi sound
   - Range: 1-16 bits

2. **Chorus**
   - Creates a shimmering, ensemble effect
   - Frequency: 0.1-20 Hz
   - Depth: 0-1

3. **Pitch Shift**
   - Transposes audio up/down
   - Range: -12 to +12 semitones

4. **Auto Filter**
   - Frequency-based filtering
   - Base: 20-20000 Hz
   - Q Factor: 0.1-10

5. **Tremolo**
   - Amplitude modulation
   - Speed: 0.1-20 Hz
   - Depth: 0-1

## Visual Effects

### Visualization Modes

1. **Particles**
   - Dynamic particles react to music
   - Color mapped to pitch
   - Size mapped to velocity
   - Movement mapped to rhythm

2. **Waves**
   - Waveform visualization
   - Color intensity mapped to amplitude
   - Wave shape mapped to frequency content

3. **Spectrum**
   - Real-time frequency analysis
   - Height mapped to frequency magnitude
   - Color mapped to frequency range

### Parameters

- **Particle Count**: Number of particles per note
- **Trail Length**: Duration of particle trails
- **Color Scheme**: Visual color palette
- **Visual Mode**: Visualization style
- **Particle Size**: Size of individual particles
- **Particle Speed**: Movement speed of particles

## Troubleshooting

### Common Issues

1. **No Sound**
   - Check browser audio permissions
   - Click anywhere on the page first
   - Ensure volume is not muted

2. **Performance Issues**
   - Reduce particle count
   - Switch to simpler visualization mode
   - Close other browser tabs

3. **Recording Problems**
   - Grant necessary permissions
   - Ensure sufficient storage space
   - Use supported browser (Chrome/Firefox)

### Browser Support

- Chrome (recommended)
- Firefox
- Safari (limited WebAudio support)
- Edge (Chromium-based)