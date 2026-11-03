import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Download, Youtube, Dumbbell, ArrowRight, Zap, Music2 } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setShowOnboarding, updateSettings, setActiveTab } = usePlayer();

  const handleGetStarted = () => {
    updateSettings({ hasCompletedOnboarding: true });
    setShowOnboarding(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#180a22] via-[#0e101d] to-[#0c0d18] text-white flex flex-col justify-between p-5 pb-8 relative overflow-hidden max-w-md mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-[#ff1e6d]/25 to-[#7928ca]/25 blur-3xl pointer-events-none rounded-full" />

      {/* Top Brand Hero */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2">
        {/* Glowing Logo Icon */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#ff1e6d] via-[#db1b78] to-[#7928ca] p-0.5 shadow-[0_0_35px_rgba(255,30,109,0.55)] flex items-center justify-center mb-4 relative">
          <div className="flex items-center gap-1.5 h-12">
            <span className="w-2 h-7 bg-white rounded-full" />
            <span className="w-2 h-12 bg-white rounded-full" />
            <span className="w-2 h-14 bg-white rounded-full" />
            <span className="w-2 h-10 bg-white rounded-full" />
            <span className="w-2 h-5 bg-white rounded-full" />
          </div>
        </div>

        {/* Ad-Free Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d0f28] border border-[#ff1e6d]/40 text-[#ff4d8d] text-[10px] font-black tracking-widest uppercase mb-3">
          <Zap className="w-3 h-3 fill-current" />
          AD-FREE · OFFLINE · WORKOUT READY
        </div>

        {/* Main Headings */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
          FitBeat
        </h1>
        <h2 className="text-xl font-bold tracking-tight text-pink-100 mb-2">
          Your Music. Your Workout.<br />Your Rules.
        </h2>
        <p className="text-xs text-white/70 max-w-xs leading-relaxed">
          Discover tracks via YouTube links, organize high-energy workout playlists, and play your owned audio files 100% offline with zero interruptions.
        </p>

        {/* 160 BPM Cardio Sync Waveform Box */}
        <div className="w-full mt-4 p-3 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-indigo-950/40 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 h-7 flex-1 pr-3">
            <span className="w-1.5 h-4 bg-purple-400 rounded-full animate-wave-1" />
            <span className="w-1.5 h-7 bg-pink-500 rounded-full animate-wave-2" />
            <span className="w-1.5 h-6 bg-rose-400 rounded-full animate-wave-3" />
            <span className="w-1.5 h-7 bg-purple-400 rounded-full animate-wave-4" />
            <span className="w-1.5 h-5 bg-cyan-400 rounded-full animate-wave-5" />
            <span className="w-1.5 h-7 bg-pink-500 rounded-full animate-wave-1" />
            <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-wave-2" />
            <span className="w-1.5 h-6 bg-pink-500 rounded-full animate-wave-3" />
            <span className="w-1.5 h-3 bg-purple-400 rounded-full animate-wave-4" />
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-black text-pink-300 tracking-wider">160 BPM</span>
            <p className="text-[10px] text-white/50">Cardio Sync</p>
          </div>
        </div>
      </div>

      {/* Feature Cards matching screenshot 1 */}
      <div className="relative z-10 space-y-2.5 my-4">
        {/* Card 1: True Offline Playback */}
        <div className="p-3.5 rounded-2xl bg-[#181a2c] border border-white/8 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">True Offline Playback</h4>
            <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
              Play legally owned MP3, FLAC & WAV files without Wi-Fi or data.
            </p>
          </div>
        </div>

        {/* Card 2: YouTube Link Discovery */}
        <div className="p-3.5 rounded-2xl bg-[#181a2c] border border-white/8 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">YouTube Link Discovery</h4>
            <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
              Paste any YouTube Music or video link to bookmark & organize sets.
            </p>
          </div>
        </div>

        {/* Card 3: Distraction-Free Workout Mode */}
        <div className="p-3.5 rounded-2xl bg-[#181a2c] border border-white/8 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-[#ff1e6d] flex items-center justify-center flex-shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">Distraction–Free Workout Mode</h4>
            <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
              Oversized controls, BPM timer, and lock-screen background play.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Button & Dots */}
      <div className="relative z-10 pt-2 flex flex-col items-center gap-4">
        <button
          onClick={handleGetStarted}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff1e6d] via-[#f51463] to-[#db1b78] hover:brightness-110 active:scale-98 text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,30,109,0.5)] transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-1.5 rounded-full bg-[#ff1e6d]" />
          <span className="w-2 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};
