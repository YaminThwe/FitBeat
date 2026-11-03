import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Flame,
  Lock,
  Unlock,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Footprints,
  Dumbbell,
} from 'lucide-react';

export const WorkoutScreen: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    workoutTimer,
    pauseWorkoutTimer,
    resetWorkoutTimer,
    addWorkoutMinute,
    toggleWorkoutLock,
    quickSwitchWorkoutPlaylist,
    playlists,
  } = usePlayer();

  const formatTimerMinutes = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const timerPercent = (workoutTimer.secondsRemaining / workoutTimer.totalRoundSeconds) * 100;
  const trackProgressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3d0822] via-[#240e2d] to-[#150a24] text-white pb-32 pt-2 px-4 max-w-md mx-auto select-none">
      {/* Top Bar matching screenshot 8 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff1e6d] text-white font-black text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(255,30,109,0.5)]">
          <Flame className="w-4 h-4 fill-white" />
          <span>WORKOUT MODE</span>
        </div>

        <button
          onClick={toggleWorkoutLock}
          className={`w-11 h-9 rounded-2xl flex items-center justify-center border transition cursor-pointer ${
            workoutTimer.isScreenLocked
              ? 'bg-[#ff1e6d]/30 border-[#ff1e6d] text-pink-300'
              : 'bg-[#181a2e]/60 border-white/10 text-white/60 hover:text-white'
          }`}
          title={workoutTimer.isScreenLocked ? 'Unlock Screen Controls' : 'Lock Screen to prevent accidental taps'}
        >
          {workoutTimer.isScreenLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>

      {/* HIIT Interval Timer Card matching screenshot 8 */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#8b245a]/30 via-[#3a204d]/40 to-[#221c3b]/50 border border-white/15 backdrop-blur-xl shadow-2xl mb-6">
        <div className="flex items-center gap-4">
          {/* Circular Timer Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#222438]"
                strokeWidth="7"
                fill="none"
              />
              {/* Progress Ring in Glowing Hot Pink */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#ff1e6d] transition-all duration-500"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - timerPercent / 100)}
              />
            </svg>

            {/* Inner Timer Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-white tracking-tight leading-none">
                {formatTimerMinutes(workoutTimer.secondsRemaining)}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-pink-300 mt-1">
                {workoutTimer.isPaused ? 'PAUSED' : 'ACTIVE'}
              </span>
            </div>
          </div>

          {/* Right Info & Controls */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-200/80">
                HIIT INTERVAL TIMER
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#7a1236] text-white text-[9px] font-extrabold tracking-wider">
                160 BPM
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-white tracking-tight mb-2.5">
              Round {workoutTimer.currentRound} of {workoutTimer.totalRounds} · {workoutTimer.phase}
            </h3>

            {/* Timer Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={pauseWorkoutTimer}
                className="flex-1 py-1.5 px-2 rounded-xl bg-[#24273d] hover:bg-[#2e324d] text-white font-bold text-[11px] transition cursor-pointer"
              >
                {workoutTimer.isPaused ? 'Start Timer' : 'Pause Timer'}
              </button>
              <button
                onClick={addWorkoutMinute}
                className="py-1.5 px-2.5 rounded-xl bg-[#591d79] hover:bg-[#6c2394] text-white font-bold text-[11px] transition cursor-pointer"
              >
                +1 Min
              </button>
              <button
                onClick={resetWorkoutTimer}
                className="py-1.5 px-2.5 rounded-xl bg-[#24273d] hover:bg-[#2e324d] text-white/80 font-bold text-[11px] transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* One-Tap Playlist Switch Section matching screenshot 8 */}
      <div className="mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2.5">
          ONE-TAP PLAYLIST SWITCH
        </p>
        <div className="grid grid-cols-3 gap-2">
          {/* HIIT Beast */}
          <button
            onClick={() => quickSwitchWorkoutPlaylist('playlist-hiit-beast')}
            className="py-3 px-2 rounded-2xl bg-[#ff1e6d] hover:bg-[#ff0055] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,30,109,0.5)] active:scale-95 transition cursor-pointer truncate"
          >
            <Flame className="w-4 h-4 fill-white flex-shrink-0" />
            <span className="truncate">HIIT Beast</span>
          </button>

          {/* Cardio Run */}
          <button
            onClick={() => quickSwitchWorkoutPlaylist('playlist-cardio-run')}
            className="py-3 px-2 rounded-2xl bg-[#24273d] hover:bg-[#2d314d] text-white/90 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer border border-white/5 truncate"
          >
            <Footprints className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Cardio Run</span>
          </button>

          {/* Heavy Lift */}
          <button
            onClick={() => quickSwitchWorkoutPlaylist('playlist-heavy-lift')}
            className="py-3 px-2 rounded-2xl bg-[#24273d] hover:bg-[#2d314d] text-white/90 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer border border-white/5 truncate"
          >
            <Dumbbell className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Heavy Lift</span>
          </button>
        </div>
      </div>

      {/* Large Glanceable Track Display matching screenshot 8 */}
      <div className="p-5 rounded-3xl bg-[#1b1c2e]/90 border border-white/10 shadow-2xl mb-8 text-center relative overflow-hidden">
        {/* Header Marquee Label */}
        <p className="text-[11px] font-black uppercase tracking-widest text-pink-300 mb-2">
          OFFLINE AUDIO · ZERO BUFFER
        </p>

        {/* Giant Track Title */}
        <h2 className="text-2xl font-black text-white tracking-tight truncate mb-1">
          {currentTrack?.title || 'Neon Pulse (160 BPM)'}
        </h2>
        <p className="text-xs font-semibold text-white/70 mb-4">
          {currentTrack?.artist || 'Kaskade & Kavinsky'} · {formatTimerMinutes(currentTime)} / {formatTimerMinutes(duration)}
        </p>

        {/* Neon Progress Bar */}
        <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff1e6d] via-[#a824e8] to-[#00d4ff] rounded-full transition-all duration-300"
            style={{ width: `${trackProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Giant Glanceable Playback Controls matching screenshot 8 */}
      <div className="flex items-center justify-between px-2">
        {/* PREV */}
        <button
          onClick={prevTrack}
          disabled={workoutTimer.isScreenLocked}
          className="w-24 h-24 rounded-3xl bg-[#25283f] hover:bg-[#2f324e] text-white flex flex-col items-center justify-center gap-1 shadow-lg active:scale-90 transition disabled:opacity-40 cursor-pointer"
        >
          <SkipBack className="w-8 h-8 fill-white" />
          <span className="text-[10px] font-black tracking-widest text-white/70">PREV</span>
        </button>

        {/* HUGE GLOWING PAUSE / PLAY */}
        <button
          onClick={togglePlay}
          disabled={workoutTimer.isScreenLocked}
          className="w-32 h-32 rounded-[38px] bg-gradient-to-tr from-[#ff1e6d] via-[#ff0066] to-[#db1b78] hover:brightness-110 text-white flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_rgba(255,30,109,0.7)] active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-12 h-12 fill-white" />
              <span className="text-[11px] font-black tracking-widest">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-12 h-12 fill-white ml-1.5" />
              <span className="text-[11px] font-black tracking-widest">PLAY</span>
            </>
          )}
        </button>

        {/* NEXT */}
        <button
          onClick={nextTrack}
          disabled={workoutTimer.isScreenLocked}
          className="w-24 h-24 rounded-3xl bg-[#25283f] hover:bg-[#2f324e] text-white flex flex-col items-center justify-center gap-1 shadow-lg active:scale-90 transition disabled:opacity-40 cursor-pointer"
        >
          <SkipForward className="w-8 h-8 fill-white" />
          <span className="text-[10px] font-black tracking-widest text-white/70">NEXT</span>
        </button>
      </div>
    </div>
  );
};
