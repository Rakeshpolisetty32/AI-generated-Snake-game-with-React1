
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-md p-6 border-4 border-cyan-400 bg-black flex flex-col gap-6 screen-tear">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex gap-6 items-center">
        <div className="w-24 h-24 border-4 border-magenta-500 overflow-hidden flex-shrink-0 relative">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover grayscale brightness-150 contrast-200"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan-500/30 mix-blend-hard-light"></div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <h3 className="text-magenta-500 font-pixel text-sm tracking-tighter truncate glitch-hard">{currentTrack.title}</h3>
          <p className="text-cyan-400 font-mono text-xs mt-1 truncate">&gt; {currentTrack.artist}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-magenta-500">
            <Volume2 size={12} />
            <span className="font-pixel text-[8px] tracking-widest uppercase">AUDIO_LINK_1</span>
          </div>
        </div>
      </div>

      <div className="w-full h-4 bg-cyan-900/50 relative border-2 border-cyan-400">
        <div 
          className="absolute top-0 left-0 h-full bg-magenta-500 shadow-[0_0_10px_#ff00ff]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center items-center gap-12 p-4 border-4 border-magenta-500 bg-black relative">
        <button 
          onClick={skipBackward}
          className="text-cyan-400 hover:text-magenta-500 transition-all"
        >
          <SkipBack size={32} fill="currentColor" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 border-4 border-cyan-400 bg-cyan-400 text-black flex items-center justify-center hover:bg-magenta-500 hover:border-magenta-500 transition-all"
        >
          {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
        </button>

        <button 
          onClick={skipForward}
          className="text-cyan-400 hover:text-magenta-500 transition-all"
        >
          <SkipForward size={32} fill="currentColor" />
        </button>
      </div>

      <div className="flex justify-between font-mono text-[10px] text-cyan-400/50 uppercase">
        <span>FREQ: 44.1KHZ</span>
        <span>MODE: RAW_DATA</span>
      </div>
    </div>
  );
};
