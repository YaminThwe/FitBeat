import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, Minimize2, Maximize2, ExternalLink } from 'lucide-react';

export const YouTubePlayerModal: React.FC = () => {
  const { activeYouTubeVideoId, setActiveYouTubeVideoId, currentTrack } = usePlayer();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!activeYouTubeVideoId) return null;

  return (
    <div
      className={`fixed z-40 transition-all duration-300 ${
        isMinimized
          ? 'bottom-24 right-4 w-56 rounded-2xl shadow-2xl border border-white/20 overflow-hidden bg-black'
          : 'inset-x-4 top-16 max-w-lg mx-auto rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden bg-[#10121e]/98 backdrop-blur-xl'
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181a2e] border-b border-white/10">
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-semibold text-rose-300 truncate">
            YouTube Stream: {currentTrack?.title || 'Workout Track'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            title={isMinimized ? 'Expand video' : 'Minimize video'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setActiveYouTubeVideoId(null)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            title="Close video stream"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Authorized YouTube Player Embed */}
      <div className={`relative bg-black ${isMinimized ? 'aspect-video' : 'aspect-video w-full'}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${activeYouTubeVideoId}?autoplay=1&enablejsapi=1&playsinline=1`}
          title="YouTube Authorized Workout Player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {!isMinimized && (
        <div className="p-3 bg-[#131525] flex items-center justify-between text-[11px] text-white/60">
          <span>Authorized YouTube stream · Requires Internet</span>
          {currentTrack?.youtubeUrl && (
            <a
              href={currentTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#ff1e6d] hover:underline"
            >
              Open on YouTube <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
