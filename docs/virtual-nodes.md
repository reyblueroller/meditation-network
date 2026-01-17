# Virtual Nodes Guide

How to run effective online meditation sessions in the Distributed Meditation Network.

## Why Virtual Nodes?

**Benefits:**
- Accessible to remote/rural practitioners
- Weather-independent
- Timezone flexibility
- Lower barrier to starting
- Easy to scale

**Challenges:**
- Less energetic coherence than in-person
- Technical issues
- Screen fatigue
- Harder to build community

Virtual nodes are valid DMN nodes - not second-class.

## Platform Choices

### Recommended: Jitsi Meet

**Pros:**
- Free and open-source
- No account required
- End-to-end encryption option
- No time limits
- Simple: meet.jit.si/your-room-name

**Cons:**
- Occasional connection issues
- Limited moderation tools
- Video quality varies

### Alternative: Zoom

**Pros:**
- Stable connection
- Good moderation tools
- Familiar to most people
- Breakout rooms for sharing

**Cons:**
- Requires account
- Free tier has 40-minute limit
- Not open-source
- Privacy concerns for some

### Alternative: Discord/Element

**Pros:**
- Community features
- Persistent space
- Text channels for coordination
- Open-source (Element)

**Cons:**
- More complex setup
- Requires accounts
- Can feel less formal

### Choose Based On:

- **Simplicity**: Jitsi (no accounts needed)
- **Stability**: Zoom (most reliable)
- **Community**: Discord/Element (ongoing coordination)

## Setup Guide

### 1. Technical Setup

**Required:**
- Stable internet connection
- Webcam (optional but recommended)
- Microphone (essential)
- Quiet, private space

**Recommended:**
- Headphones (reduces echo)
- Good lighting
- Neutral background
- Timer visible to you

### 2. Virtual Room Setup

**Create your meeting room:**

**For Jitsi:**
```
URL: https://meet.jit.si/dmn-[yourcity]-[number]
Example: https://meet.jit.si/dmn-sydney-001
```

**Room settings:**
- Disable: "Everyone starts muted" (creates awkward first moments)
- Enable: "Everyone follows me" if screen sharing timer
- Set password: Optional (reduces random joiners)

### 3. Session Structure

**5 minutes before:**
- Join room
- Test audio/video
- Have timer ready
- Mute yourself

**Start of session:**
- Greet arrivals (before official start)
- At session time: brief welcome
- Share timer screen OR use synchronized timer
- Begin practice

**During practice:**
- All mute
- Video optional (some prefer cameras off)
- Share timer screen if helpful
- No recording (privacy)

**End of session:**
- Unmute for sharing circle (optional)
- Keep to time limits
- No teaching/advice giving

### 4. Timer Options

**Option A: Screen share timer**
- Use [DMN session timer](../tools/session-timer/)
- Share your screen
- Participants mute and watch

**Option B: Synchronized start**
- Everyone uses their own timer
- Count down together: "3, 2, 1, begin"
- Less bandwidth intensive

**Option C: Audio cues only**
- No screen share
- Facilitator unmutes for bells
- In between: all muted

## Best Practices

### Before Sessions

**Consistency:**
- Same URL every session
- Same day/time weekly
- Post session link in node YAML file
- Send reminder 24 hours before

**Communication:**
- How to join
- Mute/unmute conventions
- Camera on/off norms
- Technical backup plan

### During Sessions

**Technical smoothness:**
- Join 10 minutes early
- Have phone backup ready
- Use "push to talk" if background noise
- Keep video off if bandwidth issues

**Maintaining practice focus:**
- Minimize chat during practice
- Use "raise hand" for emergencies only
- Keep muted except sharing time
- No side conversations

### After Sessions

**Community building:**
- Optional: stay on for casual chat
- Use text channel for async coordination
- Share session recordings? (get consent first)
- Gather feedback periodically

## Common Challenges

### Challenge: "It feels impersonal"

**Solutions:**
- Keep cameras on during sharing
- Smaller groups (4-6 max for virtual)
- Regular attendance builds connection
- Pre-session brief chat time

### Challenge: "Technical issues derail practice"

**Solutions:**
- Have backup communication channel
- Simple tech stack
- Written backup instructions
- Grace for technical difficulties

### Challenge: "Hard to feel energetic coherence"

**Reality check:** Virtual is different from in-person. That's okay.

**Enhancements:**
- Synchronize breathing at start
- Use high-quality audio
- Longer settling time (7-10 min)
- Accept the medium's limitations

### Challenge: "People don't show up consistently"

**Solutions:**
- Reliable schedule
- Timezone clarity
- Reminder system
- Core group of 3-4 committed people

## Virtual vs Hybrid

### Starting Hybrid

If you have a physical node and want to add virtual access:

**Technical needs:**
- Laptop with good mic in physical space
- Stable internet at location
- Way to share in-room audio (external mic)
- Screen for virtual participants (optional)

**Logistical challenges:**
- Virtual folks can feel like second-class
- In-room audio quality matters more
- More complex facilitation
- Technical fails affect everyone

**When it works:**
- Same regulars join both ways
- Simple tech setup
- Primary mode with secondary option
- Clear expectations

### Virtual-Only Benefits

Starting virtual-only can be simpler than hybrid:
- No venue needed
- Lower barrier to entry
- Easier to maintain consistency
- Fewer technical complications

Don't feel pressured to offer both. Pick one and do it well.

## Facilitating Virtual Sessions

### Pre-Session (5 min before)

```
[Join early]
[Test audio/video]
[Open timer]
[Check chat for questions]
```

### Welcome (2 min)

```
"Welcome everyone. We'll start in 2 minutes.
Feel free to keep video on or turn it off - whatever supports your practice.
We'll mute during meditation and unmute for brief sharing at the end."
```

### Start (On time)

```
"Let's begin. I'll start the timer now.
[Share screen with timer OR]
Everyone start your 60-minute timer... 3, 2, 1, now."

[Mute yourself]
```

### End (After timer)

```
[Unmute]
"We'll take a few minutes for optional sharing.
1-2 minutes each, just sharing experience, no advice-giving."

[After sharing or if no one shares]
"Thank you for practicing together. Same time next week."
```

## Platform-Specific Tips

### Jitsi

- Append `#config.prejoinPageEnabled=false` to skip lobby
- Use password for private sessions
- "Low bandwidth mode" if connection issues
- Tile view for equal presence

### Zoom

- Use waiting room to prevent random joins
- Gallery view, hide self-view
- Disable "enter/exit" chimes
- Host-only screen sharing

### Discord

- Separate voice channel for meditation
- Pin session schedule in text channel
- Use stage channel for larger groups
- Bot for automated session reminders

## Privacy & Safety

### Recordings

Default: **No recording**

If recording (requires everyone's consent):
- Announce clearly at start
- Get explicit verbal agreement
- Password-protect recording
- Private distribution only

### Unexpected Visitors

- Use passwords for private sessions
- Waiting room/lobby feature
- Clear about "drop-in" policy
- Facilitator can remove disruptive participants

### Personal Boundaries

- Video off is always okay
- Mute is always okay
- Leaving early is okay
- No pressure to share

## Growing Virtual Nodes

### Initial Growth

- Start with 2-3 people
- Consistent schedule for 8 weeks minimum
- Share in online meditation communities
- Keep barrier to entry low (no signup required)

### Sustainable Size

Virtual sweet spot: **4-6 regular participants**

Why?
- Small enough for intimacy
- Large enough to maintain if someone misses
- Sharing time stays reasonable
- Technical coordination manageable

### When to Split

If you regularly have 8+ people:
- Consider second timezone session
- Start second node
- Coordinate but keep groups small

## Resources

- **[Session Timer Tool](../tools/session-timer/)** - Web-based timer
- **[Jitsi Meet](https://meet.jit.si)** - Free video platform
- **[Heart Protocol](heart-protocol.md)** - Core practice
- **[Getting Started](getting-started.md)** - General node setup

## Troubleshooting

### Audio Echo

- Use headphones
- Mute when not speaking
- Reduce speaker volume

### Low Bandwidth

- Turn off video
- Lower video quality settings
- Use audio-only mode
- Close other applications

### Coordination Confusion

- Clear written instructions
- Consistent format every session
- Single communication channel
- Patient repetition for new folks

---

**Virtual practice is real practice.**
