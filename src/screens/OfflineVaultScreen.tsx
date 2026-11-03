import React, { useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  ArrowLeft,
  Wifi,
  HardDrive,
  FolderPlus,
  Play,
  Trash2,
  CheckCircle2,
  Download,
} from 'lucide-react';

export const OfflineVaultScreen: React.FC = () => {
  const {
    tracks,
    storage,
    playTrack,
    deleteTrack,
    importDeviceAudioFiles,
    setIsOfflineVaultOpen,
    setActiveTab,
    addToast,
  } = usePlayer();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const offlineTracks = tracks.filter((t) => t.type !== 'youtube');

  const flacPercent = (1.4 / 8.0) * 100;
  const mp3Percent = (0.8 / 8.0) * 100;
  const wavPercent = (0.2 / 8.0) * 100;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await importDeviceAudioFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.flac,.wav,.m4a,.aac"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Back button row */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsOfflineVaultOpen(false)}
          className="flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>
      </div>

      {/* Screen Title & Offline Ready Badge matching screenshot 7 */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Offline Music
          </h1>
          <p className="text-xs text-white/60 mt-0.5">
            Locally stored · Zero mobile data
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Wifi className="w-3.5 h-3.5" />
          <span>Offline Ready</span>
        </div>
      </div>

      {/* Device Audio Storage Card matching screenshot 7 */}
      <div className="mt-4 p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Device Audio Storage</span>
          </div>
          <span className="text-xs font-black text-white/90">2.4 GB / 8.0 GB</span>
        </div>

        {/* Multi-segment Storage Bar */}
        <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden flex gap-0.5 mb-3">
          <div
            className="h-full bg-[#00d68f] rounded-l-full"
            style={{ width: `${flacPercent}%` }}
            title="FLAC 1.4 GB"
          />
          <div
            className="h-full bg-[#ff1e6d]"
            style={{ width: `${mp3Percent}%` }}
            title="MP3 0.8 GB"
          />
          <div
            className="h-full bg-[#00e5ff] rounded-r-full"
            style={{ width: `${wavPercent}%` }}
            title="WAV 0.2 GB"
          />
        </div>

        {/* Storage Legend */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-white/70">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00d68f]" />
              FLAC (1.4 GB)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff1e6d]" />
              MP3 (0.8 GB)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
              WAV (0.2 GB)
            </span>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="text-pink-400 font-bold hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Import Owned Audio Files Green Card matching screenshot 7 */}
      <div className="mt-3.5 p-4 rounded-3xl bg-[#093d2c]/90 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-[#093d2c] flex items-center justify-center flex-shrink-0 shadow-md">
            <FolderPlus className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">
              Import Owned Audio Files
            </h4>
            <p className="text-[11px] text-emerald-200/80 truncate mt-0.5">
              Add MP3, FLAC, WAV or M4A from...
            </p>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-xl bg-[#24273d] hover:bg-[#2d314d] text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex-shrink-0"
        >
          + Import
        </button>
      </div>

      {/* Section Header: 86 Offline Tracks matching screenshot 7 */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
          86 OFFLINE TRACKS (NO INTERNET NEEDED)
        </span>
        <button
          onClick={() => {
            if (offlineTracks.length > 0) playTrack(offlineTracks[0], offlineTracks);
          }}
          className="text-xs font-bold text-white hover:text-pink-400 transition cursor-pointer"
        >
          Play All
        </button>
      </div>

      {/* Tracks List */}
      <div className="space-y-2">
        {offlineTracks.map((track) => (
          <div
            key={track.id}
            onClick={() => playTrack(track, offlineTracks)}
            className="p-3 rounded-2xl bg-[#181a2e] border border-white/10 flex items-center justify-between gap-3 hover:bg-white/5 transition cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Green checkmark circle box */}
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-[#181a2e]" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {track.title}
                </h4>
                <p className="text-[11px] text-white/60 truncate mt-0.5">
                  {track.type === 'offline_flac'
                    ? `FLAC · ${track.fileSizeMB || 24.8} MB`
                    : track.type === 'offline_wav'
                    ? `WAV Lossless · ${track.fileSizeMB || 38.4} MB`
                    : `MP3 320kbps · ${track.fileSizeMB || 9.2} MB`}{' '}
                  · {track.artist}
                </p>
              </div>
            </div>

            {/* Play Button (Hot Pink) + Delete Trash Can */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(track, offlineTracks);
                }}
                className="w-8 h-8 rounded-full bg-[#ff1e6d] hover:bg-[#ff0055] text-white flex items-center justify-center shadow-[0_0_10px_rgba(255,30,109,0.5)] active:scale-90 transition cursor-pointer"
                title="Play track"
              >
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTrack(track.id);
                }}
                className="p-2 text-white/40 hover:text-rose-400 transition cursor-pointer"
                title="Delete from Offline Vault"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
