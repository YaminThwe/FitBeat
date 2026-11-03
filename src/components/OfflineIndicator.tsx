import React, { useEffect, useState } from 'react';
import { WifiOff, HardDrive } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { storage, setIsOfflineVaultOpen, setActiveTab } = usePlayer();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-12 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#1f1624] to-[#121b29] border border-rose-500/40 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
          <WifiOff className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-rose-300">Offline Mode Active</p>
          <p className="text-white/70 text-[11px]">{storage.offlineCount} local tracks ready with zero buffering.</p>
        </div>
      </div>

      <button
        onClick={() => {
          setIsOfflineVaultOpen(true);
          setActiveTab('library');
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] hover:bg-emerald-500/30 transition flex-shrink-0 cursor-pointer"
      >
        <HardDrive className="w-3.5 h-3.5" />
        Vault
      </button>
    </div>
  );
};
