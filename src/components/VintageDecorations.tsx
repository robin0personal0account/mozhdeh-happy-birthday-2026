/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Scotch Tape component
export const ScotchTape: React.FC<{ className?: string; rotation?: number }> = ({ 
  className = '', 
  rotation = -15 
}) => {
  return (
    <div 
      className={`absolute w-28 h-8 scotch-tape bg-yellow-100/35 border border-yellow-200/20 mix-blend-multiply flex items-center justify-center pointer-events-none select-none z-20 ${className}`}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
      }}
    >
      {/* Subtle details on tape */}
      <div className="w-full h-[1px] bg-white/20 my-auto"></div>
    </div>
  );
};

// Vintage Pushpin
export const Pushpin: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute flex flex-col items-center pointer-events-none select-none z-30 drop-shadow-md ${className}`}>
      {/* Pin head */}
      <div className="w-4 h-4 rounded-full bg-red-600/90 relative shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute top-0.5 left-0.5" />
      </div>
      {/* Pin base body */}
      <div className="w-2.5 h-1.5 bg-red-800 rounded-sm -mt-0.5" />
      {/* Pin steel needle */}
      <div className="w-0.5 h-3 bg-zinc-400 -mt-0.5 shadow-sm" />
    </div>
  );
};

// PaperClip
export const PaperClip: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`absolute w-8 h-12 pointer-events-none select-none z-30 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${className}`}
      viewBox="0 0 32 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Real metallic looking loop */}
      <path 
        d="M12 4C8.68629 4 6 6.68629 6 10V34C6 39.5228 10.4772 44 16 44C21.5228 44 26 39.5228 26 34V12C26 8.68629 23.3137 6 20 6C16.6863 6 14 8.68629 14 12V34C14 35.1046 14.8954 36 16 36C17.1046 36 18 35.1046 18 34V12" 
        stroke="#4a4c50" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M11.5 4.5C8.3 4.5 5.8 7 5.8 10.2V34.2C5.8 39.8 10.4 44.4 16 44.4C21.6 44.4 26.2 39.8 26.2 34.2V12.2C26.2 9 23.5 6.3 20.2 6.3C17 6.3 14.3 9 14.3 12.2V34.2C14.3 35.3 15.1 36.2 16.2 36.2C17.3 36.2 18.2 35.3 18.2 34.2V12.2" 
        stroke="#ffd700" 
        strokeWidth="0.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
};

// BinderClip
export const BinderClip: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute flex flex-col items-center pointer-events-none select-none z-30 ${className}`}>
      {/* Metal loop/handle */}
      <svg className="w-12 h-10 drop-shadow-[0_-1px_2px_rgba(0,0,0,0.15)]" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 32C12 18 14 4 20 4C26 4 28 18 28 32" stroke="#abb2bf" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M14 32C14 19 16 6 20 6C24 6 26 19 26 32" stroke="#5c6370" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </svg>
      {/* Black plastic binder base */}
      <div className="w-16 h-5 bg-[#21252b] rounded-sm relative shadow-md border-b border-[#303642] flex justify-between items-center px-4 -mt-1.5">
        <div className="w-1 h-1 bg-[#181a1f] rounded-full"></div>
        <div className="w-1 h-1 bg-[#181a1f] rounded-full"></div>
      </div>
    </div>
  );
};

// Unsplash leaf or dry leaf PressedFlower sketch
export const PressedFlower: React.FC<{ className?: string; index?: number }> = ({ 
  className = '',
  index = 0
}) => {
  // We use 3 different beautiful illustrations of pressed flowers / leaves
  const flowerUrls = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop&blur=3', // vintage rose tint
    'https://images.unsplash.com/photo-1544833008-72959048ec82?q=80&w=400&auto=format&fit=crop', // dry leaf
    'https://images.unsplash.com/photo-1542382156808-c89bdfadff93?q=80&w=400&auto=format&fit=crop'  // pressed lavender
  ];

  return (
    <div 
      className={`absolute pointer-events-none select-none mix-blend-multiply opacity-75 grayscale sepia brightness-90 shrink-0 ${className}`}
      style={{
        width: '60px',
        height: '90px',
        backgroundImage: `url("${flowerUrls[index % flowerUrls.length]}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '2px',
        boxShadow: '0 0 10px rgba(0,0,0,0.06)'
      }}
    />
  );
};

// Hand-drawn sketch doodles
export const DoodleSketch: React.FC<{ type: 'heart' | 'star' | 'arrow' | 'flower' | 'smile'; className?: string }> = ({ 
  type, 
  className = '' 
}) => {
  const renderPath = () => {
    switch (type) {
      case 'heart':
        return (
          <path 
            d="M12 21C12 21 3 13.5 3 8.5C3 5.5 5.5 3 8.5 3C10.2 3 11.3 4.1 12 5C12.7 4.1 13.8 3 15.5 3C18.5 3 21 5.5 21 8.5C21 13.5 12 21 12 21Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'star':
        return (
          <path 
            d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'arrow':
        return (
          <path 
            d="M3 12C3 12 6.5 7.5 12 7.5C17.5 7.5 21 12 21 12M21 12L17 8M21 12L17 16" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'flower':
        return (
          <path 
            d="M12 10C10.5 8.5 8.5 10.5 10 12C8.5 13.5 10.5 15.5 12 14C13.5 15.5 15.5 13.5 14 12C15.5 10.5 13.5 8.5 12 10ZM12 4V10M12 14V20M6 12H10M14 12H20" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'smile':
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="12" cy="12" r="9" strokeLinecap="round" />
            <path d="M9 10C9 10 9.25 9 10 9M14 10C14 10 14.25 9 15 9" strokeLinecap="round" />
            <path d="M7.5 14.5C9 17 15 17 16.5 14.5" strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`w-10 h-10 stroke-zinc-600/60 dark:stroke-zinc-800/50 transform pointer-events-none select-none ${className}`}
    >
      {renderPath()}
    </svg>
  );
};
