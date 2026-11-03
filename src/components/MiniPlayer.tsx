import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipForward, Heart, Music2, Wifi, Zap } from 'lucide-react';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    toggleFavorite,
    setIsFullPlayerOpen,
    activeTab,
  } = usePlayer();

  if (!currentTrack || activeTab === 'workout') {
    // Hide mini-player in distraction-free workout mode because Workout mode has its own giant controls!
    return null;
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-[74px] left-3 right-3 z-30 max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-[#1d1f33]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all">
        {/* Main Content Area */}
        <div className="flex items-center justify-between p-2.5 pl-3 gap-3">
          {/* Track Info (clickable to open full Now Playing screen) */}
          <div
            onClick={() => setIsFullPlayerOpen(true)}
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group"
          >
            {/* Album Art with Equalizer Animation when playing */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-5">
                  <span className="w-1 bg-white rounded-full h-3 animate-wave-1" />
                  <span className="w-1 bg-white rounded-full h-5 animate-wave-2" />
                  <span className="w-1 bg-white rounded-full h-2 animate-wave-3" />
                  <span className="w-1 bg-white rounded-full h-4 animate-wave-4" />
                </div>
              ) : (
                <Music2 className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Title & Artist */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-white truncate tracking-wide group-hover:text-pink-400 transition">
                  {currentTrack.title}
                </h4>
                {currentTrack.type === 'youtube' ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider flex-shrink-0">
                    YT LINK
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 text-[9px] font-black rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex-shrink-0">
                    OFFLINE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                {currentTrack.artist} · {currentTrack.album}
              </p>
            </div>
          </div>

          {/* Controls: Like, Play/Pause, Next */}
          <div className="flex items-center gap-2 flex-shrink-0 pr-1">
            <button
              onClick={() => toggleFavorite(currentTrack.id)}
              className="p-1.5 text-white/50 hover:text-pink-500 transition active:scale-90 cursor-pointer"
              title="Favorite track"
            >
              <Heart
                className={`w-5 h-5 ${
                  currentTrack.isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white/40'
                }`}
              />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#ff1e6d] hover:bg-[#ff0055] text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,30,109,0.5)] active:scale-90 transition-transform cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-1.5 text-white/70 hover:text-white transition active:scale-90 cursor-pointer"
              title="Next track"
            >
              <SkipForward className="w-5 h-5 fill-white/80" />
            </button>
          </div>
        </div>

        {/* Progress Bar Line at bottom of Mini Player */}
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff1e6d] via-[#db1b78] to-[#00d68f] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
