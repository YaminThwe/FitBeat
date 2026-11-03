import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Flame,
  Plus,
  Search as SearchIcon,
  SlidersHorizontal,
  Dumbbell,
  Zap,
  Leaf,
  Heart,
  Play,
  MoreVertical,
  CheckCircle2,
  Footprints,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    playlists,
    tracks,
    playTrack,
    setSelectedPlaylistId,
    setActiveTab,
    toggleFavorite,
  } = usePlayer();

  const [activeCategory, setActiveCategory] = useState<string>('Workout');
  const [searchQuery, setSearchQuery] = useState('');

  const hiitPlaylist = playlists.find((p) => p.id === 'playlist-hiit-beast') || playlists[0];
  const tempoPlaylist = playlists.find((p) => p.id === 'playlist-5k-morning') || playlists[1];

  const handlePlaylistClick = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
  };

  const filteredTracks = tracks.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.bpm.toString().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* 5-Day Workout Streak Header */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-pink-400 mb-1 tracking-wider uppercase">
        <Flame className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
        <span>5-Day Workout Streak</span>
      </div>

      {/* Main Greeting & Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Ready to move?
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('search')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-pink-400 flex items-center justify-center transition active:scale-90 cursor-pointer"
            title="Add Music / Discover"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div
            onClick={() => setActiveTab('settings')}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-md cursor-pointer border border-white/20"
            title="User Profile & Settings"
          >
            AX
          </div>
        </div>
      </div>

      {/* Search Bar matching screenshot 2 */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/40">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your music, BPM, or playlists..."
          className="w-full bg-[#181a2e] text-white placeholder-white/40 text-xs rounded-2xl pl-10 pr-10 py-3.5 border border-white/10 focus:outline-none focus:border-pink-500/50 transition-colors"
        />
        <button
          onClick={() => setActiveTab('library')}
          className="absolute inset-y-0 right-3 flex items-center text-purple-400 hover:text-white transition"
          title="Filter BPM and format"
        >
          <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Category Pills matching screenshot 2 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-5 -mx-4 px-4">
        <button
          onClick={() => setActiveCategory('Workout')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'Workout'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
              : 'bg-[#181b2e] text-white/70 hover:text-white'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Workout</span>
        </button>

        <button
          onClick={() => setActiveCategory('Running')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'Running'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
              : 'bg-[#181b2e] text-white/70 hover:text-white'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>Running</span>
        </button>

        <button
          onClick={() => setActiveCategory('Energy')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'Energy'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
              : 'bg-[#181b2e] text-white/70 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Energy</span>
        </button>

        <button
          onClick={() => setActiveCategory('Relax')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'Relax'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
              : 'bg-[#181b2e] text-white/70 hover:text-white'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Relax</span>
        </button>

        <button
          onClick={() => setActiveCategory('Favorites')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'Favorites'
              ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
              : 'bg-[#181b2e] text-white/70 hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>Favorites</span>
        </button>
      </div>

      {/* Featured Workout Mixes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Featured Workout Mixes
          </h3>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition cursor-pointer"
          >
            See All
          </button>
        </div>

        {/* 2 Big Cards Grid matching screenshot 2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: HIIT Beast Mode */}
          {hiitPlaylist && (
            <div
              onClick={() => handlePlaylistClick(hiitPlaylist.id)}
              className="relative p-4 rounded-3xl bg-gradient-to-b from-pink-600 via-rose-600 to-purple-800 border border-white/10 shadow-lg cursor-pointer overflow-hidden group hover:brightness-105 active:scale-98 transition-all flex flex-col justify-between h-44"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-emerald-400 text-[9px] font-black uppercase tracking-wider border border-emerald-500/30">
                  <CheckCircle2 className="w-2.5 h-2.5" /> OFFLINE
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const plTracks = tracks.filter((t) => hiitPlaylist.trackIds.includes(t.id));
                    if (plTracks.length > 0) playTrack(plTracks[0], plTracks);
                  }}
                  className="w-9 h-9 rounded-full bg-white text-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-pink-600 ml-0.5" />
                </button>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white leading-tight">
                  {hiitPlaylist.name}
                </h4>
                <p className="text-[11px] text-white/80 font-medium mt-1">
                  24 Tracks · 165 BPM
                </p>
              </div>
            </div>
          )}

          {/* Card 2: 5K Morning Tempo */}
          {tempoPlaylist && (
            <div
              onClick={() => handlePlaylistClick(tempoPlaylist.id)}
              className="relative p-4 rounded-3xl bg-gradient-to-b from-blue-600 via-indigo-600 to-cyan-700 border border-white/10 shadow-lg cursor-pointer overflow-hidden group hover:brightness-105 active:scale-98 transition-all flex flex-col justify-between h-44"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-purple-200 text-[9px] font-black uppercase tracking-wider border border-purple-400/30">
                  MIXED
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const plTracks = tracks.filter((t) => tempoPlaylist.trackIds.includes(t.id));
                    if (plTracks.length > 0) playTrack(plTracks[0], plTracks);
                  }}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white leading-tight">
                  {tempoPlaylist.name}
                </h4>
                <p className="text-[11px] text-white/80 font-medium mt-1">
                  18 Tracks · 150 BPM · 54m
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Listening Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Continue Listening
          </h3>
          <span className="text-xs font-semibold text-white/50">History</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Item 1 */}
          <div
            onClick={() => {
              const track = tracks.find((t) => t.title.includes('Power Lift')) || tracks[0];
              playTrack(track);
            }}
            className="p-3 rounded-2xl bg-[#181a2e] border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">Power Lift 2026</h5>
              <p className="text-[10px] text-white/60 truncate mt-0.5">Offline · 68% done</p>
            </div>
          </div>

          {/* Item 2 */}
          <div
            onClick={() => {
              const track = tracks.find((t) => t.title.includes('Night Jog')) || tracks[1];
              playTrack(track);
            }}
            className="p-3 rounded-2xl bg-[#181a2e] border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Footprints className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">Night Jog Synth</h5>
              <p className="text-[10px] text-white/60 truncate mt-0.5">Offline · 14 tracks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Recently Played
          </h3>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            Offline Ready
          </span>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          {filteredTracks.slice(0, 4).map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className="p-3 rounded-2xl bg-[#181a2e] border border-white/10 flex items-center justify-between gap-3 hover:bg-white/5 transition cursor-pointer active:scale-99"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <div className="flex items-center gap-0.5 h-4">
                    <span className="w-1 h-3 bg-white rounded-full" />
                    <span className="w-1 h-4 bg-white rounded-full" />
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
                      {track.type === 'youtube' ? 'YouTube' : 'Offline MP3'}
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
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-white/40 hover:text-white transition cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
