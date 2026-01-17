# Audio Production Guide

## Overview

Create complete 60-minute session audio files for DMN practice.

**Components:**
1. Voice (guided scripts)
2. Music (background ambience)
3. Bells (transition markers)
4. Silent periods (with optional minimal music)

## Option 1: Text-to-Speech (Fastest)

### Recommended TTS Services

**Free:**
- Google Cloud TTS (300 chars/month free)
- Microsoft Azure TTS (5M chars free first month)
- Natural Reader (online, limited free)

**Paid (Best Quality):**
- ElevenLabs ($5-22/month) - Most natural
- Play.ht ($19/month) - Very good
- Murf.ai ($19/month) - Professional

### Using ElevenLabs (Recommended)

1. Sign up: elevenlabs.io
2. Choose voice: "Aria" or "Rachel" (calm, warm)
3. Settings: Stability 50%, Clarity 75%
4. Paste script with [PAUSE: Xs] markers
5. Generate and download MP3

**Manual pauses:**
- ElevenLabs doesn't read [PAUSE] markers
- Remove them, record in sections
- Add pauses in editing (Audacity)

### Using Google Cloud TTS (Free)

**Setup:**
```bash
# Install Google Cloud CLI
# Follow: cloud.google.com/sdk/docs/install

# Enable TTS API
gcloud services enable texttospeech.googleapis.com

# Install Python library
pip install google-cloud-texttospeech
```

**Create tts_script.py:**
```python
from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()

# Load your script
with open('scripts/00-grounding-5min.md', 'r') as f:
    text = f.read()
    # Remove markdown and pause markers
    # Keep only spoken text

input_text = texttospeech.SynthesisInput(text=text)

voice = texttospeech.VoiceSelectionParams(
    language_code="en-US",
    name="en-US-Neural2-F",  # Female, warm
    # or "en-US-Neural2-A" for different tone
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    speaking_rate=0.85,  # Slower than normal
    pitch=-2.0,  # Slightly lower
)

response = client.synthesize_speech(
    input=input_text,
    voice=voice,
    audio_config=audio_config
)

with open("output/grounding-voice.mp3", "wb") as out:
    out.write(response.audio_content)
```

**Run:**
```bash
python tts_script.py
```

## Option 2: Record Yourself

### Equipment Needed
- USB microphone ($30-100) OR
- Good phone/laptop mic
- Quiet room (minimal echo)
- Audacity (free software)

### Recording Setup

**Audacity settings:**
- Sample rate: 44100 Hz
- Bit depth: 16-bit
- Mono (1 channel) for voice

**Recording tips:**
- Sit comfortably, good posture
- Speak slower than normal (pace yourself)
- Warm, calm tone (not performance voice)
- Record in sections if needed
- Leave 5-10 sec between takes for editing

### How to Record in Audacity

1. **Download Audacity:** audacityteam.org
2. **Set input device:**
   - Transport → Transport Options → Recording
   - Select your microphone
3. **Test levels:**
   - Click red record button briefly
   - Waveform should peak around -12dB to -6dB
   - Adjust input volume if too quiet/loud
4. **Record script:**
   - Read naturally, slowly
   - Pause at [PAUSE: Xs] markers (count in your head)
   - Stop if you make a mistake
   - Mark the spot, continue from before the error
5. **Edit mistakes:**
   - Select bad section
   - Delete
   - Use Generate → Silence to add pauses
6. **Normalize:**
   - Select all (Ctrl+A)
   - Effect → Normalize
   - Check "Remove DC offset"
   - Peak amplitude: -1.0 dB

## Mixing Audio (Audacity)

### Install Audacity
- Download: audacityteam.org
- Free, cross-platform
- Open source

### Basic Mixing Workflow

**Step 1: Import Components**
File → Import → Audio

```
voice.mp3 (your recording)
music.mp3 (background music)
bell-open.mp3
bell-close.mp3
```

**Step 2: Arrange Tracks**
```
Track 1: Bell (opening)
Track 2: Music (starts at 0:02, fade in 2sec)
Track 3: Voice (starts at 0:05)
Track 4: Bell (closing, at end)
```

**Step 3: Adjust Volumes**
- Music: -20dB to -24dB (quiet under voice)
- Voice: 0dB (normalize first: Effect → Normalize)
- Bells: -6dB (clear but not jarring)

**To adjust volume:**
- Select track
- Effect → Amplify
- Enter negative value (e.g., -20 dB)

**Step 4: Add Fades**
- Select music start → Effect → Fade In
- Select music end → Effect → Fade Out

**Step 5: Export**
- File → Export → Export as MP3
- Settings: 192 kbps (good quality, reasonable size)

### Detailed Mixing Example

**Creating 5-minute grounding track:**

1. **Import bell:**
   - File → Import → Audio → `bell-opening.mp3`
   - Appears as Track 1

2. **Import music:**
   - File → Import → Audio → `meditation-music.mp3`
   - Appears as Track 2
   - Use Time Shift Tool (←→) to move music to 0:02

3. **Add fade to music:**
   - Select first 2 seconds of music
   - Effect → Fade In
   - Select from 4:50 to 5:00
   - Effect → Fade Out

4. **Reduce music volume:**
   - Click track name → Select All
   - Effect → Amplify → -20 dB

5. **Import voice:**
   - File → Import → Audio → `grounding-voice.mp3`
   - Appears as Track 3
   - Time Shift Tool → move to 0:05

6. **Normalize voice:**
   - Select voice track
   - Effect → Normalize (-1.0 dB)

7. **Add closing bell:**
   - File → Import → Audio → `bell-close.mp3`
   - Time Shift Tool → move to 4:55 (or end of voice)

8. **Preview:**
   - Select all tracks
   - Press Space to play
   - Adjust volumes if needed

9. **Export:**
   - File → Export → Export as MP3
   - Filename: `00-grounding-5min.mp3`
   - Quality: 192 kbps

## Python Mixing Script (Advanced)

If you want to automate mixing:

**Install pydub:**
```bash
pip install pydub
```

**Note:** Requires ffmpeg:
- Windows: Download from ffmpeg.org
- Mac: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

**Create mix_session.py:**
```python
from pydub import AudioSegment

# Load files
music = AudioSegment.from_mp3("music/ambient.mp3")
voice = AudioSegment.from_mp3("voice/grounding.mp3")
bell_open = AudioSegment.from_mp3("bells/opening.mp3")
bell_close = AudioSegment.from_mp3("bells/closing.mp3")

# Adjust volumes (in dB)
music = music - 20  # Reduce 20dB
bell_open = bell_open - 6
bell_close = bell_close - 6

# Start with opening bell
output = bell_open

# Add music with fade in (starts 2sec after bell)
music_faded = music.fade_in(2000).fade_out(3000)
output = output.overlay(music_faded, position=2000)

# Add voice (starts 5sec after bell)
output = output.overlay(voice, position=5000)

# Add closing bell at end
voice_end = 5000 + len(voice)
output = output.overlay(bell_close, position=voice_end)

# Continue music for 3 more seconds
output = output[:voice_end + 3000]

# Export
output.export("output/grounding-5min.mp3", format="mp3", bitrate="192k")

print(f"Exported: output/grounding-5min.mp3")
print(f"Duration: {len(output) / 1000:.1f} seconds")
```

**Run:**
```bash
python mix_session.py
```

## Creating Bell Sounds

### Option 1: Find Free Bells

**Sources:**
- Freesound.org (search "singing bowl" or "meditation bell")
- Pixabay (sound effects section)
- YouTube Audio Library

**What to look for:**
- 2-4 second duration
- Natural decay
- Not harsh or jarring
- 396-528 Hz range

### Option 2: Generate in Audacity

1. Generate → Tone
2. Waveform: Sine
3. Frequency: 528 Hz
4. Amplitude: 0.5
5. Duration: 3 seconds
6. Effect → Fade Out (from 0.5sec to 3sec)
7. Export as `bell.mp3`

**Make it richer:**
- Generate 3 tones: 528 Hz, 660 Hz, 792 Hz
- Mix them
- Apply fade out
- Creates harmonious bell-like sound

## Complete Session Assembly

### For 60-Minute Session

**Method A: Single File**
- Mix all components into one 60-min MP3
- Advantage: Simple playback
- Disadvantage: Can't swap components

**Method B: Modular Files**
```
00-grounding-5min.mp3
01-self-compassion-15min.mp3
02-loved-ones-15min.mp3
03-difficult-person-15min.mp3
99-silent-integration-30min.mp3
```
- Play sequentially
- Advantage: Can mix and match scripts
- Disadvantage: Requires manual switching

**Method C: Playlist**
Create `.m3u` playlist file:

```
#EXTM3U
#EXTINF:300,Grounding Practice
00-grounding-5min.mp3
#EXTINF:900,Self-Compassion
01-self-compassion-15min.mp3
#EXTINF:1800,Silent Integration
99-silent-integration-30min.mp3
```

Save as `session-2026-01-24.m3u`, open in VLC or any media player.

**Recommendation:** Start with Method B (modular), easier to iterate.

## File Naming Convention

```
00-grounding-5min.mp3
01-self-compassion-15min.mp3
02-loved-ones-15min.mp3
03-difficult-person-15min.mp3
99-silent-integration-30min.mp3
```

**Template:**
`[number]-[name]-[duration].mp3`

## Creating Silent Integration Track

### Option 1: Bells Only

**In Audacity:**
1. Generate → Silence → 30 minutes
2. Import bell.mp3 at 0:00
3. Copy bell, paste at 10:00, 20:00, 30:00
4. Export as `99-silent-integration-30min.mp3`

### Option 2: Minimal Ambient + Bells

1. Generate → Tone → Sine wave
   - Frequency: 432 Hz
   - Amplitude: 0.1
   - Duration: 30 minutes
2. Effect → Fade In (5 sec)
3. Effect → Fade Out (5 sec)
4. Import bells at 0:00, 10:00, 20:00, 30:00
5. Export

### Option 3: Music Loop + Bells

1. Import 5-minute ambient track
2. Loop it 6 times (30 minutes total)
3. Reduce volume to -24dB
4. Add crossfades between loops
5. Import bells at intervals
6. Export

## Quality Checklist

Before using audio in sessions:

- [ ] Voice is clear and audible
- [ ] Music not too loud (can hear voice easily)
- [ ] No pops, clicks, or audio artifacts
- [ ] Proper fade in/out
- [ ] Bells at correct moments
- [ ] Pauses are appropriate length
- [ ] Total duration correct (±5 sec acceptable)
- [ ] Volume normalized (not too quiet/loud)
- [ ] Exported as 192kbps MP3 minimum
- [ ] Test on different devices (phone, laptop, speakers)

## Common Issues & Fixes

### Voice Too Quiet
- Select voice track
- Effect → Normalize → -1.0 dB
- Or Effect → Amplify → +3 dB

### Music Too Loud
- Select music track
- Effect → Amplify → -20 dB (or lower)
- Test: Can you clearly hear every word?

### Pops/Clicks at Edits
- Zoom in to edit point
- Use Edit → Find Clipping
- Apply Effect → Crossfade Tracks
- Or add tiny fade in/out at edit points

### Bell Too Harsh
- Reduce bell volume: Effect → Amplify → -10 dB
- Or use different bell sound
- Apply Effect → Fade Out to soften

### File Too Large
- Export at lower bitrate (128 kbps still okay for voice)
- Convert to mono if stereo
- Trim any silence at beginning/end

## First Session Quick Start

**For Jan 24 session:**

1. **Download music:**
   - Go to incompetech.com
   - Download "Meditation Impromptu 01" (grounding)
   - Download "Meditation Impromptu 02" (heart)

2. **Create or record voice:**
   - Use TTS or record yourself
   - Read grounding script (5 min)
   - Read self-compassion script (15 min)

3. **Mix in Audacity:**
   - Import music, reduce to -20dB
   - Import voice
   - Add opening/closing bells
   - Export each track

4. **Create silence track:**
   - 30 minutes
   - Bells at 0, 10, 20, 30 minutes
   - Export

5. **Test playback:**
   - Play through on your device
   - Adjust volumes if needed
   - Verify timing

**Don't aim for perfect - aim for functional.**

You can improve audio quality over time.

## Storage & Organization

```
resources/
  audio/
    raw/
      voice/
        grounding-take1.mp3
        grounding-take2.mp3
      music/
        ambient-track1.mp3
      bells/
        opening-bell.mp3
        interval-bell.mp3
        closing-bell.mp3
    mixed/
      00-grounding-5min.mp3
      01-self-compassion-15min.mp3
      99-silent-integration-30min.mp3
    playlists/
      session-2026-01-24.m3u
```

## Sharing Audio Files

### File Size Considerations
- 5-minute track at 192kbps: ~7 MB
- 15-minute track: ~21 MB
- 30-minute track: ~42 MB
- Full 60-min session: ~85 MB

### Distribution Options

**Option 1: Git LFS (Large File Storage)**
```bash
# Install Git LFS
git lfs install

# Track audio files
git lfs track "*.mp3"
git add .gitattributes
git commit -m "Track audio files with LFS"

# Add and commit audio
git add resources/audio/mixed/*.mp3
git commit -m "Add session audio files"
git push
```

**Option 2: Cloud Storage**
- Google Drive (free 15GB)
- Dropbox (free 2GB)
- Archive.org (free, unlimited)

**Option 3: Self-host**
- Upload to personal server
- Link in README
- Or embed in GitHub Pages

**Recommendation for DMN:**
- Use Git LFS for small files (<25MB)
- Use Archive.org for full sessions
- Provide links in documentation

## Advanced: Batch Processing

Create multiple session variations:

**create_sessions.sh:**
```bash
#!/bin/bash

# Array of scripts
scripts=(
  "self-compassion"
  "loved-ones"
  "difficult-person"
)

# Generate each version
for script in "${scripts[@]}"; do
  echo "Creating session: $script"
  python mix_session.py --script "$script"
done

echo "All sessions created!"
```

## Further Learning

**Audacity tutorials:**
- Official manual: manual.audacityteam.org
- YouTube: "Audacity meditation audio tutorial"

**Audio production basics:**
- Understanding dB (decibels)
- Normalization vs compression
- Fade curves
- EQ for voice clarity

**TTS quality:**
- Experiment with different voices
- Adjust speaking rate (slower = more meditative)
- Try pitch adjustments
- Use SSML tags for pauses (if supported)

## Support

- **Audacity Forum:** forum.audacityteam.org
- **Reddit:** r/audacity, r/audioengineering
- **GitHub Issues:** meditation-network repo

---

**Start simple. Improve iteratively. The practice is more important than perfect audio.**
