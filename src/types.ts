/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AttachmentType = 'metal-clip' | 'rope' | 'wooden-clip' | 'pin' | 'thread' | 'binder-pin' | 'tape' | 'paper-clip';

export interface ScrapbookItem {
  id: string;
  category: 'journey' | 'attributes';
  title: string;
  image: string;
  dateText?: string;
  description: string;
  attachment: AttachmentType;
  rotation: number; // For rendering slightly offset like real photos (-5 to 5 deg)
  bgType?: 'polaroid' | 'classic-torn' | 'sticky-note' | 'notebook' | 'pressed-flower';
  colorTheme?: string; // Tailwind background or accent color
}

export interface SoundPreset {
  name: string;
  notes: number[];
  speed: number;
}
