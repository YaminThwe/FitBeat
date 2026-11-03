import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  X,
  AlertTriangle,
  Music,
  Sun,
  Loader2,
  HardDrive,
  RotateCcw,
  Plus,
  Play,
  Footprints,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UXStatesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setIsOfflineVaultOpen, setActiveTab, setTheme, playTrack, tracks } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#1b1e2e] border border-white/15 p-5 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title matching screenshot 10 */}
        <div className="flex items-center justify-between mb-1 pr-8">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            UX States & Theme Modes
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 text-[10px] font-bold border border-purple-500/40">
            UX System
          </span>
        </div>
        <p className="text-xs text-white/60 mb-4">
          Loading, Empty, Error & Daylight Theme States
        </p>

        <div className="space-y-3.5">
          {/* 1. Loading State */}
          <div className="p-3.5 rounded-2xl bg-[#121422] border border-purple-500/30">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-white/90">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-400" />
                LOADING STATE · ANALYZING LINK
              </span>
              <span className="text-pink-400 font-extrabold">68%</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-2.5 bg-white/15 rounded-full animate-pulse" />
                <div className="w-1/2 h-2 bg-white/10 rounded-full animate-pulse" />
              </div>
            </div>

            <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden mb-2">
              <div className="w-[68%] h-full bg-gradient-to-r from-[#ff1e6d] to-[#7928ca] rounded-full" />
            </div>

            <p className="text-[10px] text-white/60">
              Fetching track metadata & calculating workout BPM...
            </p>
          </div>

          {/* 2. Error State */}
          <div className="p-3.5 rounded-2xl bg-[#261019] border border-rose-500/40">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-1.5">
              <AlertTriangle className="w-4 h-4 fill-rose-500/20" />
              <span>ERROR STATE · NO INTERNET FOR YT LINK</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed mb-3">
              You're currently offline. Saved YouTube links require a connection, but your 86 Offline MP3/FLAC tracks are ready to play.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  setIsOfflineVaultOpen(true);
                  setActiveTab('library');
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#00a86b] hover:bg-[#00925d] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Switch to Offline Vault</span>
              </button>
              <button
                onClick={() => alert('Checking connection...')}
                className="py-2 px-3 rounded-xl bg-[#25283d] hover:bg-[#2e324d] text-white/80 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          </div>

          {/* 3. Empty State */}
          <div className="p-4 rounded-2xl bg-[#151726] border border-white/10 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff1e6d] to-[#9b1147] text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-pink-500/30">
              <Music className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Your Playlist is Empty
            </h4>
            <p className="text-[11px] text-white/60 max-w-xs mx-auto mb-3">
              Import local audio files or paste a YouTube Music link to build your custom workout mix.
            </p>
            <button
              onClick={() => {
                onClose();
                setActiveTab('search');
              }}
              className="py-2 px-4 rounded-full bg-[#ff1e6d] hover:bg-[#ff0055] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-pink-500/30 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add First Track</span>
            </button>
          </div>

          {/* 4. Daylight Mode */}
          <div className="p-3.5 rounded-2xl bg-[#ffffff] text-black shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-black text-[#ff1e6d]">
                <Sun className="w-4 h-4 text-amber-500" />
                DAYLIGHT MODE · OUTDOOR RUN UI
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider">
                HIGH CONTRAST
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff1e6d] to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow">
                  <Footprints className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-gray-900 leading-tight">
                    Morning 10K Pace (155 BPM)
                  </h5>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    Offline MP3 · High Sunlight Legibility
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setTheme('light');
                  onClose();
                  const t = tracks.find((tr) => tr.bpm >= 150) || tracks[0];
                  playTrack(t);
                }}
                className="w-9 h-9 rounded-full bg-[#ff1e6d] text-white flex items-center justify-center shadow-md active:scale-90 transition cursor-pointer"
                title="Switch to Light / Daylight Mode"
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
