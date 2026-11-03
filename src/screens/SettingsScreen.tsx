import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Moon,
  Sun,
  Lock,
  Sliders,
  SlidersHorizontal,
  HardDrive,
  Bell,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PWAInstallButton } from '../components/PWAInstallButton';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, setTheme, clearStorageCache, storage, addToast } = usePlayer();
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white pb-36 pt-2 px-4 max-w-md mx-auto">
      {/* Title & Pro Badge matching screenshot 9 */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Settings
        </h1>
        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#9b1147] to-[#ff1e6d] text-white text-xs font-black tracking-wide shadow-md">
          FitBeat Pro
        </div>
      </div>
      <p className="text-xs text-white/60 mb-5">
        Customize appearance, audio & workout prefs
      </p>

      {/* Card 1: Appearance Theme */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">
          APPEARANCE THEME
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* Dark (Obsidian) */}
          <button
            onClick={() => setTheme('dark')}
            className={`py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              settings.theme === 'dark'
                ? 'bg-[#ff1e6d] text-white shadow-[0_0_15px_rgba(255,30,109,0.45)]'
                : 'bg-[#24273d] text-white/70 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 fill-current" />
            <span>Dark (Obsidian)</span>
          </button>

          {/* Light (Daylight) */}
          <button
            onClick={() => setTheme('light')}
            className={`py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              settings.theme === 'light'
                ? 'bg-white text-black shadow-lg font-black'
                : 'bg-[#24273d] text-white/70 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Light (Daylight)</span>
          </button>
        </div>
      </div>

      {/* Card 2: Playback & Workout Preferences */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">
          PLAYBACK & WORKOUT PREFERENCES
        </p>

        {/* Option 1: Lock-Screen Background Play */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-[#ff1e6d] flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                Lock-Screen Background Play
              </h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Keep music playing when phone is locked
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() =>
              updateSettings({ lockScreenBackgroundPlay: !settings.lockScreenBackgroundPlay })
            }
            className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${
              settings.lockScreenBackgroundPlay ? 'bg-[#ff1e6d]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                settings.lockScreenBackgroundPlay ? 'translate-x-5.5 shadow' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Option 2: Gapless Crossfade (4 sec) */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                Gapless Crossfade (4 sec)
              </h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Seamless transitions between tracks
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => updateSettings({ gaplessCrossfade: !settings.gaplessCrossfade })}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${
              settings.gaplessCrossfade ? 'bg-[#ff1e6d]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                settings.gaplessCrossfade ? 'translate-x-5.5 shadow' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card 3: Audio Quality & Storage */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">
          AUDIO QUALITY & STORAGE
        </p>

        {/* Item 1: Offline Audio Quality */}
        <div
          onClick={() => setShowQualityModal(true)}
          className="flex items-center justify-between gap-3 cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition truncate">
                Offline Audio Quality
              </h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Lossless FLAC / 320kbps MP3
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
        </div>

        {/* Item 2: Storage Management */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Storage Management</h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                2.4 GB used by 86 offline tracks
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Clear temporary audio cache? Your saved tracks list will be retained.')) {
                clearStorageCache();
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-[#291b2c] hover:bg-[#381f3d] text-[#ff1e6d] font-bold text-xs transition cursor-pointer flex-shrink-0 border border-[#ff1e6d]/30"
          >
            Clear Cache
          </button>
        </div>
      </div>

      {/* Card 4: Notifications & About */}
      <div className="p-4 rounded-3xl bg-[#181a2e] border border-white/10 shadow-lg mb-4 space-y-4">
        {/* Workout Reminder Notifications */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-rose-950/60 text-[#ff1e6d] flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                Workout Reminder Notifications
              </h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Daily streak & new playlist alerts
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const next = !settings.workoutReminders;
              updateSettings({ workoutReminders: next });
              if (next && 'Notification' in window) {
                Notification.requestPermission();
              }
            }}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${
              settings.workoutReminders ? 'bg-[#ff1e6d]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                settings.workoutReminders ? 'translate-x-5.5 shadow' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* About FitBeat */}
        <div
          onClick={() => setShowAboutModal(true)}
          className="flex items-center justify-between gap-3 pt-1 border-t border-white/5 cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-fuchsia-600/20 text-fuchsia-400 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition truncate">
                About FitBeat
              </h4>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                Version 2.4.0 · 100% Ad-Free Personal Player
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
        </div>
      </div>

      {/* PWA Installation Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#181a2e] to-[#25152b] border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#ff1e6d]" />
          <h4 className="text-xs font-bold text-white">Progressive Web App (PWA)</h4>
        </div>
        <p className="text-[11px] text-white/60 mb-3">
          Install FitBeat on your phone or desktop for instant full-screen distraction-free workouts and background lock-screen audio playback.
        </p>
        <PWAInstallButton />
      </div>

      {/* Quality Modal */}
      {showQualityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#16192a] border border-white/15 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Audio Quality Settings</h3>
            <p className="text-xs text-white/60 mb-4">
              Select desired playback encoding for imported and cached workout music.
            </p>
            <div className="space-y-2 mb-6">
              {[
                { id: 'lossless', label: 'Lossless FLAC / WAV', desc: 'Highest fidelity 24-bit 96kHz' },
                { id: 'high', label: 'High (320kbps MP3 / AAC)', desc: 'Optimal gym clarity with compact size' },
                { id: 'standard', label: 'Standard (192kbps MP3)', desc: 'Fastest loading and minimal storage' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    updateSettings({ audioQuality: opt.id as any });
                    setShowQualityModal(false);
                    addToast({
                      type: 'success',
                      title: 'Audio Quality Updated',
                      message: `Quality set to ${opt.label}`,
                    });
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    settings.audioQuality === opt.id
                      ? 'bg-[#ff1e6d]/15 border-[#ff1e6d] text-white'
                      : 'bg-[#1e2238] border-white/5 text-white/80 hover:bg-white/5'
                  }`}
                >
                  <p className="text-xs font-bold">{opt.label}</p>
                  <p className="text-[10px] text-white/50 mt-0.5">{opt.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowQualityModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#16192a] border border-white/15 p-6 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#ff1e6d] to-[#7928ca] mx-auto mb-3 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <span className="text-2xl font-black text-white">FB</span>
            </div>
            <h3 className="text-xl font-bold text-white">FitBeat Mobile</h3>
            <p className="text-xs text-pink-400 font-semibold mt-1">Version 2.4.0 (Brilliant Design Edition)</p>
            <p className="text-xs text-white/70 mt-3 leading-relaxed">
              Engineered for high-intensity athletic performance. Features 100% offline IndexedDB playback, YouTube link bookmarking, BPM rhythm syncing, and lock-screen background controls.
            </p>
            <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-white/40">
              Ad-Free · Privacy-First · Locally Stored
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
