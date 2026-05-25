/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ScrapbookItem } from '../types';
import { ScotchTape, Pushpin, PaperClip, PressedFlower, DoodleSketch } from './VintageDecorations';
import { musicEngine } from '../utils/audio';

interface PolaroidProps {
  item: ScrapbookItem;
  onClick: (item: ScrapbookItem) => void;
  index: number;
}

export const Polaroid: React.FC<PolaroidProps> = ({ item, onClick, index }) => {
  const { title, image, dateText, description, attachment, rotation } = item;

  const handlePolaroidClick = () => {
    musicEngine.playInteractionChime();
    onClick(item);
  };

  // Render the specific physical attachment
  const renderAttachment = () => {
    switch (attachment) {
      case 'metal-clip':
        return (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-sm select-none pointer-events-none">
            {/* Binder clip head */}
            <div className="w-10 h-8 flex flex-col items-center">
              <div className="w-6 h-4 border-2 border-zinc-500 rounded-t-sm" />
              <div className="w-12 h-4 bg-zinc-800 rounded-sm shadow-md" />
            </div>
          </div>
        );
      case 'rope':
        return (
          <div className="absolute -top-12 left-0 right-0 flex flex-col items-center select-none pointer-events-none z-20">
            {/* Hanging Rope Threads */}
            <div className="w-full flex justify-around px-12">
              <div className="w-[1px] h-12 bg-amber-900/40 border-dashed border-[0.5px] border-amber-900/60" />
              <div className="w-[1px] h-12 bg-amber-900/40 border-dashed border-[0.5px] border-amber-900/60" />
            </div>
            {/* Simple Wooden Peg on top of frame */}
            <div className="absolute -bottom-1 w-3 h-6 bg-amber-700/80 rounded-sm border border-amber-800 shadow-md transform rotate-2" />
          </div>
        );
      case 'wooden-clip':
        return (
          <div className="absolute -top-4 left-1/3 -translate-x-1/2 z-30 flex flex-col items-center select-none pointer-events-none">
            {/* Classic Wooden Clip */}
            <div className="w-3.5 h-9 bg-amber-600/90 border border-amber-700 rounded-sm shadow-md relative flex items-center justify-center">
              {/* Metal coil spring on the wooden clip */}
              <div className="w-4 h-1 bg-zinc-400 absolute top-1/2 -translate-y-1/2 border border-zinc-500 rounded-full" />
            </div>
          </div>
        );
      case 'pin':
        return <Pushpin className="-top-3.5 left-1/2 -translate-x-1/2" />;
      case 'thread':
        return (
          <div className="absolute -top-3 left-4 right-4 flex justify-between select-none pointer-events-none z-30">
            {/* Tiny crossed brown threads look stitched */}
            <div className="text-amber-800 text-[10px] font-mono select-none">╳</div>
            <div className="text-amber-800 text-[10px] font-mono select-none">╳</div>
          </div>
        );
      case 'binder-pin':
        return (
          <div className="absolute -top-4 left-4 z-30 select-none pointer-events-none">
            {/* Rounded book binder ring clasp */}
            <div className="w-8 h-8 rounded-full border-4 border-amber-600/70 border-r-transparent bg-transparent transform -rotate-45 shadow-sm" />
          </div>
        );
      case 'tape':
        return <ScotchTape rotation={rotation * 3} className="-top-3 left-1/2 -translate-x-1/2" />;
      case 'paper-clip':
        return <PaperClip className="-top-3 left-[15%]" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.08, 0.4), ease: 'easeOut' }}
      whileHover={{ 
        y: -10, 
        rotate: rotation > 0 ? rotation + 1.5 : rotation - 1.5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative cursor-pointer select-none"
      onClick={handlePolaroidClick}
      style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
    >
      {/* Physical attachment on top */}
      {renderAttachment()}

      {/* Main Polaroid Body */}
      <div 
        className="paper-texture p-4 pb-6 w-full max-w-[270px] sm:max-w-[290px] mx-auto rounded-xs scrapbook-shadow border border-zinc-200/50 flex flex-col justify-between"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Photo Container */}
        <div className="relative aspect-square w-full bg-[#181a1f] overflow-hidden border border-zinc-300 shadow-inner group">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale-15 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          
          {/* Polaroid reflective shimmer layer */}
          <div className="absolute inset-0 polaroid-shimmer pointer-events-none" />
          
          {/* Heart watermark overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
            <span className="text-[10px] font-typewriter text-white/90 tracking-widest uppercase">Click to open</span>
            <span className="text-red-400 text-xs">❤</span>
          </div>
        </div>

        {/* Written notes card section */}
        <div className="pt-4 pb-2 flex flex-col space-y-1.5 text-center px-1">
          <h3 className="font-hand font-bold text-xl text-zinc-800 leading-tight">
            {title}
          </h3>
        </div>

        {/* Pressed Flower or doodle in corner with random probability per layout */}
        {index % 4 === 1 && (
          <PressedFlower className="-bottom-2 -left-3 rotate-45 scale-60 opacity-60 pointer-events-none" index={index} />
        )}
        {index % 4 === 3 && (
          <DoodleSketch type="heart" className="absolute bottom-2 right-2 text-red-700/40 w-6 h-6 rotate-12" />
        )}
      </div>
    </motion.div>
  );
};
