import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  ChevronDown,
  CheckCircle2,
  Lock,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Volume1,
  Dumbbell,
  Radio,
} from 'lucide-react';

export const NowPlayingModal: React.FC = () => {
  const {
    isFullPlayerOpen,
    setIsFullPlayerOpen,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seekTo,
    nextTrack,
    prevTrack,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    toggleFavorite,
    volume,
    setVolume,
    toggleMute,
    isMuted,
    setActiveTab,
    queue,
  } = usePlayer();

  if (!isFullPlayerOpen || !currentTrack) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const remainingTime = duration - currentTime;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const nextTrackItem = queue.length > 1 ? queue[1] : null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#2b0c2e] via-[#150f24] to-[#0d091a] text-white flex flex-col justify-between p-5 pt-8 overflow-y-auto animate-in slide-in-from-bottom duration-300 max-w-md mx-auto">
      {/* Top Header Bar matching screenshot 5 */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => setIsFullPlayerOpen(false)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <div className="text-center min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-pink-300 truncate">
            PLAYING FROM WORKOUT MIX
          </p>
          <p className="text-xs font-bold text-white/90 truncate mt-0.5">
            HIIT Beast Mode · {currentTrack.bpm} BPM
          </p>
        </div>

        {currentTrack.type === 'youtube' ? (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
            <Radio className="w-3 h-3" /> ONLINE
          </span>
        ) : (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> OFFLINE
          </span>
        )}
      </div>

      {/* Big Album Art Card matching screenshot 5 */}
      <div className="my-auto py-2">
        <div className="relative w-full aspect-square rounded-[36px] bg-gradient-to-tr from-[#ff1e6d] via-[#a824e8] to-[#00d4ff] p-5 flex flex-col justify-between shadow-[0_0_50px_rgba(255,30,109,0.4)] overflow-hidden">
          {/* Inner Badges */}
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/15">
              <Lock className="w-3 h-3 text-white/80" /> Lock-Screen Audio Active
            </span>
            <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-bold text-white/90 border border-white/15">
              {currentTrack.type === 'youtube' ? 'YouTube Stream' : currentTrack.bitrate || 'FLAC · 24-bit'}
            </span>
          </div>

          {/* Center Visualizer Ring */}
          <div className="flex items-center justify-center my-auto z-10">
            <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-inner">
              <div className="flex items-end gap-1.5 h-12">
                <span className={`w-1.5 bg-white rounded-full ${isPlaying ? 'h-6 animate-wave-1' : 'h-4'}`} />
                <span className={`w-1.5 bg-white rounded-full ${isPlaying ? 'h-11 animate-wave-2' : 'h-8'}`} />
                <span className={`w-1.5 bg-white rounded-full ${isPlaying ? 'h-8 animate-wave-3' : 'h-5'}`} />
                <span className={`w-1.5 bg-white rounded-full ${isPlaying ? 'h-12 animate-wave-4' : 'h-10'}`} />
                <span className={`w-1.5 bg-white rounded-full ${isPlaying ? 'h-5 animate-wave-5' : 'h-3'}`} />
              </div>
            </div>
          </div>

          {/* Bottom Waveform Bars */}
          <div className="flex items-end justify-between gap-1 h-12 z-10 px-2 opacity-90">
            {Array.from({ length: 24 }).map((_, i) => {
              const hClass = [
                'h-4', 'h-8', 'h-12', 'h-6', 'h-10', 'h-5', 'h-9', 'h-11', 'h-7', 'h-4', 'h-9', 'h-12',
                'h-6', 'h-10', 'h-5', 'h-8', 'h-11', 'h-6', 'h-9', 'h-4', 'h-8', 'h-12', 'h-7', 'h-5',
              ][i % 24];
              return (
                <span
                  key={i}
                  className={`w-1.5 bg-white rounded-full ${hClass} ${
                    isPlaying ? 'animate-pulse' : 'opacity-70'
                  }`}
                  style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
                />
              );
            })}
          </div>
        </div>

        {/* Track Title, Artist & Like Button */}
        <div className="flex items-center justify-between mt-6 px-1">
          <div className="min-w-0 flex-1 pr-3">
            <h2 className="text-2xl font-black text-white tracking-tight truncate">
              {currentTrack.title}
            </h2>
            <p className="text-xs text-white/70 font-semibold truncate mt-1">
              {currentTrack.artist} · {currentTrack.album}
            </p>
          </div>

          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className="w-12 h-12 rounded-full bg-[#ff1e6d]/15 hover:bg-[#ff1e6d]/30 text-[#ff1e6d] flex items-center justify-center transition active:scale-90 flex-shrink-0 cursor-pointer"
          >
            <Heart
              className={`w-6 h-6 ${
                currentTrack.isFavorite ? 'text-[#ff1e6d] fill-[#ff1e6d]' : 'text-white/60'
              }`}
            />
          </button>
        </div>

        {/* Scrubber Bar matching screenshot 5 */}
        <div className="mt-5 px-1">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              seekTo(ratio * duration);
            }}
            className="relative w-full h-3 bg-white/10 rounded-full cursor-pointer group flex items-center"
          >
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#ff1e6d] via-[#db1b78] to-[#00d68f] relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,30,109,0.8)] border-2 border-[#ff1e6d] group-hover:scale-125 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-white/60 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span className="text-pink-300 font-extrabold uppercase tracking-wider text-[10px]">
              HIGH INTENSITY DROP
            </span>
            <span>-{formatTime(remainingTime > 0 ? remainingTime : 0)}</span>
          </div>
        </div>

        {/* Transport Controls matching screenshot 5 */}
        <div className="flex items-center justify-between mt-5 px-3">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer ${
              isShuffle ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.5)]' : 'text-white/50 hover:text-white'
            }`}
          >
            <Shuffle className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={prevTrack}
            className="w-14 h-14 rounded-2xl bg-[#24273d] hover:bg-[#2e324d] text-white flex items-center justify-center transition active:scale-90 cursor-pointer shadow-md"
          >
            <SkipBack className="w-6 h-6 fill-white" />
          </button>

          {/* Big Glowing Pause/Play Button */}
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#ff1e6d] to-[#ff0055] hover:brightness-110 text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,30,109,0.7)] active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-9 h-9 fill-white" />
            ) : (
              <Play className="w-9 h-9 fill-white ml-1" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={nextTrack}
            className="w-14 h-14 rounded-2xl bg-[#24273d] hover:bg-[#2e324d] text-white flex items-center justify-center transition active:scale-90 cursor-pointer shadow-md"
          >
            <SkipForward className="w-6 h-6 fill-white" />
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer ${
              repeatMode !== 'off'
                ? 'bg-[#ff1e6d] text-white shadow-[0_0_12px_rgba(255,30,109,0.5)]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>

        {/* Volume Bar matching screenshot 5 */}
        <div className="flex items-center gap-3 mt-6 px-4 py-2.5 rounded-2xl bg-[#181a2e]/60 border border-white/5">
          <button onClick={toggleMute} className="text-white/60 hover:text-white cursor-pointer">
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume1 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-[#ff1e6d] h-1.5 bg-white/20 rounded-lg cursor-pointer"
          />

          <Volume2 className="w-4 h-4 text-white/60" />
          <span className="text-xs font-bold text-white/80 w-8 text-right">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      </div>

      {/* Up Next & Gym UI Bar matching screenshot 5 */}
      <div className="mt-4 p-3 rounded-2xl bg-[#1b1e33] border border-white/10 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">
            Up Next: {nextTrackItem?.title || 'Titanium Sprint · Pendulum'}
          </p>
          <p className="text-[10px] text-white/50 truncate mt-0.5">
            Queue ({queue.length || 14}) · Lock Play On
          </p>
        </div>

        <button
          onClick={() => {
            setIsFullPlayerOpen(false);
            setActiveTab('workout');
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#9b1147] to-[#ff1e6d] text-white font-extrabold text-xs shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer flex-shrink-0"
        >
          <Dumbbell className="w-4 h-4" />
          <span>Gym UI</span>
        </button>
      </div>
    </div>
  );
};
