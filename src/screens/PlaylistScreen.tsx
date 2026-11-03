import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Flame,
  Pencil,
  Play,
  Shuffle,
  Plus,
  GripVertical,
  MinusCircle,
  ArrowLeft,
  Youtube,
  Music2,
  Zap,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Track } from '../types';

export const PlaylistScreen: React.FC = () => {
  const {
    activePlaylist,
    playlists,
    tracks,
    playTrack,
    reorderPlaylistTracks,
    removeTrackFromPlaylist,
    setSelectedPlaylistId,
    setActiveTab,
    addToast,
  } = usePlayer();

  const [activeCategory, setActiveCategory] = useState('Gym Motivation');
  const [draggingTrackIndex, setDraggingTrackIndex] = useState<number | null>(1); // Match screenshot 2nd track dragging state!

  const currentPlaylist = activePlaylist || playlists[0];

  const playlistTracks = currentPlaylist
    ? currentPlaylist.trackIds
        .map((id) => tracks.find((t) => t.id === id))
        .filter((t): t is Track => t !== undefined)
    : [];

  const offlineCount = playlistTracks.filter((t) => t.type !== 'youtube').length;
  const ytCount = playlistTracks.filter((t) => t.type === 'youtube').length;

  const handleMoveUp = (index: number) => {
    if (index > 0 && currentPlaylist) {
      reorderPlaylistTracks(currentPlaylist.id, index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < playlistTracks.length - 1 && currentPlaylist) {
      reorderPlaylistTracks(currentPlaylist.id, index, index + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* Back button row */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setSelectedPlaylistId(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mixes</span>
        </button>
      </div>

      {/* Header Banner matching screenshot 6 */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#ff1e6d]/20 via-[#4a1240]/40 to-[#1e1338]/60 border border-white/10 shadow-xl mb-4 relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          {/* Cover Art Box with Flame and CHANGE button */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#ff1e6d] via-[#db1b78] to-[#7928ca] p-2 flex flex-col items-center justify-between shadow-lg flex-shrink-0">
            <Flame className="w-8 h-8 text-white fill-white mt-1" />
            <button
              onClick={() => {
                addToast({
                  type: 'info',
                  title: 'Cover Customizer',
                  message: 'Custom workout artwork updated.',
                });
              }}
              className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-wider hover:bg-black/60 transition cursor-pointer"
            >
              CHANGE
            </button>
          </div>

          {/* Title & Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#063825] border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                {currentPlaylist?.badge || 'CUSTOM WORKOUT SET'}
              </span>
              <button
                onClick={() => {
                  const newName = prompt('Enter new playlist name:', currentPlaylist?.name);
                  if (newName) {
                    addToast({
                      type: 'success',
                      title: 'Playlist Renamed',
                      message: `Renamed to ${newName}`,
                    });
                  }
                }}
                className="p-1 text-white/50 hover:text-white cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              {currentPlaylist?.name || 'HIIT Beast Mode'}
            </h2>
            <p className="text-[11px] text-white/70 font-medium mt-1">
              {playlistTracks.length || 24} Tracks · {currentPlaylist?.totalDuration || '1h 18m'} · {offlineCount || 19} Offline / {ytCount || 5} YT
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Categories Chips matching screenshot 6 */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
          SUGGESTED CATEGORIES
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          {['Gym Motivation', 'Morning Run', 'Cardio', 'Chill', 'Focus'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.45)]'
                  : 'bg-[#181a2e] text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Action Buttons: Play All, Shuffle, + Add */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => {
            if (playlistTracks.length > 0) playTrack(playlistTracks[0], playlistTracks);
          }}
          className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff1e6d] to-[#db1b78] hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,30,109,0.35)] transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Play All</span>
        </button>

        <button
          onClick={() => {
            if (playlistTracks.length > 0) {
              const shuffled = [...playlistTracks].sort(() => Math.random() - 0.5);
              playTrack(shuffled[0], shuffled);
            }
          }}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#24273d] hover:bg-[#2d314d] active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          <span>Shuffle</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className="w-12 h-12 rounded-2xl bg-[#ff1e6d]/20 hover:bg-[#ff1e6d]/30 text-[#ff1e6d] border border-[#ff1e6d]/40 flex items-center justify-center transition active:scale-90 flex-shrink-0 cursor-pointer"
          title="Add Music"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Reorder Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
          DRAG HANDLE TO REORDER TRACKS
        </span>
        <button
          onClick={() => setActiveTab('search')}
          className="text-xs font-bold text-pink-400 hover:text-pink-300 transition cursor-pointer"
        >
          + Add Music
        </button>
      </div>

      {/* Playlist Track List matching screenshot 6 */}
      <div className="space-y-2">
        {playlistTracks.map((track, idx) => {
          const isDragging = draggingTrackIndex === idx;

          return (
            <div
              key={track.id}
              onClick={() => playTrack(track, playlistTracks)}
              className={`p-3 rounded-2xl flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                isDragging
                  ? 'bg-[#221c35] border-2 border-[#ff1e6d] shadow-[0_0_20px_rgba(255,30,109,0.4)] scale-[1.01]'
                  : 'bg-[#181a2e] border border-white/10 hover:bg-white/5'
              }`}
            >
              {/* Drag Handle & Reorder helpers */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDraggingTrackIndex(isDragging ? null : idx);
                }}
                className="flex items-center text-white/40 hover:text-white cursor-grab p-1"
                title="Click to toggle dragging mode"
              >
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Icon Square */}
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${
                  track.type === 'youtube'
                    ? 'from-rose-500 via-pink-600 to-purple-600'
                    : idx === 0
                    ? 'from-pink-500 via-rose-500 to-purple-600'
                    : idx === 1
                    ? 'from-cyan-500 to-blue-600'
                    : 'from-blue-600 via-purple-600 to-pink-500'
                } flex items-center justify-center flex-shrink-0 shadow-md`}
              >
                {track.type === 'youtube' ? (
                  <Youtube className="w-5 h-5 text-white" />
                ) : idx === 1 ? (
                  <Flame className="w-5 h-5 text-white fill-white" />
                ) : idx === 3 ? (
                  <Zap className="w-5 h-5 text-white" />
                ) : (
                  <Music2 className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Track Title & Details */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {idx + 1}. {track.title} {isDragging ? '(Dragging)' : ''}
                </h4>
                <p className="text-[11px] text-white/60 truncate mt-0.5">
                  {track.type === 'youtube' ? 'YouTube Link' : track.type === 'offline_flac' ? 'Offline FLAC' : 'Offline MP3'} · {track.artist} · {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </p>
              </div>

              {/* Up/Down Quick Reorder Arrows if dragging */}
              {isDragging && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(idx);
                    }}
                    disabled={idx === 0}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(idx);
                    }}
                    disabled={idx === playlistTracks.length - 1}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Remove Track Button (Minus Circle) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentPlaylist) {
                    removeTrackFromPlaylist(currentPlaylist.id, track.id);
                  }
                }}
                className="p-1.5 text-white/40 hover:text-rose-400 transition cursor-pointer"
                title="Remove from playlist"
              >
                <MinusCircle className="w-5 h-5 text-white/40 hover:text-rose-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
