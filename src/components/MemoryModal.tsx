/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrapbookItem } from '../types';
import { musicEngine } from '../utils/audio';
import { ScotchTape, Pushpin, DoodleSketch } from './VintageDecorations';

interface MemoryModalProps {
  item: ScrapbookItem | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ item, onClose }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [reactionCount, setReactionCount] = useState(0);

  // Load and save comment tags specifically for each image ID through localStorage
  useEffect(() => {
    if (item) {
      const storedComments = localStorage.getItem(`scrapbook_comments_${item.id}`);
      const storedReactions = localStorage.getItem(`scrapbook_reactions_${item.id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      } else {
        setComments([]);
      }
      setReactionCount(storedReactions ? parseInt(storedReactions) : 0);
    }
  }, [item]);

  if (!item) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    musicEngine.playInteractionChime();
    const updated = [...comments, newComment.trim()];
    setComments(updated);
    setNewComment('');
    localStorage.setItem(`scrapbook_comments_${item.id}`, JSON.stringify(updated));
  };

  const handleToggleReaction = () => {
    musicEngine.playInteractionChime();
    const nextVal = reactionCount + 1;
    setReactionCount(nextVal);
    localStorage.setItem(`scrapbook_reactions_${item.id}`, String(nextVal));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-xs select-none"
        onClick={onClose}
      >
        {/* Modal Inner Window */}
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative w-full max-w-4xl bg-[#ebdccb] p-6 md:p-10 rounded-xs scrapbook-shadow border-4 border-[#ab9580] flex flex-col md:flex-row gap-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Warm Lighting Spotlights */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#553b21]/15 pointer-events-none" />

          {/* Close button designed as tape ribbon on top right */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-40 bg-zinc-700/80 hover:bg-zinc-800 text-white font-mono text-xs px-3 py-1.5 rounded-sm shadow-md flex items-center gap-1 border border-zinc-500 cursor-pointer"
          >
            <span>╳</span> Close Page
          </button>

          {/* LEFT SIDE: Big Polaroid Card */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] paper-texture p-4 pb-8 rounded-sm shadow-2xl rotate-[-2deg]">
              {/* Scotch Tape Holding frame */}
              <ScotchTape className="-top-3 left-1/2 -translate-x-1/2" rotation={-5} />
              
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-800 border-2 border-zinc-300 shadow-inner">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 polaroid-shimmer" />
              </div>

              {/* Title label */}
              <div className="mt-5 text-center px-2">
                {item.dateText && (
                  <span className="font-typewriter text-[9px] uppercase tracking-widest text-amber-900/60 block mb-1">
                    {item.dateText}
                  </span>
                )}
                <h2 className="font-hand font-bold text-2xl text-zinc-800 tracking-tight leading-tight">
                  {item.title}
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Messages and Reactions */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            {/* Diaries Log Sheet */}
            <div className="relative p-6 sm:p-8 bg-[#faf7f2] rounded-xs shadow-md border border-zinc-200/50 flex-1 flex flex-col justify-between">
              {/* Lined paper details in diary */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#8b5a2b]/4 pointer-events-none" />
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-400/20" />
              
              {/* Doodles to look human-sketched */}
              <DoodleSketch type="star" className="absolute top-4 right-4 text-amber-700/20 w-8 h-8 rotate-12" />
              <DoodleSketch type="arrow" className="absolute bottom-4 left-4 text-zinc-500/10 w-10 h-10 rotate-[-120deg]" />

              <div className="relative pl-6">
                <span className="font-typewriter text-[10px] text-zinc-400 block tracking-widest uppercase mb-1">SCRAPBOOK LOG</span>
                <span className="font-sans font-bold text-xs text-amber-900/60 tracking-wider">A Special Memory for Mozhdeh</span>

                {/* HEART REACTION COUNTER */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handleToggleReaction}
                      className="bg-red-50 hover:bg-red-100/80 active:scale-95 text-red-600 rounded-full p-2 border border-red-200 shadow-xs flex items-center justify-center cursor-pointer transition-all duration-150"
                    >
                      ❤️
                    </button>
                    <span className="font-typewriter text-xs text-zinc-500">
                      {reactionCount > 0 ? `${reactionCount} Hearts placed` : "Send love"}
                    </span>
                  </div>
                  <span className="text-[10px] font-typewriter text-zinc-400 uppercase tracking-widest">Page ID: {item.id}</span>
                </div>
              </div>

              {/* Interactive Memories Guest notes / Sticky thoughts */}
              <div className="relative pl-6 mt-6 pt-4 border-t border-dashed border-zinc-200 flex-1 flex flex-col justify-end">
                <span className="font-hand-sketch text-lg text-zinc-800 font-bold block mb-2">
                  ✍ Clip a tiny note to this page:
                </span>

                {/* Typed greetings list inside paper */}
                <div className="max-h-24 overflow-y-auto mb-3 space-y-1.5 pr-2">
                  {comments.length === 0 ? (
                    <span className="font-love text-sm text-zinc-400 block italic leading-none">No notes yet... add yours below!</span>
                  ) : (
                    comments.map((cmt, i) => (
                      <div key={i} className="bg-yellow-100/50 border-l-2 border-yellow-400/50 pl-2 py-0.5 rounded-r-sm shadow-2xs">
                        <p className="font-hand text-sm text-zinc-700 leading-tight">
                          {cmt}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type a nice wish or cute thought..."
                    className="flex-1 font-hand text-sm bg-zinc-100/60 hover:bg-zinc-100 border border-zinc-300 rounded-sm px-3 py-1.5 shadow-inner focus:outline-none focus:ring-1 focus:ring-amber-500"
                    maxLength={100}
                  />
                  <button 
                    type="submit"
                    className="bg-[#2b2b2a] hover:bg-zinc-800 text-[#ebdccb] font-hand-sketch text-base font-bold px-4 py-1 rounded-sm shadow-md cursor-pointer transition-colors"
                  >
                    Clip It
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
