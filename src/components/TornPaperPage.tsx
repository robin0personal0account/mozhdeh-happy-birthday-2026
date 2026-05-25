/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BinderClip, PressedFlower, DoodleSketch } from './VintageDecorations';

interface TornPaperPageProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  type?: 'lined' | 'grid' | 'blank' | 'craft';
  binderClip?: boolean;
  flowerIndex?: number;
}

export const TornPaperPage: React.FC<TornPaperPageProps> = ({
  children,
  id,
  className = '',
  type = 'blank',
  binderClip = true,
  flowerIndex
}) => {
  // Determine background type
  const getPaperStyleClass = () => {
    switch (type) {
      case 'lined':
        return 'paper-texture journal-lined';
      case 'grid':
        return 'paper-texture blueprint-grid';
      case 'craft':
        return 'bg-[#eedbc5] paper-texture opacity-95'; // brownish craft/cardboard paper style
      case 'blank':
      default:
        return 'paper-texture';
    }
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      className={`relative w-full max-w-5xl mx-auto my-20 sm:my-32 p-6 sm:p-12 md:p-16 rounded-xs scrapbook-shadow border-r border-b border-zinc-300/60 flex flex-col justify-start overflow-hidden ${getPaperStyleClass()} ${className}`}
    >
      {/* Ripped torn edges top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-zinc-200/40 torn-edge-bottom pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-200/40 torn-edge-top pointer-events-none select-none" />

      {/* Binder clips pinning the paper sheet to the virtual wooden desk */}
      {binderClip && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-25 flex space-x-24 select-none pointer-events-none">
          <BinderClip className="-translate-x-10" />
          <BinderClip className="translate-x-10" />
        </div>
      )}

      {/* Retro 3-ring binder punch holes on the left side to look like a binder insert */}
      <div className="absolute top-1/4 bottom-1/4 left-2.5 sm:left-4 w-4 flex flex-col justify-between items-center pointer-events-none select-none opacity-40">
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#23170e]/80 rounded-full border border-zinc-200/20 shadow-inner" />
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#23170e]/80 rounded-full border border-zinc-200/20 shadow-inner" />
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#23170e]/80 rounded-full border border-zinc-200/20 shadow-inner" />
      </div>

      {/* Real looking ink borders or margin lines */}
      <div className="absolute left-10 sm:left-16 top-0 bottom-0 w-[1px] bg-red-400/25 pointer-events-none" />

      {/* Vintage corner aging highlights */}
      <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none bg-radial-gradient from-transparent via-transparent to-[#8b5a2b]/5" />

      {/* Optional real decorative flower inside pages to heighten details */}
      {flowerIndex !== undefined && (
        <PressedFlower 
          className="absolute top-10 right-10 rotate-12 scale-110 opacity-70" 
          index={flowerIndex} 
        />
      )}

      {/* Sub-doodle in margin */}
      {type === 'lined' && (
        <DoodleSketch type="smile" className="absolute bottom-8 left-4 text-zinc-600/30 w-8 h-8 pointer-events-none" />
      )}

      {/* The main child contents */}
      <div className="relative pl-6 sm:pl-10 z-10 w-full">
        {children}
      </div>
    </motion.section>
  );
};
