/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { MobileStatusBar } from './components/MobileStatusBar';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ToastContainer } from './components/ToastContainer';
import { YouTubePlayerModal } from './components/YouTubePlayerModal';
import { HomeScreen } from './screens/HomeScreen';
import { AddDiscoverScreen } from './screens/AddDiscoverScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { PlaylistScreen } from './screens/PlaylistScreen';
import { OfflineVaultScreen } from './screens/OfflineVaultScreen';
import { NowPlayingModal } from './screens/NowPlayingModal';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { UXStatesModal } from './screens/UXStatesModal';
import { LayoutGrid, Sparkles } from 'lucide-react';

const AppMain: React.FC = () => {
  const {
    activeTab,
    selectedPlaylistId,
    isOfflineVaultOpen,
    showOnboarding,
    setShowOnboarding,
    settings,
  } = usePlayer();

  const [showUXModal, setShowUXModal] = useState(false);

  const isLight = settings.theme === 'light';

  // If user is viewing onboarding screen
  if (showOnboarding) {
    return <WelcomeScreen />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans relative ${
        isLight
          ? 'bg-[#f4f5fa] text-gray-900 selection:bg-pink-500 selection:text-white'
          : 'bg-[#0d0f1a] text-white selection:bg-[#ff1e6d] selection:text-white'
      }`}
    >
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative shadow-2xl overflow-x-hidden border-x border-white/5">
        {/* Top Mobile Status Bar (9:41, WiFi, Battery) */}
        <MobileStatusBar />

        {/* Global UX System quick demo floating button */}
        <div className="fixed top-3 right-3 z-40 max-w-md mx-auto pointer-events-auto">
          <button
            onClick={() => setShowUXModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/40 text-[10px] font-bold backdrop-blur-md shadow-md transition cursor-pointer"
            title="Inspect UX States & Themes"
          >
            <Sparkles className="w-3 h-3 text-pink-300" />
            <span>UX States</span>
          </button>
        </div>

        {/* Notifications & Indicators */}
        <OfflineIndicator />
        <ToastContainer />
        <YouTubePlayerModal />

        {/* Dynamic Screen Routing */}
        <main className="flex-1 w-full">
          {selectedPlaylistId ? (
            <PlaylistScreen />
          ) : isOfflineVaultOpen ? (
            <OfflineVaultScreen />
          ) : (
            <>
              {activeTab === 'home' && <HomeScreen />}
              {activeTab === 'search' && <AddDiscoverScreen />}
              {activeTab === 'library' && <LibraryScreen />}
              {activeTab === 'workout' && <WorkoutScreen />}
              {activeTab === 'settings' && <SettingsScreen />}
            </>
          )}
        </main>

        {/* Persistent Mini Player */}
        <MiniPlayer />

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Full-Screen Modals */}
        <NowPlayingModal />
        <UXStatesModal isOpen={showUXModal} onClose={() => setShowUXModal(false)} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PlayerProvider>
      <AppMain />
    </PlayerProvider>
  );
}
