import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Track, Playlist, AppSettings, WorkoutTimerState, ThemeMode } from '../types';
import {
  initializeDatabase,
  saveTrack,
  deleteTrack as deleteTrackFromDB,
  savePlaylist,
  deletePlaylist as deletePlaylistFromDB,
  getTrackAudioBlob,
  saveAppSettings,
  getStorageBreakdown,
  StorageBreakdown,
  clearOfflineCache,
  DEFAULT_SETTINGS,
} from '../services/db';
import { audioEngine } from '../services/audioEngine';

export type AppTab = 'home' | 'search' | 'library' | 'workout' | 'settings';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

interface PlayerContextType {
  // Navigation & UI States
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (id: string | null) => void;
  isOfflineVaultOpen: boolean;
  setIsOfflineVaultOpen: (open: boolean) => void;
  isFullPlayerOpen: boolean;
  setIsFullPlayerOpen: (open: boolean) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  
  // Data
  tracks: Track[];
  playlists: Playlist[];
  settings: AppSettings;
  storage: StorageBreakdown;
  activePlaylist: Playlist | null;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;

  // Playback State
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  queue: Track[];
  activeYouTubeVideoId: string | null;
  setActiveYouTubeVideoId: (id: string | null) => void;
  isAnalyzingLink: boolean;
  linkAnalysisProgress: number;

  // Playback Actions
  playTrack: (track: Track, newQueue?: Track[]) => Promise<void>;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleFavorite: (trackId: string) => void;

  // Playlist & Track Management
  createPlaylist: (name: string, category: string) => Promise<Playlist>;
  updatePlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  addTrackToPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  reorderPlaylistTracks: (playlistId: string, startIndex: number, endIndex: number) => Promise<void>;
  deleteTrack: (trackId: string) => Promise<void>;
  importDeviceAudioFiles: (files: FileList | File[]) => Promise<number>;
  importYouTubeTrack: (url: string) => Promise<Track | null>;
  clearStorageCache: () => Promise<void>;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setTheme: (theme: ThemeMode) => void;

  // Workout Mode State & Actions
  workoutTimer: WorkoutTimerState;
  startWorkoutTimer: () => void;
  pauseWorkoutTimer: () => void;
  resetWorkoutTimer: () => void;
  addWorkoutMinute: () => void;
  toggleWorkoutLock: () => void;
  quickSwitchWorkoutPlaylist: (playlistId: string) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isOfflineVaultOpen, setIsOfflineVaultOpen] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Data
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [storage, setStorage] = useState<StorageBreakdown>({
    flacMB: 1.4 * 1024,
    mp3MB: 0.8 * 1024,
    wavMB: 0.2 * 1024,
    totalUsedMB: 2.4 * 1024,
    maxStorageGB: 8.0,
    offlineCount: 86,
  });
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Audio Playback
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(138); // 02:18
  const [duration, setDuration] = useState(222); // 03:42
  const [volume, setVolumeState] = useState(0.82);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  const [activeYouTubeVideoId, setActiveYouTubeVideoId] = useState<string | null>(null);

  // Link Analysis Simulation State
  const [isAnalyzingLink, setIsAnalyzingLink] = useState(false);
  const [linkAnalysisProgress, setLinkAnalysisProgress] = useState(0);

  // Workout Timer State
  const [workoutTimer, setWorkoutTimer] = useState<WorkoutTimerState>({
    isActive: true,
    isPaused: false,
    secondsRemaining: 1458, // 24:18
    totalRoundSeconds: 1800,
    currentRound: 4,
    totalRounds: 6,
    phase: 'High Sprint',
    targetBpm: 160,
    isScreenLocked: false,
  });

  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initialize Data from IndexedDB
  useEffect(() => {
    let isMounted = true;
    initializeDatabase().then(async ({ tracks: loadedTracks, playlists: loadedPlaylists, settings: loadedSettings }) => {
      if (!isMounted) return;
      setTracks(loadedTracks);
      setPlaylists(loadedPlaylists);
      setSettingsState(loadedSettings);
      setShowOnboarding(!loadedSettings.hasCompletedOnboarding);

      const breakdown = await getStorageBreakdown(loadedTracks);
      setStorage(breakdown);

      // Default current track: Neon Pulse (160 BPM) matching initial UI screenshot
      const defaultTrack = loadedTracks.find((t) => t.id === 'track-1') || loadedTracks[0];
      if (defaultTrack) {
        setCurrentTrack(defaultTrack);
        setDuration(defaultTrack.duration);
        setQueue(loadedTracks);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
    }
  }, [settings.theme]);

  // Audio Engine Callbacks
  useEffect(() => {
    audioEngine.setCallbacks(
      (time, dur) => {
        setCurrentTime(time);
        setDuration(dur);
      },
      () => {
        // Track ended
        handleTrackEnded();
      },
      (playing) => {
        setIsPlaying(playing);
      }
    );

    audioEngine.setupMediaSessionHandlers({
      onPlay: () => togglePlay(),
      onPause: () => togglePlay(),
      onNext: () => nextTrack(),
      onPrev: () => prevTrack(),
      onSeek: (sec) => seekTo(sec),
    });
  }, [queue, currentTrack, isPlaying]);

  // Workout Timer Ticking
  useEffect(() => {
    if (!workoutTimer.isActive || workoutTimer.isPaused) return;

    const interval = setInterval(() => {
      setWorkoutTimer((prev) => {
        if (prev.secondsRemaining <= 1) {
          // Switch round
          const nextRound = prev.currentRound < prev.totalRounds ? prev.currentRound + 1 : 1;
          const nextPhase = nextRound % 2 === 0 ? 'High Sprint' : 'Active Recovery';
          return {
            ...prev,
            currentRound: nextRound,
            phase: nextPhase,
            secondsRemaining: 300, // 5 min interval
          };
        }
        return {
          ...prev,
          secondsRemaining: prev.secondsRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutTimer.isActive, workoutTimer.isPaused]);

  // Active playlist computed
  const activePlaylist = useMemo(() => {
    if (!selectedPlaylistId) return null;
    return playlists.find((p) => p.id === selectedPlaylistId) || null;
  }, [selectedPlaylistId, playlists]);

  // Play a specific track
  const playTrack = useCallback(async (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    }

    if (track.type === 'youtube') {
      // Check online status
      if (!navigator.onLine) {
        addToast({
          type: 'error',
          title: 'Offline Error',
          message: 'Saved YouTube links require internet. Playing offline tracks instead.',
          actionLabel: 'Offline Vault',
          onAction: () => {
            setIsOfflineVaultOpen(true);
            setActiveTab('library');
          },
        });
        return;
      }
      audioEngine.pause();
      setActiveYouTubeVideoId(track.youtubeVideoId || null);
      setIsPlaying(true);
      return;
    }

    // Local / Offline Audio Playback
    setActiveYouTubeVideoId(null);
    let blob: Blob | null = null;
    if (track.hasBlob) {
      blob = await getTrackAudioBlob(track.id);
    }

    await audioEngine.loadTrack(track, blob);
    await audioEngine.play();
  }, [addToast]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;

    if (currentTrack.type === 'youtube') {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.play();
    }
  }, [currentTrack, isPlaying]);

  const seekTo = useCallback((seconds: number) => {
    setCurrentTime(seconds);
    audioEngine.seek(seconds);
  }, []);

  const setVolume = useCallback((level: number) => {
    setVolumeState(level);
    audioEngine.setVolume(level);
  }, []);

  const toggleMute = useCallback(() => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;
    const currentIndex = currentTrack ? queue.findIndex((t) => t.id === currentTrack.id) : -1;
    let nextIndex = 0;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }

    playTrack(queue[nextIndex]);
  }, [queue, currentTrack, isShuffle, playTrack]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0) return;
    if (currentTime > 4) {
      seekTo(0);
      return;
    }
    const currentIndex = currentTrack ? queue.findIndex((t) => t.id === currentTrack.id) : -1;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;
    playTrack(queue[prevIndex]);
  }, [queue, currentTrack, currentTime, seekTo, playTrack]);

  const handleTrackEnded = useCallback(() => {
    if (repeatMode === 'one' && currentTrack) {
      seekTo(0);
      audioEngine.play();
    } else if (repeatMode === 'all' || isShuffle) {
      nextTrack();
    } else {
      const currentIndex = currentTrack ? queue.findIndex((t) => t.id === currentTrack.id) : -1;
      if (currentIndex < queue.length - 1) {
        nextTrack();
      } else {
        setIsPlaying(false);
      }
    }
  }, [repeatMode, currentTrack, isShuffle, nextTrack, queue, seekTo]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleFavorite = useCallback(async (trackId: string) => {
    setTracks((prev) => {
      const updated = prev.map((t) => (t.id === trackId ? { ...t, isFavorite: !t.isFavorite } : t));
      const target = updated.find((t) => t.id === trackId);
      if (target) {
        saveTrack(target);
      }
      return updated;
    });

    if (currentTrack?.id === trackId) {
      setCurrentTrack((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  }, [currentTrack]);

  // Import Device Audio Files
  const importDeviceAudioFiles = useCallback(async (files: FileList | File[]): Promise<number> => {
    const fileList = Array.from(files);
    let importedCount = 0;

    for (const file of fileList) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let trackType: Track['type'] = 'offline_mp3';
      let bitrate = 'MP3 320kbps';

      if (ext === 'flac') {
        trackType = 'offline_flac';
        bitrate = 'FLAC · Lossless';
      } else if (ext === 'wav') {
        trackType = 'offline_wav';
        bitrate = 'WAV Lossless 24-bit';
      } else if (ext === 'm4a' || ext === 'aac') {
        trackType = 'offline_mp3';
        bitrate = 'AAC 256kbps';
      }

      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      const sizeMB = Math.round((file.size / (1024 * 1024)) * 10) / 10;
      // High-energy workout BPM estimation (155 - 175)
      const randomBpm = 150 + Math.floor(Math.random() * 25);

      const newTrack: Track = {
        id: 'track-user-' + Date.now() + Math.random().toString(36).substring(2, 5),
        title: cleanTitle,
        artist: 'User Imported Audio',
        album: 'Offline Gym Vault',
        duration: 220 + Math.floor(Math.random() * 40),
        bpm: randomBpm,
        type: trackType,
        fileSizeMB: sizeMB || 9.4,
        bitrate,
        isFavorite: false,
        coverGradient: 'from-pink-600 via-rose-500 to-amber-500',
        coverIcon: 'zap',
        addedAt: Date.now(),
        hasBlob: true,
      };

      await saveTrack(newTrack, file);
      setTracks((prev) => [newTrack, ...prev]);

      // Add to primary workout playlist
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === 'playlist-hiit-beast' ? { ...pl, trackIds: [newTrack.id, ...pl.trackIds] } : pl))
      );

      importedCount++;
    }

    // Refresh storage stats
    const updatedTracks = await getStorageBreakdown([...tracks]);
    setStorage(updatedTracks);

    if (fileList.length > 0) {
      const first = fileList[0];
      const size = Math.round((first.size / (1024 * 1024)) * 10) / 10;
      addToast({
        type: 'success',
        title: "Added to 'HIIT Beast Mode' & Library!",
        message: `${first.name} (${size} MB) is offline ready.`,
        actionLabel: 'View',
        onAction: () => {
          setIsOfflineVaultOpen(true);
          setActiveTab('library');
        },
      });
    }

    return importedCount;
  }, [tracks, addToast]);

  // Import YouTube Music link with authentic analysis simulation
  const importYouTubeTrack = useCallback(async (url: string): Promise<Track | null> => {
    setIsAnalyzingLink(true);
    setLinkAnalysisProgress(15);

    // Parse video ID from URL
    let videoId = '9bZKP7q19f0';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || '9bZKP7q19f0';
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1) || '9bZKP7q19f0';
      }
    } catch {
      // Keep default videoId
    }

    // Progress animation matching screenshot 10 (Loading State: Analyzing Link)
    await new Promise((r) => setTimeout(r, 400));
    setLinkAnalysisProgress(45);
    await new Promise((r) => setTimeout(r, 500));
    setLinkAnalysisProgress(68);
    await new Promise((r) => setTimeout(r, 600));
    setLinkAnalysisProgress(100);

    const newTrack: Track = {
      id: 'track-yt-' + Date.now(),
      title: 'Afterhours Adrenaline (Edit)',
      artist: 'RL Grime & ISOxo',
      album: 'Trap / Gym Bass',
      duration: 238, // 03:58
      bpm: 158,
      type: 'youtube',
      youtubeUrl: url,
      youtubeVideoId: videoId,
      isFavorite: true,
      coverGradient: 'from-purple-600 via-pink-600 to-rose-600',
      coverIcon: 'play',
      addedAt: Date.now(),
    };

    await saveTrack(newTrack);
    setTracks((prev) => [newTrack, ...prev]);

    // Also add to HIIT Beast Mode playlist
    setPlaylists((prev) =>
      prev.map((pl) => (pl.id === 'playlist-hiit-beast' ? { ...pl, trackIds: [newTrack.id, ...pl.trackIds] } : pl))
    );

    setIsAnalyzingLink(false);
    setLinkAnalysisProgress(0);

    addToast({
      type: 'success',
      title: 'YouTube Track Discovered!',
      message: `${newTrack.title} saved to workout collection.`,
      actionLabel: 'Play',
      onAction: () => playTrack(newTrack),
    });

    return newTrack;
  }, [addToast, playTrack]);

  // Playlist management
  const createPlaylist = useCallback(async (name: string, category: string): Promise<Playlist> => {
    const newPl: Playlist = {
      id: 'playlist-' + Date.now(),
      name,
      subtitle: `${category} workout mix`,
      category,
      badge: 'CUSTOM WORKOUT SET',
      coverGradient: 'from-pink-600 via-purple-600 to-indigo-700',
      icon: 'flame',
      trackIds: [],
      totalDuration: '0m',
    };
    await savePlaylist(newPl);
    setPlaylists((prev) => [newPl, ...prev]);
    return newPl;
  }, []);

  const updatePlaylist = useCallback(async (pl: Playlist) => {
    await savePlaylist(pl);
    setPlaylists((prev) => prev.map((p) => (p.id === pl.id ? pl : p)));
  }, []);

  const deletePlaylist = useCallback(async (playlistId: string) => {
    await deletePlaylistFromDB(playlistId);
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId(null);
    }
  }, [selectedPlaylistId]);

  const addTrackToPlaylist = useCallback(async (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId && !pl.trackIds.includes(trackId)) {
          const updated = { ...pl, trackIds: [...pl.trackIds, trackId] };
          savePlaylist(updated);
          return updated;
        }
        return pl;
      })
    );
    addToast({
      type: 'info',
      title: 'Added to Playlist',
      message: 'Track added successfully.',
    });
  }, [addToast]);

  const removeTrackFromPlaylist = useCallback(async (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const updated = { ...pl, trackIds: pl.trackIds.filter((id) => id !== trackId) };
          savePlaylist(updated);
          return updated;
        }
        return pl;
      })
    );
  }, []);

  const reorderPlaylistTracks = useCallback(async (playlistId: string, startIndex: number, endIndex: number) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const result = Array.from(pl.trackIds);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          const updated = { ...pl, trackIds: result };
          savePlaylist(updated);
          return updated;
        }
        return pl;
      })
    );
  }, []);

  const deleteTrack = useCallback(async (trackId: string) => {
    await deleteTrackFromDB(trackId);
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
    setQueue((prev) => prev.filter((t) => t.id !== trackId));
    if (currentTrack?.id === trackId) {
      audioEngine.pause();
      setCurrentTrack(null);
      setIsPlaying(false);
    }
    const breakdown = await getStorageBreakdown(tracks.filter((t) => t.id !== trackId));
    setStorage(breakdown);
    addToast({
      type: 'info',
      title: 'Track Removed',
      message: 'File removed from Offline Vault.',
    });
  }, [currentTrack, tracks, addToast]);

  const clearStorageCache = useCallback(async () => {
    await clearOfflineCache();
    setTracks((prev) => prev.filter((t) => !t.hasBlob));
    const breakdown = await getStorageBreakdown([]);
    setStorage(breakdown);
    addToast({
      type: 'success',
      title: 'Cache Cleared',
      message: 'All temporary audio cached blobs were cleared.',
    });
  }, [addToast]);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      saveAppSettings(updated);
      return updated;
    });
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    updateSettings({ theme });
  }, [updateSettings]);

  // Workout Timer Helpers
  const startWorkoutTimer = useCallback(() => {
    setWorkoutTimer((prev) => ({ ...prev, isActive: true, isPaused: false }));
  }, []);

  const pauseWorkoutTimer = useCallback(() => {
    setWorkoutTimer((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetWorkoutTimer = useCallback(() => {
    setWorkoutTimer((prev) => ({
      ...prev,
      secondsRemaining: prev.totalRoundSeconds,
      isPaused: true,
      currentRound: 1,
      phase: 'Warmup',
    }));
  }, []);

  const addWorkoutMinute = useCallback(() => {
    setWorkoutTimer((prev) => ({
      ...prev,
      secondsRemaining: prev.secondsRemaining + 60,
    }));
  }, []);

  const toggleWorkoutLock = useCallback(() => {
    setWorkoutTimer((prev) => ({
      ...prev,
      isScreenLocked: !prev.isScreenLocked,
    }));
  }, []);

  const quickSwitchWorkoutPlaylist = useCallback((playlistId: string) => {
    const pl = playlists.find((p) => p.id === playlistId);
    if (!pl) return;
    setSelectedPlaylistId(playlistId);
    const plTracks = tracks.filter((t) => pl.trackIds.includes(t.id));
    if (plTracks.length > 0) {
      playTrack(plTracks[0], plTracks);
    }
  }, [playlists, tracks, playTrack]);

  return (
    <PlayerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedPlaylistId,
        setSelectedPlaylistId,
        isOfflineVaultOpen,
        setIsOfflineVaultOpen,
        isFullPlayerOpen,
        setIsFullPlayerOpen,
        showOnboarding,
        setShowOnboarding,

        tracks,
        playlists,
        settings,
        storage,
        activePlaylist,
        toasts,
        removeToast,
        addToast,

        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        queue,
        activeYouTubeVideoId,
        setActiveYouTubeVideoId,
        isAnalyzingLink,
        linkAnalysisProgress,

        playTrack,
        togglePlay,
        seekTo,
        setVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleRepeat,
        toggleFavorite,

        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        reorderPlaylistTracks,
        deleteTrack,
        importDeviceAudioFiles,
        importYouTubeTrack,
        clearStorageCache,
        updateSettings,
        setTheme,

        workoutTimer,
        startWorkoutTimer,
        pauseWorkoutTimer,
        resetWorkoutTimer,
        addWorkoutMinute,
        toggleWorkoutLock,
        quickSwitchWorkoutPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
