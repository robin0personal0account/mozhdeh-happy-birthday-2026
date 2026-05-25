/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class EmotionalMusicEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volumeIntervalRef: any = null;
  private chimeCtx: AudioContext | null = null;
  
  // Volume stays permanently at a soft, cozy, and stable cinematic background level
  private readonly targetVolume = 0.11; 

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio('https://github.com/wrapfr33kzz/audio/raw/main/4vwk3garzk7f8pp15qzc.m4a');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0; // Starts silent for elegant fade-in
    }
  }

  public async start() {
    if (!this.audio) return;

    try {
      this.isPlaying = true;

      // Reset any active fade-out intervals
      if (this.volumeIntervalRef) {
        clearInterval(this.volumeIntervalRef);
      }

      // Pre-set low level and play
      await this.audio.play();

      // Smooth constant normalization fade-in to prevent sharp intensity bursts
      let currentVol = this.audio.volume;
      this.volumeIntervalRef = setInterval(() => {
        if (!this.audio) return;
        if (currentVol < this.targetVolume) {
          currentVol = Math.min(this.targetVolume, currentVol + 0.012);
          this.audio.volume = currentVol;
        } else {
          this.audio.volume = this.targetVolume;
          clearInterval(this.volumeIntervalRef);
        }
      }, 80);

    } catch (error) {
      console.warn('Silent tap autoplay block bypassed: Audio needs explicit user click', error);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.audio) return;
    this.isPlaying = false;

    if (this.volumeIntervalRef) {
      clearInterval(this.volumeIntervalRef);
    }

    // Elegant linear decrease to prevent clicks or popping sounds
    let currentVol = this.audio.volume;
    this.volumeIntervalRef = setInterval(() => {
      if (!this.audio) return;
      if (currentVol > 0.01) {
        currentVol = Math.max(0, currentVol - 0.015);
        this.audio.volume = currentVol;
      } else {
        this.audio.volume = 0;
        this.audio.pause();
        clearInterval(this.volumeIntervalRef);
      }
    }, 80);
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  // Purely constant low volume set-state without frequency spikes
  public setLetterOpenState(isOpen: boolean) {
    // Keep it entirely stable at targeted low volumes to avoid dramatic volume changes or spikes
  }

  // Cozy click/chime feedback utilizing pure client-side AudioContext
  public playInteractionChime() {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.chimeCtx) {
        this.chimeCtx = new AudioCtxClass();
      }
      if (this.chimeCtx.state === 'suspended') {
        this.chimeCtx.resume();
      }
      const ctx = this.chimeCtx;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // Sweet soft C5 note

      gain.gain.setValueAtTime(0, now);
      // Extremely quick but safe ramp to avoid sudden click interference
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Safe no-op if device audio contexts are constrained
    }
  }
}

export const musicEngine = new EmotionalMusicEngine();
export default musicEngine;
