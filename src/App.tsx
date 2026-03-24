/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black font-mono">
      {/* Background Effects */}
      <div className="static-overlay" />
      <div className="scanline" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10 border-b-4 border-magenta-500 bg-black"
      >
        <div className="flex flex-col">
          <h1 className="text-4xl font-pixel glitch-hard leading-none text-cyan-400">
            SNAKE_VOID_OS
          </h1>
          <p className="text-[10px] font-pixel text-magenta-500 mt-2">
            &gt; KERNEL_LOADED: 0x00FF00
          </p>
        </div>
        
        <div className="flex flex-col items-end font-pixel text-[8px] text-cyan-400 space-y-1">
          <span className="bg-magenta-500 text-black px-1">UPLINK: ACTIVE</span>
          <span>MEM_FREE: 12KB</span>
        </div>
      </motion.header>

      {/* Main Content Grid */}
      <main className="flex flex-col lg:flex-row items-center justify-center gap-16 z-10 w-full max-w-7xl mt-20">
        
        {/* Left Sidebar - Cryptic Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden xl:flex flex-col gap-8 w-64 border-l-4 border-cyan-400 p-6"
        >
          <div className="space-y-4">
            <h4 className="font-pixel text-xs text-magenta-500 uppercase">ENV_VARS</h4>
            <div className="space-y-2">
              <div className="h-4 w-full bg-cyan-900 border border-cyan-400 relative">
                <motion.div 
                  animate={{ width: ["0%", "100%", "0%"] }} 
                  transition={{ repeat: Infinity, duration: 4 }} 
                  className="h-full bg-magenta-500"
                />
              </div>
              <div className="h-4 w-full bg-magenta-900 border border-magenta-500 relative">
                <motion.div 
                  animate={{ width: ["100%", "0%", "100%"] }} 
                  transition={{ repeat: Infinity, duration: 3 }} 
                  className="h-full bg-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] text-cyan-400/80 space-y-1">
            <p className="text-magenta-500">INIT_SEQUENCE_START</p>
            <p>0x00: LOADING_ASSETS...</p>
            <p>0x01: SYNCING_CLOCKS...</p>
            <p className="glitch-hard">0x02: ERROR_DETECTED</p>
            <p>0x03: BYPASSING_SECURITY...</p>
          </div>
        </motion.div>

        {/* Center - Snake Game */}
        <motion.div 
          className="relative screen-tear"
        >
          <div className="absolute -inset-8 border-4 border-dashed border-magenta-500/20 pointer-events-none" />
          <SnakeGame />
        </motion.div>

        {/* Right - Music Player */}
        <motion.div 
          className="flex flex-col gap-8"
        >
          <MusicPlayer />
          
          {/* Decorative Terminal */}
          <div className="p-6 border-4 border-cyan-400 bg-black h-40 overflow-hidden font-mono text-[10px] text-cyan-400">
            <div className="text-magenta-500 mb-2 font-pixel text-[8px]">CORE_LOG:</div>
            <div className="space-y-1">
              <p>&gt; TRACING_PACKETS...</p>
              <p>&gt; DECRYPTING_AUDIO_STREAM...</p>
              <p className="bg-cyan-400 text-black px-1">BIT_DEPTH: 1-BIT</p>
              <p>&gt; OVERCLOCKING_CPU...</p>
              <p className="text-magenta-500 animate-pulse">&gt; WARNING: THERMAL_THROTTLING</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <footer className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center border-t-4 border-cyan-400 bg-black font-pixel text-[8px] text-magenta-500">
        <span>SECTOR_00_NULL</span>
        <div className="flex gap-8">
          <span className="animate-pulse">REC_ACTIVE</span>
          <span>SYNC: 1.0.0</span>
        </div>
        <span className="text-cyan-400">VOID_TECH_IND</span>
      </footer>
    </div>
  );
}
