export type TrackType = 'offline_mp3' | 'offline_flac' | 'offline_wav' | 'youtube';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  type: TrackType;
  fileSizeMB?: number;
  bitrate?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  isFavorite: boolean;
  coverGradient?: string;
  coverIcon?: string;
  addedAt: number;
  hasBlob?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  badge: string;
  coverGradient: string;
  icon: string;
  trackIds: string[];
  totalDuration?: string;
}

export type ThemeMode = 'dark' | 'light';

export interface AppSettings {
  theme: ThemeMode;
  lockScreenBackgroundPlay: boolean;
  gaplessCrossfade: boolean;
  audioQuality: 'lossless' | 'high' | 'standard';
  workoutReminders: boolean;
  hasCompletedOnboarding: boolean;
}

export interface WorkoutTimerState {
  isActive: boolean;
  isPaused: boolean;
  secondsRemaining: number;
  totalRoundSeconds: number;
  currentRound: number;
  totalRounds: number;
  phase: 'High Sprint' | 'Active Recovery' | 'Warmup' | 'Cool Down';
  targetBpm: number;
  isScreenLocked: boolean;
}
