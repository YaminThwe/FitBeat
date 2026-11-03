import React, { useState, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  ShieldCheck,
  Link as LinkIcon,
  Clipboard,
  Search,
  Bookmark,
  Plus,
  UploadCloud,
  CheckCircle2,
  Loader2,
  HardDrive,
  Globe,
  Radio,
} from 'lucide-react';
import { Track } from '../types';

export const AddDiscoverScreen: React.FC = () => {
  const {
    importYouTubeTrack,
    importDeviceAudioFiles,
    isAnalyzingLink,
    linkAnalysisProgress,
    playlists,
    addTrackToPlaylist,
    playTrack,
    addToast,
    setIsOfflineVaultOpen,
    setActiveTab,
  } = usePlayer();

  const [youtubeUrl, setYoutubeUrl] = useState('https://music.youtube.com/watch?v=9bZKP7q19f0');
  const [discoveredTrack, setDiscoveredTrack] = useState<Track | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) setYoutubeUrl(text);
      }
    } catch {
      // Ignore clipboard permission rejection
    }
  };

  const handleFindTrack = async () => {
    if (!youtubeUrl.trim()) return;
    const track = await importYouTubeTrack(youtubeUrl.trim());
    if (track) {
      setDiscoveredTrack(track);
      setIsSaved(true);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await importDeviceAudioFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* Hidden File Input for Device Audio Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.flac,.wav,.m4a,.aac,.ogg"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Screen Title & Ad-Free Badge */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Add to FitBeat
        </h1>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ad-Free</span>
        </div>
      </div>
      <p className="text-xs text-white/60 mb-4">
        Discover via YouTube or import owned offline files
      </p>

      {/* Success Notification Alert Card (as seen in screenshot 3) */}
      <div className="mb-4 p-3 rounded-2xl bg-[#063825]/90 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-lg backdrop-blur-md">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-400 text-black flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4 fill-emerald-400 text-[#063825]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-100">
              Added to 'HIIT Beast Mode' & Library!
            </h4>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">
              Titanium Sprint (Offline MP3 · 8.4 MB) is ready.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOfflineVaultOpen(true);
            setActiveTab('library');
          }}
          className="text-xs font-bold text-white px-2.5 py-1 rounded-lg bg-emerald-600/40 hover:bg-emerald-600/60 transition cursor-pointer"
        >
          View
        </button>
      </div>

      {/* Card 1: Paste YouTube Music Link */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white tracking-wide">
              Paste YouTube Music Link
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[9px] font-black uppercase tracking-wider border border-purple-500/30">
            ONLINE LINK
          </span>
        </div>

        {/* Input Bar with Paste Icon */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-pink-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://music.youtube.com/watch?v=..."
            className="w-full bg-[#121422] text-white text-xs font-mono rounded-xl pl-9 pr-10 py-3 border border-pink-500/30 focus:border-pink-500 focus:outline-none transition"
          />
          <button
            onClick={handlePasteClipboard}
            className="absolute inset-y-0 right-3 flex items-center text-white/50 hover:text-white transition cursor-pointer"
            title="Paste from clipboard"
          >
            <Clipboard className="w-4 h-4" />
          </button>
        </div>

        {/* Loading / Analyzing State from Screenshot 10 */}
        {isAnalyzingLink && (
          <div className="mb-3 p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ANALYZING LINK
              </span>
              <span className="text-pink-400 font-black">{linkAnalysisProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${linkAnalysisProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-white/60">
              Fetching track metadata & calculating workout BPM...
            </p>
          </div>
        )}

        {/* Find Track Button */}
        <button
          onClick={handleFindTrack}
          disabled={isAnalyzingLink}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#ff1e6d] to-[#db1b78] hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,30,109,0.35)] transition cursor-pointer disabled:opacity-50"
        >
          {isAnalyzingLink ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Track...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Find Track</span>
            </>
          )}
        </button>
      </div>

      {/* YouTube Discovered Track Preview Card */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4">
        <div className="flex items-start gap-3 mb-3">
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 via-pink-600 to-rose-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Radio className="w-7 h-7 text-white" />
            <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
              03:58
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 text-[9px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                <Globe className="w-2.5 h-2.5" /> YouTube Stream Link
              </span>
              <span className="text-[10px] font-extrabold text-pink-400">158 BPM</span>
            </div>
            <h4 className="text-xs font-extrabold text-white truncate">
              Afterhours Adrenaline (Edit)
            </h4>
            <p className="text-[11px] text-white/60 truncate mt-0.5">
              RL Grime & ISOxo · Trap / Gym Bass
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (discoveredTrack) {
                playTrack(discoveredTrack);
              } else {
                handleFindTrack();
              }
            }}
            className="py-2.5 px-3 rounded-xl bg-[#6f42c1] hover:bg-[#5e35b1] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Link to Collection</span>
          </button>

          <button
            onClick={() => {
              const hiit = playlists.find((p) => p.id === 'playlist-hiit-beast');
              if (hiit && discoveredTrack) {
                addTrackToPlaylist(hiit.id, discoveredTrack.id);
              } else {
                addToast({
                  type: 'info',
                  title: 'Added to Playlist',
                  message: "Saved to 'HIIT Beast Mode' playlist.",
                });
              }
            }}
            className="py-2.5 px-3 rounded-xl bg-[#25283d] hover:bg-[#2d314d] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Playlist</span>
          </button>
        </div>
      </div>

      {/* Card 3: Import Authorized Audio File matching screenshot 3 */}
      <div className="p-4 rounded-3xl bg-[#142323] border border-emerald-500/30 shadow-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white tracking-wide">
              Import Authorized Audio File
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase tracking-wider border border-emerald-500/30">
            100% OFFLINE
          </span>
        </div>

        <p className="text-[11px] text-white/70 leading-relaxed mb-3">
          Import legally downloaded or user-owned MP3, AAC, FLAC, or WAV files from your device for zero-data offline workouts.
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3.5 rounded-2xl bg-[#00a86b] hover:bg-[#00925d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,168,107,0.35)] transition active:scale-98 cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Browse Device Audio Files (MP3 / FLAC / WAV)</span>
        </button>
      </div>

      {/* Footer Notes matching screenshot 3 */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-white/50 pt-1">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          YT Link: Needs internet
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Offline: Plays anywhere
        </span>
      </div>
    </div>
  );
};
