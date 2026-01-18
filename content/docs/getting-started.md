---
title: "Getting Started"
description: "Join an existing node or start your own"
---

# Getting Started with DMN

Two ways to participate in the Distributed Meditation Network:

---

## Option 1: Join an Existing Node

**See if there's a node near you:**

👉 **[View Node Directory](/nodes/)**

**How to join:**

1. **Find your local node** in the [directory](/nodes/)
2. **Click "Contact Node"** - opens GitHub Discussion
3. **Introduce yourself** - Brief intro, why you're interested
4. **Attend first session** - Coordinator will respond with details

**What to expect:**
- Weekly 45-minute sessions (typically evenings)
- 5-15 people per node (small groups)
- Peer-led (rotating facilitators, no teacher)
- Free forever (no fees)
- Heart-centered compassion meditation

---

## Option 2: Start Your Own Node

**No node in your area? Start one.**

### Step 1: Solo Practice (Weeks 1-4)

Before inviting others, practice the protocol yourself.

**Why solo first?**
- Understand the practice before facilitating
- Test timing and flow
- Build confidence
- Ensure commitment

**How to practice solo:**

1. **Read the [Heart Protocol](/docs/heart-protocol/)**
2. **Download meditation scripts:**
   - [Grounding (5 min)](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts)
   - [Heart practice (15 min)](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts) - Rotate weekly: self-compassion, loved ones, gratitude
   - [Silent integration (20 min)](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts)
   - [Closing (5 min)](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts)

3. **Practice weekly** - Same day/time each week (builds habit)
4. **Take notes** - What works, what doesn't, timing adjustments
5. **Complete 4 sessions minimum** before inviting others

**Optional:** Create audio recordings (see [Audio Production Guide](https://github.com/reyblueroller/meditation-network/tree/main/resources/audio))

---

### Step 2: Register Your Node (Week 4)

**When ready to open to others:**

1. **Fork the repo:** [meditation-network on GitHub](https://github.com/reyblueroller/meditation-network)

2. **Create node YAML file:**
```
   Location: nodes/[country]/[city]/[city]-001.yaml
   Example: nodes/australia/melbourne/melbourne-001.yaml
```

3. **Node file template:**
```yaml
   - id: yourcity-001
     name: "Your City Node 001"
     status: forming
     location:
       city: "Your City"
       region: "State/Province"
       country: "Country"
       latitude: 0.0000    # Get from Google Maps
       longitude: 0.0000
     format: physical      # or "virtual" or "hybrid"
     schedule:
       day: "Wednesdays"
       time: "7:00 PM"
       timezone: "Your/Timezone"  # e.g. America/New_York
       frequency: "Weekly"
     contact:
       type: github_discussions
       url: "https://github.com/reyblueroller/meditation-network/discussions/categories/node-inquiries"
       category: "node-inquiries"
       label: "yourcity-001"
     languages:
       - English
     founding_date: "2026-03-01"
     founding_members: 1
     notes: "Just launched. Testing protocols. All welcome."
```

4. **Submit pull request**
5. **Node appears in directory** within 24-48 hours

---

### Step 3: Find Members (Weeks 5-8)

**How to find your first members:**

**Local outreach:**
- Post flyer at yoga studios, meditation centers, community boards
- Create Meetup.com event
- Visit local meditation/wellness spaces
- Coffee shops, libraries, coworking spaces

**Online outreach:**
- Reddit: r/meditation, r/yourcity
- Local Facebook groups
- Your personal network (if comfortable)
- Discord meditation communities

**Message template:**
```
Starting peer meditation group in [City].

- Weekly [Day] evenings, 45 minutes
- Heart-centered practice, no experience needed
- Free forever, peer-led (no teacher)
- Based on open-source DMN protocols

First session: [Date/Time/Location]
Info: [link to your node in directory]

Questions? Reply or DM.
```

**Realistic expectations:**
- You'll reach 100+ people to get 5 responses
- 5 responses = 2-3 actual attendees
- 2-3 attendees = success!
- Growth takes 3-6 months

**Where to post:**
- One post per platform (don't spam)
- Be genuine, not salesy
- Offer value (free practice space)
- Respond to questions quickly

---

### Step 4: First Group Session (Week 9+)

**When you have 2+ people committed:**

**Preparation (day before):**
1. Confirm time/location (send reminder)
2. Test audio/tech setup
3. Prepare space (cushions, chairs, timer)
4. Review facilitation notes

**Session structure:**

**7:00-7:05 - Arrival & Introduction (5 min)**
- Welcome as people arrive
- Brief intro (first-timers only):
  - "45-minute heart-centered meditation"
  - "Structure: grounding, heart practice, silence, closing"
  - "No experience needed, just follow along"
  - "Optional sharing after"

**7:05-7:50 - Practice (45 min)**
- Press play on audio (or read scripts)
- Participate yourself (don't just observe)
- No talking during practice
- Keep time precisely

**7:50-8:00 - Closing & Optional Sharing (10 min)**
- Allow silence after bell
- Open for brief sharing (not required)
- Confirm next week's session
- Exchange contact info if new members

**First session tips:**
- Start exactly on time (respect schedules)
- Don't over-explain (practice speaks for itself)
- Participate fully (you're peer, not teacher)
- Keep sharing brief (2-3 min per person max)
- End on time

---

### Step 5: Sustain & Grow (Weeks 10+)

**Building momentum:**

**Consistency:**
- Same day/time/place weekly
- Cancel only for emergencies
- Even if just 2 people show up

**Facilitation rotation:**
- Week 1: You facilitate
- Week 2: Someone else volunteers
- Week 3: Rotate again
- Document who's facilitating next (group chat)

**Communication:**
- Create group chat (Signal, WhatsApp, Telegram)
- Weekly reminder (day before session)
- Share resources (scripts, readings)
- Celebrate milestones (Week 12, etc.)

**Documentation:**
- Log attendance (spreadsheet)
- Note what worked/didn't
- Track facilitation rotation
- Field reports to DMN (optional)

**Common challenges:**

| Challenge | Solution |
|-----------|----------|
| Attendance fluctuates | Normal. Core of 3-5 regulars = success |
| People drop out | Normal. Focus on who stays |
| Scheduling conflicts | Offer 2 sessions/week? Or stick to one reliable time |
| Facilitator burnout | Rotate weekly. Share the load. |
| Growth plateaus | Patience. Word of mouth takes 6+ months |

**Signs of success:**
- 3-5 people showing up consistently
- People facilitating without being asked
- Organic connection/friendships forming
- Requests to invite friends
- Sessions feel cohesive, not awkward

**Timeline to stability:**
- **Month 1-2:** Finding rhythm, testing format
- **Month 3-4:** Core group stabilizing
- **Month 5-6:** Sustainable, self-organizing
- **Month 12+:** Helping others start nodes

---

## Resources

**Everything you need is open-source:**

### Core Protocols
- **[Heart Protocol](/docs/heart-protocol/)** - Complete practice guide
- **[Meditation Scripts](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts)** - All sessions
- **[FAQ](/docs/faq/)** - Common questions

### Audio Production
- **[Production Guide](https://github.com/reyblueroller/meditation-network/tree/main/resources/audio)** - How to create session audio
- **[Music Recommendations](https://github.com/reyblueroller/meditation-network/tree/main/resources/music)** - Open-source background music
- **[Frequency Guide](https://github.com/reyblueroller/meditation-network/tree/main/resources/audio)** - Optional binaural beats

### Philosophy
- **[Mission (Evidence-Based)](/docs/mission/)** - Research perspective
- **[Deeper Purpose (Consciousness)](/docs/deeper-purpose/)** - Spiritual perspective
- **[Integration](/docs/comparison/)** - How they align

---

## Get Support

**Questions about starting a node?**

- **[GitHub Discussions](https://github.com/reyblueroller/meditation-network/discussions)** - Community Q&A
- **Email:** contact@meditation-network.org
- **Existing Node Founders:** Connect via Discussions

**Common questions:**
- "How do I facilitate if I'm not a teacher?" → You're not teaching, just holding space. Scripts guide the practice.
- "What if only 2 people show up?" → That's enough. Quality over quantity.
- "What if I don't know how to meditate?" → Practice solo for 4 weeks. That's enough.
- "What if my node fails?" → Most things fail. Document the attempt. Data helps the network.

---

## Quick Start Checklist

**Week 1-4: Solo Practice**
- [ ] Read Heart Protocol
- [ ] Download scripts
- [ ] Practice 4 sessions solo
- [ ] Take notes

**Week 4: Registration**
- [ ] Fork repo
- [ ] Create node YAML
- [ ] Submit PR
- [ ] Node goes live

**Week 5-8: Outreach**
- [ ] Post to 3-5 platforms
- [ ] Create Meetup event
- [ ] Post 5 flyers locally
- [ ] Respond to inquiries

**Week 9: First Session**
- [ ] Confirm 2+ attendees
- [ ] Prepare space
- [ ] Run first session
- [ ] Collect feedback

**Week 10+: Sustain**
- [ ] Weekly sessions
- [ ] Rotate facilitation
- [ ] Build consistency
- [ ] Document journey

---

## Timeline Summary

**Realistic path to sustainable node:**

- **Weeks 1-4:** Solo practice
- **Week 4:** Register node
- **Weeks 5-8:** Find members
- **Week 9:** First group session
- **Weeks 10-20:** Build consistency
- **Month 6:** Stable node (3-5 regulars)
- **Month 12:** Self-sustaining, helping others

**Total time: 6-12 months**

That's normal. Infrastructure takes time.

---

## Start Now

**Ready to begin?**

**Joining:** [Find a node near you](/nodes/)

**Starting:** Practice solo for 4 weeks, then register your node.

**Either way, you're building planetary meditation infrastructure.**

Welcome to DMN. 🙏

---

**Next Steps:**
- [Read the Heart Protocol](/docs/heart-protocol/)
- [Browse Meditation Scripts](https://github.com/reyblueroller/meditation-network/tree/main/resources/meditation-scripts)
- [Join Discussions](https://github.com/reyblueroller/meditation-network/discussions)