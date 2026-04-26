/**
 * Sound Service - Synthesized Audio for Noir Tech Aesthetic
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private initialized = false;

  private init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.value = 0.08; // Very low volume by default
      this.primaryGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext not supported', e);
    }
  }

  /**
   * Ambient Scanning Hum
   */
  public playScanHum(duration: number = 1.5) {
    this.init();
    if (!this.ctx || !this.primaryGain) return;

    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, this.ctx.currentTime);
    
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(10, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(filter);
    filter.connect(this.primaryGain);

    osc.start();
    lfo.start();

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    filter.disconnect();
    osc.disconnect();
    osc.connect(gain);
    gain.connect(this.primaryGain);

    osc.stop(this.ctx.currentTime + duration);
    lfo.stop(this.ctx.currentTime + duration);
  }

  /**
   * Sharp Target Locked Beep
   */
  public playTargetLock() {
    this.init();
    if (!this.ctx || !this.primaryGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1); // Slide up to A6

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.primaryGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  /**
   * Deep Access Granted Tone
   */
  public playAccessGranted() {
    this.init();
    if (!this.ctx || !this.primaryGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220, this.ctx.currentTime); // A3

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.primaryGain);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.6);
    osc2.stop(this.ctx.currentTime + 0.6);
  }

  /**
   * System Boot Glitch
   */
  public playGlitch() {
    this.init();
    if (!this.ctx || !this.primaryGain) return;

    for (let i = 0; i < 5; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = this.ctx.currentTime + i * 0.1;

      osc.type = 'square';
      osc.frequency.setValueAtTime(Math.random() * 200 + 100, time);
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.05, time + 0.01);
      gain.gain.linearRampToValueAtTime(0, time + 0.05);

      osc.connect(gain);
      gain.connect(this.primaryGain);

      osc.start(time);
      osc.stop(time + 0.05);
    }
  }
}

export const soundService = new SoundService();
