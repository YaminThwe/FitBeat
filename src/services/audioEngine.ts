import { Track } from '../types';

export class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentTrack: Track | null = null;
  private isPlaying = false;
  private currentTime = 0;
  private duration = 0;
  private volume = 0.82;
  private isMuted = false;
  private timerInterval: number | null = null;
  private blobUrl: string | null = null;
  private synthLoopTimer: number | null = null;
  private synthBeatStep = 0;

  private onTimeUpdateCallback: ((time: number, dur: number) => void) | null = null;
  private onTrackEndedCallback: (() => void) | null = null;
  private onPlayStateChangeCallback: ((playing: boolean) => void) | null = null;

  constructor() {
    this.audioElement = new Audio();
    this.audioElement.volume = this.volume;

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement && this.currentTrack?.hasBlob) {
        this.currentTime = this.audioElement.currentTime;
        this.duration = this.audioElement.duration || this.currentTrack.duration;
        this.onTimeUpdateCallback?.(this.currentTime, this.duration);
        this.updateMediaSessionPosition();
      }
    });

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.onPlayStateChangeCallback?.(false);
      this.onTrackEndedCallback?.();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.onPlayStateChangeCallback?.(true);
      this.updateMediaSessionState();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.onPlayStateChangeCallback?.(false);
      this.updateMediaSessionState();
    });
  }

  public setCallbacks(
    onTimeUpdate: (time: number, dur: number) => void,
    onTrackEnded: () => void,
    onPlayStateChange: (playing: boolean) => void
  ) {
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onTrackEndedCallback = onTrackEnded;
    this.onPlayStateChangeCallback = onPlayStateChange;
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public async loadTrack(track: Track, audioBlob?: Blob | null): Promise<void> {
    this.stopSynth();
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }

    this.currentTrack = track;
    this.duration = track.duration;
    this.currentTime = 0;

    if (audioBlob) {
      this.blobUrl = URL.createObjectURL(audioBlob);
      if (this.audioElement) {
        this.audioElement.src = this.blobUrl;
        this.audioElement.load();
      }
    } else {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.removeAttribute('src');
      }
    }

    this.updateMediaSessionMetadata(track);
  }

  public async play(): Promise<void> {
    if (!this.currentTrack) return;
    this.initAudioContext();

    if (this.blobUrl && this.audioElement) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.onPlayStateChangeCallback?.(true);
        this.updateMediaSessionState();
      } catch (err) {
        console.warn('Audio play failed, falling back to synth beat:', err);
        this.playWorkoutSynth();
      }
    } else {
      // Synthesizer playback for high-energy workout mode
      this.playWorkoutSynth();
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.audioElement && this.blobUrl) {
      this.audioElement.pause();
    }
    this.stopSynth();
    this.onPlayStateChangeCallback?.(false);
    this.updateMediaSessionState();
  }

  public seek(seconds: number): void {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.audioElement && this.blobUrl) {
      this.audioElement.currentTime = this.currentTime;
    }
    this.onTimeUpdateCallback?.(this.currentTime, this.duration);
    this.updateMediaSessionPosition();
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  // High-Energy Web Audio Synthesizer for Gym Workout Beat
  private playWorkoutSynth(): void {
    this.isPlaying = true;
    this.onPlayStateChangeCallback?.(true);
    this.updateMediaSessionState();

    const bpm = this.currentTrack?.bpm || 160;
    const beatIntervalMs = (60 / bpm) * 1000 / 2; // 8th notes

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.currentTime += 0.25;
        if (this.currentTime >= this.duration) {
          this.pause();
          this.onTrackEndedCallback?.();
        } else {
          this.onTimeUpdateCallback?.(this.currentTime, this.duration);
        }
      }
    }, 250);

    if (this.synthLoopTimer) clearInterval(this.synthLoopTimer);
    this.synthLoopTimer = window.setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      this.triggerWorkoutBeatStep(this.synthBeatStep, bpm);
      this.synthBeatStep = (this.synthBeatStep + 1) % 16;
    }, beatIntervalMs);
  }

  private triggerWorkoutBeatStep(step: number, bpm: number): void {
    if (!this.audioCtx || this.isMuted) return;
    const now = this.audioCtx.currentTime;
    const masterGain = this.audioCtx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.45, now);
    masterGain.connect(this.audioCtx.destination);

    // 4-on-the-floor Kick Drum (steps 0, 4, 8, 12)
    if (step % 4 === 0) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.2);
    }

    // Snare / Clap on beats 4 and 12
    if (step === 4 || step === 12) {
      const noiseBuffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate * 0.1, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      whiteNoise.start(now);
    }

    // Hi-Hats on off-beats (steps 2, 6, 10, 14)
    if (step % 2 === 0) {
      const noiseBuffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate * 0.04, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const hatSource = this.audioCtx.createBufferSource();
      hatSource.buffer = noiseBuffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 6500;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);

      hatSource.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      hatSource.start(now);
    }

    // Bass Synth Stabs (pumping sub-bass in sync with workout)
    if (step % 2 === 1) {
      const bassOsc = this.audioCtx.createOscillator();
      const bassGain = this.audioCtx.createGain();
      bassOsc.type = 'sawtooth';
      const rootFreq = bpm > 165 ? 65.41 : 55.0; // C2 or A1
      bassOsc.frequency.setValueAtTime(rootFreq, now);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.1);

      bassGain.gain.setValueAtTime(0.4, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      bassOsc.connect(filter);
      filter.connect(bassGain);
      bassGain.connect(masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.14);
    }
  }

  private stopSynth(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.synthLoopTimer) {
      clearInterval(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }
  }

  // MediaSession API for Lock Screen & Background Play
  private updateMediaSessionMetadata(track: Track): void {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: `${track.album} · ${track.bpm} BPM`,
        artwork: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      });
    }
  }

  private updateMediaSessionState(): void {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = this.isPlaying ? 'playing' : 'paused';
    }
  }

  private updateMediaSessionPosition(): void {
    if ('mediaSession' in navigator && this.duration > 0) {
      try {
        navigator.mediaSession.setPositionState?.({
          duration: this.duration,
          playbackRate: 1,
          position: Math.min(this.currentTime, this.duration),
        });
      } catch (err) {
        // Silently catch unsupported position states
      }
    }
  }

  public setupMediaSessionHandlers(handlers: {
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSeek: (seconds: number) => void;
  }): void {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => handlers.onPlay());
      navigator.mediaSession.setActionHandler('pause', () => handlers.onPause());
      navigator.mediaSession.setActionHandler('nexttrack', () => handlers.onNext());
      navigator.mediaSession.setActionHandler('previoustrack', () => handlers.onPrev());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          handlers.onSeek(details.seekTime);
        }
      });
    }
  }

  public destroy(): void {
    this.stopSynth();
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
    }
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }
}

export const audioEngine = new AudioEngine();
