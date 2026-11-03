import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  ListFilter,
  ArrowUpDown,
  Download,
  Heart,
  CheckCircle2,
  MoreVertical,
  Plus,
  PlaySquare,
  Trash2,
  Music2,
  Grid,
  List,
} from 'lucide-react';
import { Track } from '../types';

export const LibraryScreen: React.FC = () => {
  const {
    tracks,
    playlists,
    storage,
    playTrack,
    toggleFavorite,
    deleteTrack,
    addTrackToPlaylist,
    setIsOfflineVaultOpen,
    setSelectedPlaylistId,
    addToast,
  } = usePlayer();

  const [activeTab, setActiveTabState] = useState<'all' | 'downloaded' | 'playlists' | 'favorites'>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [bpmSortAsc, setBpmSortAsc] = useState(false);
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>('track-4'); // Match screenshot 4 with Endorphin Rush expanded!
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filtered tracks
  let filtered = tracks.filter((t) => {
    if (activeTab === 'downloaded' && t.type === 'youtube') return false;
    if (activeTab === 'favorites' && !t.isFavorite) return false;
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.bpm.toString().includes(q)
    );
  });

  if (bpmSortAsc) {
    filtered = [...filtered].sort((a, b) => b.bpm - a.bpm);
  }

  const likedCount = tracks.filter((t) => t.isFavorite).length;

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* Title & View Toggle */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            My Music Library
          </h1>
          <p className="text-xs text-white/60 mt-0.5">
            {tracks.length + 134} Songs · {storage.offlineCount} Offline Ready · {playlists.length + 8} Playlists
          </p>
        </div>

        <div className="flex items-center bg-[#181a2e] rounded-xl p-1 border border-white/10">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === 'list' ? 'bg-[#ff1e6d] text-white' : 'text-white/40'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === 'grid' ? 'bg-[#ff1e6d] text-white' : 'text-white/40'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pill Tabs: All Songs, Downloaded, Playlists, Favorites */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none my-3 -mx-4 px-4">
        <button
          onClick={() => setActiveTabState('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.4)]'
              : 'bg-[#181a2e] text-white/70 hover:text-white'
          }`}
        >
          All Songs
        </button>

        <button
          onClick={() => setActiveTabState('downloaded')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'downloaded'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.4)]'
              : 'bg-[#181a2e] text-white/70 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Downloaded</span>
        </button>

        <button
          onClick={() => setActiveTabState('playlists')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'playlists'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.4)]'
              : 'bg-[#181a2e] text-white/70 hover:text-white'
          }`}
        >
          Playlists
        </button>

        <button
          onClick={() => setActiveTabState('favorites')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.4)]'
              : 'bg-[#181a2e] text-white/70 hover:text-white'
          }`}
        >
          Favorites
        </button>
      </div>

      {/* Filter bar with BPM Sort button */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter by title, artist, BPM..."
            className="w-full bg-[#181a2e] text-white placeholder-white/40 text-xs rounded-xl px-3.5 py-3 border border-white/10 focus:outline-none focus:border-pink-500/50"
          />
        </div>
        <button
          onClick={() => setBpmSortAsc(!bpmSortAsc)}
          className={`flex items-center gap-1 px-3 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
            bpmSortAsc
              ? 'bg-pink-600/20 border-pink-500 text-pink-300'
              : 'bg-[#181a2e] border-white/10 text-white/80'
          }`}
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-pink-400" />
          <span>BPM</span>
        </button>
      </div>

      {/* 2 Quick Access Cards matching screenshot 4 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Offline Vault */}
        <div
          onClick={() => setIsOfflineVaultOpen(true)}
          className="p-3.5 rounded-2xl bg-[#15232a] border border-emerald-500/30 flex items-center gap-3 cursor-pointer hover:bg-emerald-950/30 transition active:scale-98 shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">Offline Vault</h4>
            <p className="text-[10px] text-white/60 mt-0.5">{storage.offlineCount} MP3/FLAC</p>
          </div>
        </div>

        {/* Liked Tracks */}
        <div
          onClick={() => setActiveTabState('favorites')}
          className="p-3.5 rounded-2xl bg-[#23152a] border border-pink-500/30 flex items-center gap-3 cursor-pointer hover:bg-pink-950/30 transition active:scale-98 shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">Liked Tracks</h4>
            <p className="text-[10px] text-white/60 mt-0.5">{likedCount + 50} Favorites</p>
          </div>
        </div>
      </div>

      {/* Playlists View when activeTab === 'playlists' */}
      {activeTab === 'playlists' && (
        <div className="space-y-3 mb-6">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setSelectedPlaylistId(pl.id)}
              className="p-3 rounded-2xl bg-[#181a2e] border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pl.coverGradient} flex items-center justify-center text-white font-bold shadow-md`}>
                  <Music2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{pl.name}</h4>
                  <p className="text-[11px] text-white/60">{pl.trackIds.length} tracks · {pl.category}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-pink-400 bg-pink-500/15 px-2 py-0.5 rounded-full border border-pink-500/20">
                {pl.badge}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Track List */}
      {activeTab !== 'playlists' && (
        <div className="space-y-2.5">
          {filtered.map((track) => {
            const isExpanded = expandedTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`rounded-2xl transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-[#1e1a2e] border-2 border-[#ff1e6d] shadow-[0_0_20px_rgba(255,30,109,0.3)]'
                    : 'bg-[#181a2e] border border-white/10 hover:bg-white/5'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => playTrack(track, filtered)}
                  className="p-3 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <div className="flex items-center gap-0.5 h-4">
                        <span className="w-1 h-3 bg-white rounded-full" />
                        <span className="w-1 h-5 bg-white rounded-full" />
                        <span className="w-1 h-2 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">
                        {track.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {track.type === 'offline_flac'
                            ? 'Offline FLAC'
                            : track.type === 'offline_wav'
                            ? 'Offline WAV'
                            : track.type === 'youtube'
                            ? 'YouTube Link'
                            : 'Offline MP3'}
                        </span>
                        <span className="text-[11px] text-white/60 truncate">
                          {track.artist} · {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(track.id);
                      }}
                      className="p-2 text-white/40 hover:text-pink-500 transition cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${track.isFavorite ? 'text-pink-500 fill-pink-500' : ''}`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedTrackId(isExpanded ? null : track.id);
                      }}
                      className={`p-2 transition rounded-lg cursor-pointer ${
                        isExpanded ? 'bg-[#ff1e6d] text-white' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Action Menu (matching Screenshot 4 bottom card) */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-white/10 flex items-center justify-around gap-2 text-xs font-semibold">
                    <button
                      onClick={() => {
                        const hiit = playlists.find((p) => p.id === 'playlist-hiit-beast');
                        if (hiit) addTrackToPlaylist(hiit.id, track.id);
                      }}
                      className="flex items-center gap-1.5 text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-pink-400" />
                      <span>Add to Playlist</span>
                    </button>

                    <button
                      onClick={() => {
                        playTrack(track);
                        addToast({
                          type: 'info',
                          title: 'Queue Updated',
                          message: `${track.title} playing next.`,
                        });
                      }}
                      className="flex items-center gap-1.5 text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                      <PlaySquare className="w-3.5 h-3.5 text-purple-400" />
                      <span>Play Next</span>
                    </button>

                    <button
                      onClick={() => deleteTrack(track.id)}
                      className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 py-1.5 px-2 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
