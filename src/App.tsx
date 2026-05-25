/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Compass, 
  BookOpen
} from 'lucide-react';

import { journeyItems, attributesItems, defaultLetter } from './data';
import { ScrapbookItem } from './types';
import { Polaroid } from './components/Polaroid';
import { TornPaperPage } from './components/TornPaperPage';
import { EnvelopeLetter } from './components/EnvelopeLetter';
import { MemoryModal } from './components/MemoryModal';
import { ScotchTape, Pushpin } from './components/VintageDecorations';
import { musicEngine } from './utils/audio';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<ScrapbookItem | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [flickerLight, setFlickerLight] = useState(true);
  const [dustParticles, setDustParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  // Generate beautiful slow floating dust particles inside desk workspace
  useEffect(() => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 3 + 2, // 2-5px
      delay: Math.random() * 8 // transition offset
    }));
    setDustParticles(particles);

    // Ambient warm flicker ticking
    const lightInterval = setInterval(() => {
      setFlickerLight(prev => !prev);
    }, 7500);

    return () => clearInterval(lightInterval);
  }, []);

  const handleToggleMusic = async () => {
    if (isMusicPlaying) {
      musicEngine.stop();
      setIsMusicPlaying(false);
    } else {
      await musicEngine.start();
      musicEngine.playInteractionChime();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen vintage-desk overflow-x-hidden p-3 sm:p-6 md:p-8 font-sans transition-all duration-1000">
      
      {/* Dynamic Ambient Cinematic Filters */}
      <div className="vignette" />
      
      {/* Warm Lantern Glow Flickering Over Desktop */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none z-10 transition-opacity duration-[5000ms]"
        style={{ opacity: flickerLight ? 0.85 : 0.7 }}
      />
      <div className="fixed bottom-0 right-10 w-[45vw] h-[45vh] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* Floating Dust Particles Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {dustParticles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-amber-100/20 blur-[1px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 30, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 22 + p.delay * 2,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* WOODEN DESK EMBEDDED SOUND BAR */}
      <div className="max-w-xl mx-auto mb-8 pt-4 w-full select-none px-3 relative z-30">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-[#3e2715]/90 backdrop-blur-md rounded-full px-5 py-3.5 scrapbook-shadow border border-[#523d2a]/60 flex items-center justify-between text-[#eedbc5]"
        >
          {/* Active spinning vinyl disc & custom ambient sound waves */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0">
              <motion.div 
                animate={{ rotate: isMusicPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className={`w-full h-full rounded-full bg-zinc-950 border-2 border-amber-800/65 flex items-center justify-center relative shadow-lg ${
                  isMusicPlaying ? 'shadow-amber-500/10' : ''
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#3e2715] flex items-center justify-center border border-dashed border-yellow-800/55">
                  <div className={`w-1.5 h-1.5 rounded-full ${isMusicPlaying ? 'bg-amber-400 animate-ping' : 'bg-amber-600'}`} />
                </div>
              </motion.div>
              {/* Wood tone arm */}
              <div className="absolute right-[-2px] top-[-2px] w-4 h-4 bg-zinc-400 rounded-full border border-zinc-600 shadow-sm origin-top-left -rotate-[15deg] pointer-events-none">
                <div className="w-1 h-8 bg-zinc-300 transform rotate-[42deg] origin-top translate-x-1" />
              </div>
            </div>
 
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase font-bold">
                  {isMusicPlaying ? '🎼 Ambient Serenade Active' : '🔇 Music Paused'}
                </span>
                
                {/* Embedded Cinematic Equalizer Visualizer */}
                {isMusicPlaying && (
                  <div className="flex items-end gap-[2px] h-3 px-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{
                          duration: 0.6 + i * 0.15,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-[2.5px] bg-amber-400 rounded-t-xs"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <h4 className="font-serif italic text-base text-zinc-100 leading-tight">
                “Nuvole Bianche” Piano Flow
              </h4>
              <p className="font-typewriter text-[9.5px] text-[#c0a68c] tracking-tight leading-none">
                Ludovico Einaudi Style Ambience
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleMusic}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
              isMusicPlaying 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20' 
                : 'bg-[#5c4027]/70 hover:bg-[#6f5135] text-amber-200'
            }`}
            title="Toggle Soft Background Melodies"
          >
            {isMusicPlaying ? (
              <Volume2 className="w-5 h-5 relative z-10" />
            ) : (
              <VolumeX className="w-5 h-5 animate-pulse relative z-10" />
            )}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>

      {/* HERO / HEADER COVER PAGE */}
      <TornPaperPage id="hero-cover" type="blank" binderClip={false} className="mt-4 mb-24 relative overflow-visible shadow-2xl">
        <Pushpin className="-top-3 left-[12%]" />
        <ScotchTape className="-top-4 right-[15%]" rotation={24} />

        <div className="flex flex-col items-center justify-center py-10">
          <motion.div 
            animate={{ rotate: [-1.5, 0.5, -1.5] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="paper-texture p-6 pb-12 rounded-xs scrapbook-shadow border border-zinc-200/60 max-w-[340px] w-full"
          >
            <div className="relative aspect-square w-full bg-zinc-850 shadow-inner overflow-hidden border border-zinc-300">
              <img 
                src="https://i.pinimg.com/736x/0c/9f/cf/0c9fcf11ab9dd323f94481a3c4145a02.jpg" 
                alt="Mozhdeh Warm Portrait" 
                className="w-full h-full object-cover grayscale-[5%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 polaroid-shimmer" />
            </div>
            <div className="pt-6 text-center">
              <h1 className="font-love text-4xl text-zinc-900 font-bold tracking-tight">
                Mozhdeh ❤️
              </h1>
            </div>
          </motion.div>
        </div>
      </TornPaperPage>


      {/* SECTION 1: THE JOURNEY */}
      <div id="section-chapters" className="relative w-full">
        <TornPaperPage type="lined" className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-dashed border-zinc-300 pb-6 mb-12 w-full">
            <div>
              <span className="font-typewriter text-[10px] text-[#8b5a2b] font-bold block uppercase tracking-wider">SECTION 1</span>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-zinc-900 font-extrabold flex items-center gap-2">
                <Compass className="w-7 h-7 text-amber-700" />
                The Journey of the beautiful woman
              </h2>
            </div>
          </div>

          {/* GRID OF POLAROIDS FOR THE JOURNEY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center mt-6">
            {journeyItems.map((item, index) => (
              <Polaroid 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
                index={index} 
              />
            ))}
          </div>
        </TornPaperPage>
      </div>


      {/* SECTION 2: YOU ARE */}
      <div id="section-attributes" className="relative w-full">
        <TornPaperPage type="grid" className="mb-20" flowerIndex={1}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-dashed border-zinc-300 pb-6 mb-12 w-full">
            <div>
              <span className="font-typewriter text-[10px] text-zinc-500 block uppercase tracking-wider">SECTION 2</span>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-zinc-900 font-extrabold flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-rose-700" />
                You Are
              </h2>
            </div>
          </div>

          {/* GRID OF POLAROIDS FOR YOU ARE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center mt-6">
            {attributesItems.map((item, index) => (
              <Polaroid 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
                index={index + 14} 
              />
            ))}
          </div>
        </TornPaperPage>
      </div>


      {/* SECTION 3: THE FINAL PAGE & LETTER */}
      <div id="section-letter" className="relative w-full max-w-5xl mx-auto my-16">
        <Pushpin className="absolute -top-4 left-1/4" />
        <ScotchTape className="absolute -top-4 right-1/4" rotation={15} />

        {/* Outer wood clipboard panel container holding letter */}
        <div className="w-full bg-[#fcf8f2] border-4 border-[#ab9580] rounded-xs p-6 md:p-12 pb-16 scrapbook-shadow relative">
          
          {/* Metal Spring clip on top of clipboard block */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center">
            <div className="w-20 h-6 bg-zinc-800 rounded-sm shadow-md" />
            <div className="w-12 h-6 border-b-2 border-zinc-550 rounded-b-sm" />
          </div>

          {/* The Wax Seal Interactive Envelope Letter */}
          <EnvelopeLetter letterText={defaultLetter} />

        </div>
      </div>

      {/* MAJESTIC DETAIL POPUP MODULE */}
      <MemoryModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

    </div>
  );
}
