# Beneficial Frequencies for DMN Sessions

## Overview

Embedding specific frequencies into session audio can enhance meditation depth, heart coherence, and collective field effects.

**Supported by research:**
- Binaural beats for brainwave entrainment
- Solfeggio frequencies for healing/activation
- Isochronic tones for focus
- Schumann resonance for grounding

**Important:** Keep volume subtle (-30dB to -40dB) - frequencies should be felt more than heard.

---

## Frequency Recommendations by Session Phase

### 1. Grounding (5 min)
**Primary goal:** Settle nervous system, ground presence

**Recommended frequencies:**

**Option A: Theta Binaural Beats (7.83 Hz - Schumann Resonance)**
- Earth's natural frequency
- Deep relaxation without sleepiness
- Grounding, centering effect
- Carrier: 200 Hz left, 207.83 Hz right

**Option B: Alpha Lower (8-10 Hz)**
- Calm alertness
- Present-moment awareness
- Bridge between thinking and feeling

**Best for DMN:** 7.83 Hz Schumann resonance (grounding)

---

### 2. Heart Activation (15 min)
**Primary goal:** Open heart, cultivate compassion

**Recommended frequencies:**

**Option A: 528 Hz Solfeggio (Transformation/Love)**
- Associated with heart chakra
- DNA repair frequency (claimed)
- Love, compassion, healing
- Can be pure tone or binaural

**Option B: 432 Hz (Universal Harmony)**
- "Natural tuning"
- Heart-opening, calming
- Harmonizes with nature
- Mathematical harmony

**Option C: Alpha-Theta Border (7-8 Hz binaural)**
- Deep meditation state
- Receptivity, openness
- Emotional access without overwhelm

**Best for DMN:** 528 Hz solfeggio (heart-centered focus)

---

### 3. Silent Integration (30 min)
**Primary goal:** Deep coherence, collective field

**Recommended frequencies:**

**Option A: Low Theta (4-6 Hz)**
- Deep meditation
- Collective coherence
- Subconscious integration
- Binaural: 200 Hz left, 205 Hz right (5 Hz theta)

**Option B: Schumann Resonance Harmonics**
- 7.83 Hz (fundamental)
- 14.3 Hz (2nd harmonic)
- 20.8 Hz (3rd harmonic)
- Layered for depth

**Option C: Pure Silence + Bells**
- No frequencies (some prefer this)
- Just three bells (10, 20, 30 min)
- Natural field emergence

**Best for DMN:** Low theta (5 Hz) for deep coherence

---

## How to Create Frequency Tracks

### Method 1: Free Software (Audacity)

**Generate binaural beat:**

1. Open Audacity
2. Generate → Tone
   - Waveform: Sine
   - Frequency: 200 Hz
   - Duration: 15 minutes (or session length)
3. Duplicate track (Ctrl+D)
4. Select second track
5. Effect → Change Pitch
   - Change: From 200 Hz to 205 Hz (for 5 Hz binaural)
6. Export both as stereo MP3
   - Left channel: 200 Hz
   - Right channel: 205 Hz
   - Brain perceives 5 Hz difference

**Volume:** -30dB to -40dB (very quiet, subliminal)

**Generate solfeggio (528 Hz):**

1. Generate → Tone
2. Frequency: 528 Hz
3. Amplitude: 0.03 (very quiet)
4. Duration: 15 minutes
5. Effect → Fade In/Out
6. Export as MP3

---

### Method 2: Online Generators (Easy)

**mynoise.net:**
- Free binaural/isochronic generator
- Customizable frequencies
- High quality
- Download or stream

**szynalski.com/tone-generator:**
- Simple pure tone generator
- Set to 528 Hz or 432 Hz
- Record output with Audacity

**gnaural.sourceforge.net:**
- Free, open-source
- Binaural beat generator
- Multiple frequency layers
- Presets available

---

### Method 3: Python Script (Automated)

**For advanced users - generate programmatically:**
```python
import numpy as np
from scipy.io import wavfile

def generate_binaural(freq_left, freq_right, duration_sec, sample_rate=44100, amplitude=0.03):
    """
    Generate binaural beat
    
    freq_left: Left ear frequency (Hz)
    freq_right: Right ear frequency (Hz)
    duration_sec: Duration in seconds
    amplitude: Volume (0.01-0.05 recommended for subtle effect)
    """
    t = np.linspace(0, duration_sec, int(sample_rate * duration_sec))
    
    # Generate sine waves
    left = amplitude * np.sin(2 * np.pi * freq_left * t)
    right = amplitude * np.sin(2 * np.pi * freq_right * t)
    
    # Combine to stereo
    stereo = np.array([left, right]).T
    
    # Convert to 16-bit
    stereo_int = np.int16(stereo * 32767)
    
    return stereo_int, sample_rate

# Example: 5 Hz theta binaural (30 minutes)
audio, sr = generate_binaural(
    freq_left=200, 
    freq_right=205,  # 5 Hz difference
    duration_sec=1800,  # 30 minutes
    amplitude=0.03
)

# Save
wavfile.write('theta-5hz-30min.wav', sr, audio)

# Convert to MP3 using pydub if needed
from pydub import AudioSegment
sound = AudioSegment.from_wav('theta-5hz-30min.wav')
sound.export('theta-5hz-30min.mp3', format='mp3', bitrate='192k')
```

**Run:**
```bash
pip install numpy scipy pydub
python generate_binaural.py
```

---

## Frequency Mixing with Session Audio

### In Audacity:

**Layer 1: Music** (ambient background, -20dB)  
**Layer 2: Frequency** (binaural/solfeggio, -35dB)  
**Layer 3: Voice** (guided script, 0dB)  
**Layer 4: Bells** (transitions, -6dB)

**Steps:**

1. Import all tracks
2. Align timing (frequencies start with music)
3. Adjust volumes (frequencies very quiet)
4. Export as mixed stereo MP3

**Critical:** Frequencies must be STEREO for binaural effect to work

---

## DMN Frequency Presets

### Complete Session Frequency Profile

**Grounding (5 min):**
- 7.83 Hz Schumann binaural
- Carrier: 200/207.83 Hz
- Volume: -35dB

**Heart Activation (15 min):**
- 528 Hz solfeggio pure tone
- Volume: -38dB
- OR 7 Hz alpha-theta binaural

**Silent Integration (30 min):**
- 5 Hz theta binaural
- Carrier: 200/205 Hz
- Volume: -40dB (extremely subtle)

**Sharing (10 min):**
- No frequencies (return to normal awareness)
- OR gentle 10 Hz alpha for calm clarity

---

## Research References

**Binaural beats:**
- Theta (4-8 Hz): Deep meditation, emotional processing
- Alpha (8-13 Hz): Relaxed focus, present awareness
- Schumann (7.83 Hz): Grounding, earth resonance

**Solfeggio frequencies:**
- 396 Hz: Liberation from fear
- 417 Hz: Transformation
- 528 Hz: Love, DNA repair (claimed)
- 639 Hz: Relationships, connection
- 741 Hz: Intuition
- 852 Hz: Spiritual order

**Note:** Scientific evidence for solfeggio is limited but anecdotal reports are positive.

**Heart coherence:**
- 0.1 Hz (6 breaths/min rhythm): Heart-brain coherence
- Can be embedded as slow pulse in music

---

## Cautions & Considerations

**Safety:**
- ✅ Generally safe for most people
- ⚠️ Avoid if history of seizures (flashing lights + sound)
- ⚠️ Don't use while driving or operating machinery
- ⚠️ Keep volume low (subtle, not dominant)

**Best practices:**
- Start subtle (-35dB or quieter)
- Test on yourself first
- Some people very sensitive, others don't notice
- Offer non-frequency version as alternative
- Headphones recommended (but not required for solfeggio)

**For group sessions:**
- Play through speakers (no headphones needed)
- Frequencies still effective but less precise
- Binaural beats work best with headphones
- Solfeggio/isochronic work fine through speakers

---

## Quick Start for Jan 24 Session

**Simplest approach:**

1. **Download 528 Hz tone generator:** szynalski.com/tone-generator
2. **Set to 528 Hz**
3. **Record 15 minutes** (using Audacity "Record Computer Audio")
4. **Reduce volume to -38dB** (Effect → Amplify → New Peak: -38dB)
5. **Mix with music + voice** in Audacity
6. **Export**

**Total time:** 10-15 minutes to add frequency layer

**Alternative:** Skip frequencies for first session, add later once comfortable with basic audio production.

---

## Pre-Made Frequency Tracks

**If you want ready-made files:**

**YouTube (download audio):**
- Search: "528 Hz 30 minutes"
- Use: youtube-dl or online converter
- Check: Creative Commons license

**Spotify/Apple Music:**
- Many binaural/solfeggio albums
- Can't download, but can play during session

**Recommendation:** Create your own (10 min effort) for full control and proper licensing.

---

## Testing Frequencies

**Before using in session:**

1. **Solo test:** Meditate with frequency track for 15 min
2. **Notice:** Does it enhance or distract?
3. **Adjust volume:** Too loud = annoying, too quiet = no effect
4. **Compare:** Session with vs without frequency
5. **Document:** Note subjective effects

**Sweet spot:** Frequency barely audible consciously but felt subtly

---

## Future: Advanced Frequency Layering

**As you develop:**

- **Layer multiple frequencies** (7.83 Hz + 528 Hz simultaneously)
- **Progressive frequency shift** (start 8 Hz, gradually to 5 Hz over 30 min)
- **Harmonic series** (fundamental + overtones)
- **Binaural + isochronic combined**
- **Custom frequency profiles** per script

**But start simple:** One frequency per session phase.

---