# Audio Resources

This directory contains guides for producing DMN meditation session audio files.

---

## Available Guides

### 📖 [Production Guide](./PRODUCTION-GUIDE.md)
**Complete workflow for creating session audio:**
- Text-to-speech options (ElevenLabs, Google, free alternatives)
- Recording yourself (equipment, Audacity setup)
- Mixing audio layers (voice + music + frequencies + bells)
- Export settings and file formats
- Step-by-step for complete 60-minute session

**Start here if you're creating audio for the first time.**

---

### 🎵 [Beneficial Frequencies](./BENEFICIAL-FREQUENCIES.md)
**Optional enhancement - embedding healing frequencies:**
- Binaural beats (Schumann 7.83 Hz, Theta 5 Hz)
- Solfeggio frequencies (528 Hz for heart activation)
- How to generate with Audacity or Python
- Mixing instructions and volume levels
- Research background and safety guidelines

**This is OPTIONAL** - sessions work fine without frequencies. Add this once you're comfortable with basic audio production.

---

### 🎼 [Music Recommendations](../music/MUSIC-RECOMMENDATIONS.md)
**Open-source background music:**
- Recommended sources (Incompetech, Free Music Archive, etc.)
- Specific tracks for each session phase
- Licensing and attribution requirements
- How to download and use

**Cross-reference:** Music is a component in the production workflow.

---

## Quick Start

**For your first session audio (Jan 24, 2026):**

1. **Read:** [Production Guide](./PRODUCTION-GUIDE.md)
2. **Get music:** [Music Recommendations](../music/MUSIC-RECOMMENDATIONS.md)
3. **Get scripts:** [Meditation Scripts](../meditation-scripts/)
4. **Create:** Basic session (voice + music + bells)
5. **Optional:** Add [frequencies](./BENEFICIAL-FREQUENCIES.md) later

**Don't overcomplicate it** - start with voice + music, add enhancements over time.

---

## File Organization

**Recommended structure for your audio files:**
```
resources/audio/
├── PRODUCTION-GUIDE.md          ← How to create audio
├── BENEFICIAL-FREQUENCIES.md    ← Optional frequency enhancement
├── session-files/               ← Your created session audio
│   ├── 00-grounding-5min.mp3
│   ├── 01-self-compassion-15min.mp3
│   ├── 02-loved-ones-15min.mp3
│   ├── 03-difficult-person-15min.mp3
│   └── 99-silent-30min.mp3
├── voice-recordings/            ← Raw voice files
├── music-tracks/                ← Downloaded background music
├── frequencies/                 ← Generated frequency tracks
└── bells/                       ← Bell sounds
```

**Note:** Don't commit large audio files to Git. Use Git LFS or host them separately (Google Drive, Internet Archive, etc.).

---

## Audio Production Workflow Summary

**Complete session creation:**

1. **Generate/record voice** (TTS or microphone)
2. **Download music** (from open-source sources)
3. **Generate frequencies** (optional - Audacity or Python)
4. **Mix in Audacity:**
   - Layer 1: Bell (opening)
   - Layer 2: Music (-20 to -24dB)
   - Layer 3: Frequency (-35 to -40dB, optional)
   - Layer 4: Voice (0dB, normalized)
   - Layer 5: Bells (transitions, -6dB)
5. **Export as MP3** (192 kbps)
6. **Test playback**
7. **Use in session**

**Detailed instructions in [Production Guide](./PRODUCTION-GUIDE.md).**

---

## Quality Checklist

Before using audio in sessions:

- [ ] Voice clear and audible
- [ ] Music not too loud (can easily hear voice)
- [ ] No pops, clicks, or artifacts
- [ ] Proper fade in/out
- [ ] Bells at correct moments
- [ ] Pauses appropriate length
- [ ] Total duration correct (±5 sec acceptable)
- [ ] Volume normalized (not too quiet/loud)
- [ ] Exported as 192 kbps MP3 minimum

---

## Support

**Questions about audio production?**
- Ask in [Discussions → General](https://github.com/reyblueroller/meditation-network/discussions)
- Check the detailed guides above
- Share your learnings in [Field Reports](https://github.com/reyblueroller/meditation-network/discussions/categories/field-reports)

---

## Contributing

**Have better audio files?**
- Share techniques in discussions
- Contribute improvements to guides
- Upload sample files (if high quality and properly licensed)

**Remember:** All audio must use open-source music and proper attribution.

---

*Last updated: January 2026*