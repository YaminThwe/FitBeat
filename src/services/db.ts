import { Track, Playlist, AppSettings } from '../types';

const DB_NAME = 'FitBeatDatabase';
const DB_VERSION = 1;

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Neon Pulse (160 BPM)',
    artist: 'Kaskade & Kavinsky',
    album: 'Cardio Rush EP',
    duration: 222, // 3:42
    bpm: 160,
    type: 'offline_flac',
    fileSizeMB: 24.8,
    bitrate: 'FLAC · 24-bit Lossless',
    isFavorite: true,
    coverGradient: 'from-pink-500 via-rose-600 to-purple-700',
    coverIcon: 'zap',
    addedAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'track-2',
    title: 'Titanium Sprint (170 BPM)',
    artist: 'Pendulum',
    album: 'In Silico Workout',
    duration: 248, // 4:08
    bpm: 170,
    type: 'offline_mp3',
    fileSizeMB: 9.2,
    bitrate: 'MP3 320kbps',
    isFavorite: true,
    coverGradient: 'from-purple-600 via-indigo-600 to-pink-500',
    coverIcon: 'flame',
    addedAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'track-3',
    title: 'Hyperdrive Sprint',
    artist: 'Sub Focus',
    album: 'Torus High Energy',
    duration: 222, // 3:42
    bpm: 174,
    type: 'offline_mp3',
    fileSizeMB: 8.6,
    bitrate: 'MP3 320kbps',
    isFavorite: true,
    coverGradient: 'from-rose-500 to-violet-600',
    coverIcon: 'activity',
    addedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'track-4',
    title: 'Endorphin Rush (Club Mix)',
    artist: 'Bicep',
    album: 'Isles Workout Edition',
    duration: 235, // 3:55
    bpm: 155,
    type: 'offline_flac',
    fileSizeMB: 26.4,
    bitrate: 'FLAC · Lossless',
    isFavorite: false,
    coverGradient: 'from-cyan-500 via-blue-600 to-pink-500',
    coverIcon: 'music',
    addedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'track-5',
    title: 'Afterhours Adrenaline (Edit)',
    artist: 'RL Grime & ISOxo',
    album: 'Trap / Gym Bass Vol. 1',
    duration: 238, // 3:58
    bpm: 158,
    type: 'youtube',
    youtubeUrl: 'https://music.youtube.com/watch?v=9bZKP7q19f0',
    youtubeVideoId: '9bZKP7q19f0',
    isFavorite: true,
    coverGradient: 'from-purple-600 to-rose-600',
    coverIcon: 'play',
    addedAt: Date.now() - 86400000,
  },
  {
    id: 'track-6',
    title: 'Iron Tempo (Warmup Edit)',
    artist: 'ODESZA',
    album: 'The Last Goodbye Cardio',
    duration: 210, // 3:30
    bpm: 140,
    type: 'offline_wav',
    fileSizeMB: 38.4,
    bitrate: 'WAV Lossless 24-bit',
    isFavorite: false,
    coverGradient: 'from-emerald-500 via-teal-600 to-blue-700',
    coverIcon: 'dumbbell',
    addedAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'track-7',
    title: 'Power Lift 2026',
    artist: 'Gessafelstein & Boys Noize',
    album: 'Industrial Workout Beats',
    duration: 275, // 4:35
    bpm: 165,
    type: 'offline_flac',
    fileSizeMB: 31.2,
    bitrate: 'FLAC Lossless',
    isFavorite: true,
    coverGradient: 'from-fuchsia-600 via-pink-600 to-rose-700',
    coverIcon: 'flame',
    addedAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'track-8',
    title: 'Night Jog Synth',
    artist: 'The Midnight & Carpenter Brut',
    album: 'Endless Run Synthwave',
    duration: 254, // 4:14
    bpm: 152,
    type: 'offline_mp3',
    fileSizeMB: 9.8,
    bitrate: 'MP3 320kbps',
    isFavorite: false,
    coverGradient: 'from-blue-600 via-cyan-500 to-indigo-700',
    coverIcon: 'shoe',
    addedAt: Date.now() - 86400000 * 8,
  },
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-hiit-beast',
    name: 'HIIT Beast Mode',
    subtitle: 'High intensity sprints & tabata drops',
    category: 'Gym Motivation',
    badge: 'CUSTOM WORKOUT SET',
    coverGradient: 'from-pink-600 via-rose-600 to-purple-700',
    icon: 'flame',
    trackIds: ['track-1', 'track-2', 'track-5', 'track-4', 'track-3', 'track-7'],
    totalDuration: '1h 18m',
  },
  {
    id: 'playlist-5k-morning',
    name: '5K Morning Tempo',
    subtitle: 'Rhythmic cadenced steady-state pace',
    category: 'Morning Run',
    badge: 'MIXED',
    coverGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    icon: 'activity',
    trackIds: ['track-2', 'track-6', 'track-8', 'track-1'],
    totalDuration: '54m',
  },
  {
    id: 'playlist-heavy-lift',
    name: 'Heavy Lift Overdrive',
    subtitle: 'Deep bass & aggressive drops for PR sets',
    category: 'Gym Motivation',
    badge: 'OFFLINE',
    coverGradient: 'from-purple-700 via-fuchsia-600 to-pink-600',
    icon: 'dumbbell',
    trackIds: ['track-7', 'track-3', 'track-2', 'track-1'],
    totalDuration: '46m',
  },
  {
    id: 'playlist-cardio-run',
    name: 'Cardio Run Velocity',
    subtitle: 'Consistent 160+ BPM zone 4 runner flow',
    category: 'Cardio',
    badge: 'OFFLINE',
    coverGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    icon: 'zap',
    trackIds: ['track-1', 'track-3', 'track-8', 'track-4'],
    totalDuration: '1h 05m',
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  lockScreenBackgroundPlay: true,
  gaplessCrossfade: true,
  audioQuality: 'lossless',
  workoutReminders: false,
  hasCompletedOnboarding: true,
};

let dbPromise: Promise<IDBDatabase> | null = null;

export function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('tracks')) {
        db.createObjectStore('tracks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('audioBlobs')) {
        db.createObjectStore('audioBlobs', { keyPath: 'trackId' });
      }
      if (!db.objectStoreNames.contains('playlists')) {
        db.createObjectStore('playlists', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

export async function initializeDatabase(): Promise<{ tracks: Track[]; playlists: Playlist[]; settings: AppSettings }> {
  try {
    const db = await getDB();
    const tracks = await getAllTracks(db);
    const playlists = await getAllPlaylists(db);
    const settings = await getAppSettings(db);

    if (tracks.length === 0) {
      // Seed initial tracks
      for (const track of INITIAL_TRACKS) {
        await saveTrack(track);
      }
    }

    if (playlists.length === 0) {
      // Seed initial playlists
      for (const pl of INITIAL_PLAYLISTS) {
        await savePlaylist(pl);
      }
    }

    const finalTracks = tracks.length > 0 ? tracks : INITIAL_TRACKS;
    const finalPlaylists = playlists.length > 0 ? playlists : INITIAL_PLAYLISTS;
    return { tracks: finalTracks, playlists: finalPlaylists, settings };
  } catch (err) {
    console.error('Error initializing indexedDB:', err);
    return {
      tracks: INITIAL_TRACKS,
      playlists: INITIAL_PLAYLISTS,
      settings: DEFAULT_SETTINGS,
    };
  }
}

export async function getAllTracks(db?: IDBDatabase): Promise<Track[]> {
  const database = db || (await getDB());
  return new Promise((resolve, reject) => {
    const tx = database.transaction('tracks', 'readonly');
    const store = tx.objectStore('tracks');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function saveTrack(track: Track, audioBlob?: Blob): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['tracks', 'audioBlobs'], 'readwrite');
    const trackStore = tx.objectStore('tracks');
    const blobStore = tx.objectStore('audioBlobs');

    const trackToSave = { ...track, hasBlob: !!audioBlob || track.hasBlob };
    trackStore.put(trackToSave);

    if (audioBlob) {
      blobStore.put({ trackId: track.id, blob: audioBlob });
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getTrackAudioBlob(trackId: string): Promise<Blob | null> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('audioBlobs', 'readonly');
    const store = tx.objectStore('audioBlobs');
    const req = store.get(trackId);
    req.onsuccess = () => resolve(req.result?.blob || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteTrack(trackId: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['tracks', 'audioBlobs', 'playlists'], 'readwrite');
    const trackStore = tx.objectStore('tracks');
    const blobStore = tx.objectStore('audioBlobs');
    const playlistStore = tx.objectStore('playlists');

    trackStore.delete(trackId);
    blobStore.delete(trackId);

    // Also remove from all playlists
    const plReq = playlistStore.getAll();
    plReq.onsuccess = () => {
      const playlists: Playlist[] = plReq.result || [];
      for (const pl of playlists) {
        if (pl.trackIds.includes(trackId)) {
          pl.trackIds = pl.trackIds.filter((id) => id !== trackId);
          playlistStore.put(pl);
        }
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllPlaylists(db?: IDBDatabase): Promise<Playlist[]> {
  const database = db || (await getDB());
  return new Promise((resolve, reject) => {
    const tx = database.transaction('playlists', 'readonly');
    const store = tx.objectStore('playlists');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function savePlaylist(playlist: Playlist): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('playlists', 'readwrite');
    const store = tx.objectStore('playlists');
    store.put(playlist);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('playlists', 'readwrite');
    const store = tx.objectStore('playlists');
    store.delete(playlistId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAppSettings(db?: IDBDatabase): Promise<AppSettings> {
  const database = db || (await getDB());
  return new Promise((resolve) => {
    const tx = database.transaction('settings', 'readonly');
    const store = tx.objectStore('settings');
    const req = store.get('app_settings');
    req.onsuccess = () => {
      resolve(req.result?.value || DEFAULT_SETTINGS);
    };
    req.onerror = () => resolve(DEFAULT_SETTINGS);
  });
}

export async function saveAppSettings(settings: AppSettings): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    store.put({ key: 'app_settings', value: settings });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export interface StorageBreakdown {
  flacMB: number;
  mp3MB: number;
  wavMB: number;
  totalUsedMB: number;
  maxStorageGB: number;
  offlineCount: number;
}

export async function getStorageBreakdown(tracks: Track[]): Promise<StorageBreakdown> {
  let flacMB = 0;
  let mp3MB = 0;
  let wavMB = 0;
  let offlineCount = 0;

  for (const t of tracks) {
    if (t.type !== 'youtube') {
      offlineCount++;
      const size = t.fileSizeMB || (t.type === 'offline_flac' ? 24.8 : t.type === 'offline_wav' ? 38.4 : 9.2);
      if (t.type === 'offline_flac') flacMB += size;
      else if (t.type === 'offline_mp3') mp3MB += size;
      else if (t.type === 'offline_wav') wavMB += size;
    }
  }

  const totalUsedMB = flacMB + mp3MB + wavMB;
  return {
    flacMB: Math.round(flacMB * 10) / 10,
    mp3MB: Math.round(mp3MB * 10) / 10,
    wavMB: Math.round(wavMB * 10) / 10,
    totalUsedMB: Math.round(totalUsedMB * 10) / 10,
    maxStorageGB: 8.0,
    offlineCount,
  };
}

export async function clearOfflineCache(): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['audioBlobs'], 'readwrite');
    const store = tx.objectStore('audioBlobs');
    store.clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
