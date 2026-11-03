import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, CheckCircle2, X } from 'lucide-react';

interface Props {
  variant?: 'compact' | 'full' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'full', className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className={`flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl ${className}`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>FitBeat Installed as PWA</span>
      </div>
    );
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          className={`flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-[#ff1e6d] to-[#db1b78] hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_15px_rgba(255,30,109,0.35)] cursor-pointer ${
            variant === 'pill'
              ? 'px-3 py-1.5 rounded-full text-xs'
              : variant === 'compact'
              ? 'px-3 py-2 rounded-xl text-xs'
              : 'w-full py-3 px-4 rounded-2xl text-sm'
          } ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Install FitBeat App</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center justify-center gap-2 font-semibold text-white/90 bg-[#1e2238] border border-white/10 hover:border-[#ff1e6d]/40 active:scale-95 transition-all cursor-pointer ${
            variant === 'pill'
              ? 'px-3 py-1.5 rounded-full text-xs'
              : variant === 'compact'
              ? 'px-3 py-2 rounded-xl text-xs'
              : 'w-full py-3 px-4 rounded-2xl text-sm'
          } ${className}`}
        >
          <Share2 className="w-4 h-4 text-[#ff1e6d]" />
          <span>Install on iPhone</span>
        </button>
      )}

      {/* Fallback button if beforeinstallprompt is suppressed in current browser context */}
      {!isInstallable && !isIOS && !isInstalled && (
        <button
          onClick={() => {
            alert('To install FitBeat: Click the install icon in your browser address bar or Menu (⋮) -> Install FitBeat.');
          }}
          className={`flex items-center justify-center gap-2 font-semibold text-white/80 bg-[#1e2238]/60 border border-white/10 hover:border-white/20 active:scale-95 transition-all cursor-pointer ${
            variant === 'pill'
              ? 'px-3 py-1.5 rounded-full text-xs'
              : variant === 'compact'
              ? 'px-3 py-2 rounded-xl text-xs'
              : 'w-full py-3 px-4 rounded-2xl text-sm'
          } ${className}`}
        >
          <Download className="w-4 h-4 text-[#ff1e6d]" />
          <span>Install PWA</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#16192a] border border-white/15 p-6 shadow-2xl text-left relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff1e6d] to-[#7928ca] flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Install FitBeat on iOS</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Experience zero-distraction fullscreen workout music with instant offline playback:
            </p>
            <ol className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff1e6d]/20 text-[#ff1e6d] font-bold text-xs flex items-center justify-center border border-[#ff1e6d]/30">1</span>
                <span>Tap the <strong className="text-white">Share</strong> button at bottom of Safari.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff1e6d]/20 text-[#ff1e6d] font-bold text-xs flex items-center justify-center border border-[#ff1e6d]/30">2</span>
                <span>Scroll down and select <strong className="text-white">Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff1e6d]/20 text-[#ff1e6d] font-bold text-xs flex items-center justify-center border border-[#ff1e6d]/30">3</span>
                <span>Tap <strong className="text-white">Add</strong> to launch from your home screen!</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full rounded-xl bg-white/10 hover:bg-white/15 py-3 text-sm font-semibold text-white transition active:scale-98"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
