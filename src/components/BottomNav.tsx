import React from 'react';
import { usePlayer, AppTab } from '../context/PlayerContext';
import { Home, Search, Music, Dumbbell, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedPlaylistId, setIsOfflineVaultOpen } = usePlayer();

  const handleTabClick = (tab: AppTab) => {
    // If switching tabs, reset deep subviews
    if (tab !== 'library') {
      setIsOfflineVaultOpen(false);
    }
    setSelectedPlaylistId(null);
    setActiveTab(tab);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#10121f]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#ff1e6d]' : 'text-white/45 hover:text-white/80'
          }`}
        >
          {activeTab === 'home' ? (
            <div className="w-10 h-6.5 rounded-full bg-[#ff1e6d] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,30,109,0.5)]">
              <Home className="w-4 h-4 fill-white" />
            </div>
          ) : (
            <Home className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-semibold tracking-wide">Home</span>
        </button>

        {/* Search / Discover */}
        <button
          onClick={() => handleTabClick('search')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'search' ? 'text-[#ff1e6d]' : 'text-white/45 hover:text-white/80'
          }`}
        >
          {activeTab === 'search' ? (
            <div className="w-10 h-6.5 rounded-full bg-[#ff1e6d] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,30,109,0.5)]">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
          ) : (
            <Search className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-semibold tracking-wide">Search</span>
        </button>

        {/* Library */}
        <button
          onClick={() => handleTabClick('library')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'library' ? 'text-[#ff1e6d]' : 'text-white/45 hover:text-white/80'
          }`}
        >
          {activeTab === 'library' ? (
            <div className="w-10 h-6.5 rounded-full bg-[#ff1e6d] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,30,109,0.5)]">
              <Music className="w-4 h-4 fill-white" />
            </div>
          ) : (
            <Music className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-semibold tracking-wide">Library</span>
        </button>

        {/* Workout Mode */}
        <button
          onClick={() => handleTabClick('workout')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'workout' ? 'text-[#ff1e6d]' : 'text-white/45 hover:text-white/80'
          }`}
        >
          {activeTab === 'workout' ? (
            <div className="w-11 h-6.5 rounded-full bg-gradient-to-r from-[#ff1e6d] to-[#db1b78] text-white flex items-center justify-center shadow-[0_0_14px_rgba(255,30,109,0.6)]">
              <Dumbbell className="w-4 h-4 stroke-[2.2]" />
            </div>
          ) : (
            <Dumbbell className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-bold tracking-wide">Workout</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => handleTabClick('settings')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'settings' ? 'text-[#ff1e6d]' : 'text-white/45 hover:text-white/80'
          }`}
        >
          {activeTab === 'settings' ? (
            <div className="w-10 h-6.5 rounded-full bg-[#ff1e6d] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,30,109,0.5)]">
              <Settings className="w-4 h-4 stroke-[2.2]" />
            </div>
          ) : (
            <Settings className="w-5 h-5 stroke-[1.8]" />
          )}
          <span className="text-[10px] font-semibold tracking-wide">Settings</span>
        </button>
      </div>
    </nav>
  );
};
