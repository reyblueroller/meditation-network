// DMN Session Timer
(function() {
  'use strict';
  
  // Session configurations
  const SESSION_CONFIGS = {
    '30': [
      { name: 'Grounding', duration: 3 * 60, color: '#63b3ed' },
      { name: 'Heart Activation', duration: 10 * 60, color: '#b794f4' },
      { name: 'Silent Integration', duration: 15 * 60, color: '#805ad5' },
      { name: 'Closing', duration: 2 * 60, color: '#38a169' }
    ],
    '45': [
      { name: 'Grounding', duration: 5 * 60, color: '#63b3ed' },
      { name: 'Heart Activation', duration: 15 * 60, color: '#b794f4' },
      { name: 'Silent Integration', duration: 20 * 60, color: '#805ad5' },
      { name: 'Closing', duration: 5 * 60, color: '#38a169' }
    ],
    '60': [
      { name: 'Grounding', duration: 5 * 60, color: '#63b3ed' },
      { name: 'Heart Activation', duration: 15 * 60, color: '#b794f4' },
      { name: 'Silent Integration', duration: 30 * 60, color: '#805ad5' },
      { name: 'Closing', duration: 5 * 60, color: '#38a169' }
    ]
  };
  
  class SessionTimer {
    constructor() {
      this.sessionLength = 45;
      this.phases = SESSION_CONFIGS['45'];
      this.currentPhaseIndex = 0;
      this.timeRemaining = 0;
      this.totalTime = 0;
      this.isRunning = false;
      this.isPaused = false;
      this.interval = null;
      
      this.init();
    }
    
    init() {
      this.calculateTotalTime();
      this.timeRemaining = this.totalTime;
      this.render();
      this.attachEventListeners();
    }
    
    calculateTotalTime() {
      this.totalTime = this.phases.reduce((sum, phase) => sum + phase.duration, 0);
    }
    
    render() {
      const app = document.getElementById('timer-app');
      
      app.innerHTML = `
        <div class="timer-container">
          <!-- Session Length Selector -->
          <div class="session-selector">
            <button class="session-btn ${this.sessionLength === 30 ? 'active' : ''}" data-length="30">30 min</button>
            <button class="session-btn ${this.sessionLength === 45 ? 'active' : ''}" data-length="45">45 min</button>
            <button class="session-btn ${this.sessionLength === 60 ? 'active' : ''}" data-length="60">60 min</button>
          </div>
          
          <!-- Current Phase -->
          <div class="current-phase">
            <h2>${this.phases[this.currentPhaseIndex].name}</h2>
          </div>
          
          <!-- Time Display -->
          <div class="time-display">
            ${this.formatTime(this.timeRemaining)}
          </div>
          
          <!-- Progress Bar -->
          <div class="progress-container">
            ${this.renderProgressBar()}
          </div>
          
          <!-- Phase List -->
          <div class="phase-list">
            ${this.phases.map((phase, i) => `
              <div class="phase-item ${i === this.currentPhaseIndex ? 'active' : ''} ${i < this.currentPhaseIndex ? 'completed' : ''}">
                <span class="phase-name">${phase.name}</span>
                <span class="phase-duration">${Math.floor(phase.duration / 60)} min</span>
              </div>
            `).join('')}
          </div>
          
          <!-- Controls -->
          <div class="timer-controls">
            ${!this.isRunning ? `
              <button class="btn btn-primary btn-lg" id="start-btn">Start Session</button>
            ` : `
              <button class="btn btn-secondary" id="pause-btn">${this.isPaused ? 'Resume' : 'Pause'}</button>
              <button class="btn btn-danger" id="reset-btn">Reset</button>
            `}
          </div>
        </div>
      `;
      
      this.addTimerStyles();
    }
    
    renderProgressBar() {
      const elapsed = this.totalTime - this.timeRemaining;
      const percentage = (elapsed / this.totalTime) * 100;
      
      let phaseBars = '';
      let cumulativeTime = 0;
      
      this.phases.forEach((phase, i) => {
        const phasePercentage = (phase.duration / this.totalTime) * 100;
        const isActive = i === this.currentPhaseIndex;
        const isCompleted = i < this.currentPhaseIndex;
        
        let fillPercentage = 0;
        if (isCompleted) {
          fillPercentage = 100;
        } else if (isActive) {
          const phaseElapsed = elapsed - cumulativeTime;
          fillPercentage = (phaseElapsed / phase.duration) * 100;
        }
        
        phaseBars += `
          <div class="phase-bar" style="width: ${phasePercentage}%">
            <div class="phase-bar-fill" style="width: ${fillPercentage}%; background-color: ${phase.color}"></div>
          </div>
        `;
        
        cumulativeTime += phase.duration;
      });
      
      return `<div class="progress-bar">${phaseBars}</div>`;
    }
    
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    attachEventListeners() {
      // Session length buttons
      document.querySelectorAll('.session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!this.isRunning) {
            this.changeSessionLength(parseInt(btn.dataset.length));
          }
        });
      });
      
      // Start button
      const startBtn = document.getElementById('start-btn');
      if (startBtn) {
        startBtn.addEventListener('click', () => this.start());
      }
      
      // Pause button
      const pauseBtn = document.getElementById('pause-btn');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => this.togglePause());
      }
      
      // Reset button
      const resetBtn = document.getElementById('reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.reset());
      }
    }
    
    changeSessionLength(length) {
      this.sessionLength = length;
      this.phases = SESSION_CONFIGS[length.toString()];
      this.currentPhaseIndex = 0;
      this.calculateTotalTime();
      this.timeRemaining = this.totalTime;
      this.render();
      this.attachEventListeners();
    }
    
    start() {
      this.isRunning = true;
      this.isPaused = false;
      this.playBell();
      this.interval = setInterval(() => this.tick(), 1000);
      this.render();
      this.attachEventListeners();
    }
    
    tick() {
      if (this.isPaused) return;
      
      this.timeRemaining--;
      
      // Check if phase changed
      const elapsed = this.totalTime - this.timeRemaining;
      let cumulativeTime = 0;
      let newPhaseIndex = 0;
      
      for (let i = 0; i < this.phases.length; i++) {
        if (elapsed >= cumulativeTime + this.phases[i].duration) {
          newPhaseIndex = i + 1;
        }
        cumulativeTime += this.phases[i].duration;
      }
      
      if (newPhaseIndex !== this.currentPhaseIndex && newPhaseIndex < this.phases.length) {
        this.currentPhaseIndex = newPhaseIndex;
        this.playBell();
      }
      
      // Check if session complete
      if (this.timeRemaining <= 0) {
        this.complete();
        return;
      }
      
      this.render();
      this.attachEventListeners();
    }
    
    togglePause() {
      this.isPaused = !this.isPaused;
      this.render();
      this.attachEventListeners();
    }
    
    reset() {
      if (!confirm('Reset session? Progress will be lost.')) return;
      
      clearInterval(this.interval);
      this.isRunning = false;
      this.isPaused = false;
      this.currentPhaseIndex = 0;
      this.timeRemaining = this.totalTime;
      this.render();
      this.attachEventListeners();
    }
    
    complete() {
      clearInterval(this.interval);
      this.playBell();
      this.playBell();
      alert('Session complete! 🙏');
      this.reset();
    }
    
    playBell() {
      // Simple beep (Web Audio API)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 528; // Hz (love frequency)
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    }
    
    addTimerStyles() {
      if (document.getElementById('timer-styles')) return;
      
      const styles = document.createElement('style');
      styles.id = 'timer-styles';
      styles.textContent = `
        .timer-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: var(--color-bg-alt);
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .session-selector {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .session-btn {
          padding: 0.5rem 1.5rem;
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          color: var(--color-text);
          transition: all var(--transition);
        }
        
        .session-btn:hover {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: white;
        }
        
        .session-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        .current-phase {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .current-phase h2 {
          color: var(--color-primary);
          font-size: 1.5rem;
          margin: 0;
        }
        
        .time-display {
          text-align: center;
          font-size: 4rem;
          font-weight: 700;
          color: var(--color-text);
          font-variant-numeric: tabular-nums;
          margin: 1rem 0;
          font-family: var(--font-mono);
        }
        
        .progress-container {
          margin: 2rem 0;
        }
        
        .progress-bar {
          display: flex;
          height: 20px;
          background: var(--color-bg);
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid var(--color-border);
        }
        
        .phase-bar {
          position: relative;
          overflow: hidden;
        }
        
        .phase-bar-fill {
          height: 100%;
          transition: width 1s linear;
        }
        
        .phase-list {
          margin: 2rem 0;
        }
        
        .phase-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          transition: all var(--transition);
        }
        
        .phase-item.active {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: white;
          font-weight: 600;
        }
        
        .phase-item.completed {
          opacity: 0.5;
          text-decoration: line-through;
        }
        
        .phase-name {
          font-weight: 500;
        }
        
        .phase-duration {
          color: var(--color-text-light);
        }
        
        .phase-item.active .phase-duration {
          color: rgba(255,255,255,0.8);
        }
        
        .timer-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all var(--transition);
        }
        
        .btn-primary {
          background: var(--color-primary);
          color: white;
        }
        
        .btn-primary:hover {
          background: #1a365d;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .btn-secondary {
          background: var(--color-accent);
          color: white;
        }
        
        .btn-secondary:hover {
          background: #6b46c1;
        }
        
        .btn-danger {
          background: var(--color-error);
          color: white;
        }
        
        .btn-danger:hover {
          background: #c53030;
        }
        
        .btn-lg {
          padding: 1rem 3rem;
          font-size: 1.2rem;
        }
        
        @media (max-width: 600px) {
          .timer-container {
            padding: 1rem;
          }
          
          .time-display {
            font-size: 3rem;
          }
          
          .session-selector {
            flex-direction: column;
          }
          
          .session-btn {
            width: 100%;
          }
          
          .timer-controls {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
      `;
      
      document.head.appendChild(styles);
    }
  }
  
  // Initialize timer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SessionTimer());
  } else {
    new SessionTimer();
  }
})();