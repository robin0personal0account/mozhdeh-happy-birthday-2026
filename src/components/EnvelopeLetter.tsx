/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { musicEngine } from '../utils/audio';

interface EnvelopeLetterProps {
  letterText: string;
}

export const EnvelopeLetter: React.FC<EnvelopeLetterProps> = ({ letterText }) => {
  // Three-step state machine for smooth sequential unfolding animations
  const [isSealed, setIsSealed] = useState(true);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isLetterOut, setIsLetterOut] = useState(false);

  // Responsive state helper to maintain alignment on compact/taller viewports
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Triggered when breaking the wax seal
  const handleOpen = () => {
    musicEngine.playInteractionChime();
    
    // Step 1: Break Wax Seal
    setIsSealed(false);

    // Step 2: Unfold the envelope's top flap symmetrically (after wax seal cracks)
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 450);

    // Step 3: Draw out the written letter, float it forward, and brighten soundscape filter
    setTimeout(() => {
      setIsLetterOut(true);
      musicEngine.setLetterOpenState(true); // Smoothly opens filter brightness (Immersive focus transition)
    }, 1000);
  };

  // Triggered when tucking the letter back in
  const handleClose = () => {
    musicEngine.playInteractionChime();
    musicEngine.setLetterOpenState(false); // Dims audio filter back to distant dreamy warmth

    // Step 1: Slide letter back down into the compartment
    setIsLetterOut(false);

    // Step 2: Curl the top flap back down
    setTimeout(() => {
      setIsFlapOpen(false);
    }, 650);

    // Step 3: Reseal the wax backing
    setTimeout(() => {
      setIsSealed(true);
    }, 1200);
  };

  // High-precision viewport-safe responsive transforms
  // On mobile screens: translates up just enough to safely emerge from the envelope pocket without clipping
  // On desktop screens: translates up gracefully to sit beautifully above the front folds
  const letterYTranslate = isLetterOut
    ? (isMobile ? 'calc(-1 * clamp(140px, 42vh, 195px))' : '-74%')
    : '0%';

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-end pt-24 sm:pt-36 md:pt-40 pb-6 px-1 select-none text-center">
      
      {/* Dynamic Header Prompt Button - Responsive and Interactive */}
      <div className="absolute top-2 left-0 right-0 z-45 w-full px-2">
        <motion.button
          onClick={isLetterOut ? handleClose : undefined}
          animate={{
            scale: isSealed ? [1, 1.015, 1] : 1,
            color: isSealed ? '#92400e' : '#451a03'
          }}
          transition={{ repeat: isSealed ? Infinity : 0, duration: 3.0, ease: 'easeInOut' }}
          className={`font-sans tracking-wide font-medium text-[clamp(12.5px,2.8vw,15.5px)] px-4 sm:px-5 py-2 rounded-full border border-amber-800/10 shadow-xs bg-[#faf6ef]/95 flex items-center gap-2 mx-auto justify-center transition-all ${
            isLetterOut ? 'hover:bg-[#f5ebd6] hover:border-amber-900/25 cursor-pointer hover:shadow-xs' : 'cursor-default'
          }`}
        >
          {isSealed && (
            <>
              <span className="text-red-500 animate-pulse text-sm">✨</span>
              <span>Break the Wax Seal to unfold Mozhdeh's message</span>
            </>
          )}
          {!isSealed && !isLetterOut && (
            <>
              <span className="animate-spin text-amber-600 text-[11px]">💌</span>
              <span>Carefully drawing letter out...</span>
            </>
          )}
          {isLetterOut && (
            <>
              <span>💌 Press here to tuck it back inside</span>
              <span className="text-[9px] text-amber-800/40">▼</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Main Interactive Envelope Container with responsive proportions */}
      <div 
        className="relative w-full aspect-[1.58] bg-[#cda984] rounded-xs shadow-[0_6px_20px_rgba(40,24,12,0.15)] border border-[#b28e67] overflow-visible cursor-pointer"
        onClick={isSealed ? handleOpen : undefined}
      >
        {/* Envelope Cavity Inner Background */}
        <div className="absolute inset-0 bg-[#8c6742] rounded-xs overflow-hidden z-0 shadow-inner">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
        </div>

        {/* ---------------- LAYER 1: THE LETTER SHEET ---------------- */}
        <motion.div
          animate={{
            y: letterYTranslate,
            scale: isLetterOut ? (isMobile ? 1.02 : 1.05) : 0.96,
            boxShadow: isLetterOut
              ? '0 20px 45px -10px rgba(45,25,10,0.4)'
              : '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: isLetterOut ? 40 : 10
          }}
          transition={{
            type: 'spring',
            damping: 17,
            stiffness: 70,
            delay: isLetterOut ? 0.12 : 0
          }}
          className="absolute left-[3.5%] right-[3.5%] bottom-[8%] h-[clamp(260px,46vh,315px)] md:h-[390px] bg-[#fdfbf6] rounded-xs p-5 sm:p-7 md:p-8 border border-amber-900/10 flex flex-col justify-between cursor-default"
          onClick={(e) => {
            // Prevent event bubbling so Clicking on text or signature doesn't close/trigger envelope folds
            e.stopPropagation();
          }}
        >
          {/* Paper Texture and Decorative Internal Border */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#8b5a2b]/2 pointer-events-none rounded-xs" />
          <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-dashed border-red-800/6 rounded-xs pointer-events-none" />

          {/* Paper Header */}
          <div className="flex justify-between items-center text-[#8b5a2b]/65 font-typewriter text-[clamp(8px,2vw,10px)] border-b border-dashed border-[#8b5a2b]/15 pb-2">
            <span className="tracking-widest uppercase">MEMO FOR MOZHDEH</span>
            <span className="text-rose-600/70 text-[clamp(10px,2.5vw,13px)] animate-pulse">❤</span>
          </div>

          {/* Content Space with Premium Typography Hierarchy */}
          <div className="flex-1 flex flex-col justify-center my-2 text-center px-1 sm:px-4 select-text max-w-md mx-auto">
            {/* Soft Emotional Body */}
            <p className="font-serif italic text-[clamp(12.5px,3vw,16px)] text-zinc-800 leading-relaxed font-semibold">
              “From being a daughter to becoming a mother,
              you have always been the best for everyone,
              and you always will be.”
            </p>

            {/* Celebratory Signature Lines - Elegant pairing with Caveat */}
            <h3 className="font-hand font-medium text-[clamp(20px,4vw,26px)] text-rose-700 leading-snug tracking-normal mt-4 mb-2 drop-shadow-xs">
              Happy Birthday to that truly special person. ❤️
            </h3>

            {/* Faded Intimate Reflection - Clean, readable and cozy */}
            <p className="font-hand-sketch text-[clamp(14px,3.2vw,18px)] text-zinc-500 leading-none border-t border-dashed border-zinc-200 pt-2.5 italic">
              and happy birthday to that special person
            </p>
          </div>

          {/* Paper Footer / Stamp & Signature block */}
          <div className="flex justify-between items-end border-t border-dashed border-zinc-150 pt-2.5">
            <div className="flex items-center space-x-1.5 opacity-50">
              <span className="text-[7.5px] font-typewriter text-zinc-400">STAMP: 25-05</span>
              <div className="w-3 h-3 rounded-full bg-red-850/15 shadow-inner" />
            </div>
            
            <div className="text-right flex flex-col items-end leading-none">
              <span className="font-typewriter text-[8px] uppercase text-zinc-400 tracking-wider">With love,</span>
              <span className="font-love text-[clamp(21px,4.5vw,27px)] font-bold text-zinc-850 rotate-[-3deg] inline-block mt-0.5 select-none leading-none mr-1">
                -tobi
              </span>
            </div>
          </div>
        </motion.div>

        {/* ---------------- LAYER 2: THE ENVELOPE FRONT SIDE FLAPS ---------------- */}
        {/* Left Folding Flap */}
        <div 
          className="absolute inset-y-0 left-0 w-1/2 bg-[#dbbf9f] shadow-xs z-15 pointer-events-none" 
          style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} 
        />

        {/* Right Folding Flap */}
        <div 
          className="absolute inset-y-0 right-0 w-1/2 bg-[#dbbf9f] shadow-xs z-15 pointer-events-none" 
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }} 
        />

        {/* Bottom Rising Flap */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[60%] bg-[#e3cbb1] shadow-sm z-18 pointer-events-none" 
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0%)' }} 
        />

        {/* 3D Top Triangular Cover Flap */}
        <motion.div 
          className="absolute inset-x-0 top-0 h-[53%] bg-[#c2a381] origin-top z-25 shadow-xs pointer-events-none"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
          animate={{ 
            rotateX: isFlapOpen ? 180 : 0,
            zIndex: isFlapOpen ? 5 : 25 
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* ---------------- LAYER 3: INTERACTIVE WAX SEAL ---------------- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-30">
          <AnimatePresence>
            {isSealed ? (
              <motion.button
                key="wax-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                whileHover={{ scale: 1.12, rotate: 1 }}
                whileTap={{ scale: 0.96 }}
                className="absolute w-13 h-13 rounded-full bg-red-700 hover:bg-red-800 flex items-center justify-center shadow-md border border-red-800/40 z-35 group cursor-pointer"
                title="Break Wax Seal"
              >
                <span className="text-white font-hand font-bold text-base select-none">❤️</span>
                <div className="absolute -inset-1.5 rounded-full border border-red-500/25 animate-ping pointer-events-none" />
              </motion.button>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Splitting Left Wax Section */}
                <motion.div
                  initial={{ x: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: -22, opacity: 0, rotate: -20, scale: 0.82 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="w-6.5 h-13 bg-red-700/95 border border-r-0 border-red-800/35 rounded-l-full flex items-center justify-end pr-1 shadow-sm"
                >
                  <span className="text-white font-hand font-bold text-base select-none translate-x-1 font-semibold">❤️</span>
                </motion.div>
                
                {/* Splitting Right Wax Section */}
                <motion.div
                  initial={{ x: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: 22, opacity: 0, rotate: 20, scale: 0.82 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="w-6.5 h-13 bg-red-700/95 border border-l-0 border-red-800/35 rounded-r-full flex items-center justify-start pl-1 shadow-sm"
                >
                  <span className="text-white font-hand font-bold text-base select-none -translate-x-1 font-semibold">❤️</span>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------- LAYER 4: OUTER ADDRESS TAG ---------------- */}
        {isSealed && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 max-w-[150px] text-zinc-800 font-hand text-lg leading-tight rotate-1 px-3 py-1.5 border border-amber-900/10 bg-white/40 backdrop-blur-xs shadow-xs select-none pointer-events-none rounded-xs"
          >
            <span className="font-typewriter text-[7px] uppercase block tracking-widest text-amber-900/50 mb-0.5 animate-pulse">TO: Beloved</span>
            <span className="font-hand font-bold text-amber-950 text-[clamp(13px,3.2vw,17px)]">Mozhdeh ❤️</span>
          </motion.div>
        )}

      </div>
    </div>
  );
};

