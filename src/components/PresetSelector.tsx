/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ForensicMethodId, FORENSIC_METHODS } from '../utils/benfordEngine';
import { Camera, Bot, Scissors, Upload, Sparkles, SlidersHorizontal, Image as ImageIcon, Crosshair, Target } from 'lucide-react';

export interface SamplePreset {
  id: string;
  name: string;
  category: 'authentic' | 'ai' | 'manipulated';
  badge: string;
  url: string;
  description: string;
  suggestedRois?: { label: string; roi: { x: number; y: number; width: number; height: number } }[];
}

export const PRESET_IMAGES: SamplePreset[] = [
  {
    id: 'user_uploaded_poster',
    name: 'Poster Collage AI (Caricato)',
    category: 'ai',
    badge: 'AI + Testo Grafico',
    url: '/public/assets/aistudio/Infinity__Eroe_del_Workshop_Automotive_2d19a99b.png',
    description: 'Composito con personaggi generati da AI + cornici tipografiche e tabelle. Mostra come il testo diluisca il gradiente di luminanza, mentre la Crominanza Cb e il ROI isolano istantaneamente l\'AI!',
    suggestedRois: [
      { label: 'Volto Eroe AI', roi: { x: 300, y: 30, width: 210, height: 155 } },
      { label: 'Tuta Meccanico AI', roi: { x: 240, y: 180, width: 220, height: 180 } },
      { label: 'Volto Ufficio AI', roi: { x: 670, y: 40, width: 200, height: 160 } },
      { label: 'Testo Grafico "INFINITY"', roi: { x: 20, y: 130, width: 250, height: 90 } },
    ],
  },
  {
    id: 'authentic_village',
    name: 'Foto Ottica Reale',
    category: 'authentic',
    badge: 'Autentica (Sensore 35mm)',
    url: '/src/assets/images/sample_authentic_photo_1793865616112.jpg',
    description: 'Scorcio toscano in pietra con rumore ottico naturale, texture organica e illuminazione solare continua.',
  },
  {
    id: 'ai_portrait',
    name: 'Ritratto Neurale AI',
    category: 'ai',
    badge: 'Generata da AI (Diffusione)',
    url: '/src/assets/images/sample_ai_generated_1793865615859.jpg',
    description: 'Opera sintetica generata tramite modello di diffusione neurale con smoothing spettrale e assenza di grana fisica.',
  },
  {
    id: 'manipulated_desert',
    name: 'Fotomontaggio / Splicing',
    category: 'manipulated',
    badge: 'Manipolata (Sfera Incollata)',
    url: '/src/assets/images/sample_manipulated_edit_1793865616070.jpg',
    description: 'Composizione con sfera aliena incollata su strada deserta, clonazione e giunzioni con statistiche di gradiente disallineate.',
  },
];

interface PresetSelectorProps {
  selectedPresetId: string | null;
  onSelectPreset: (preset: SamplePreset) => void;
  onCustomImageUpload: (file: File) => void;
  activeMethod: ForensicMethodId;
  onSelectMethod: (methodId: ForensicMethodId) => void;
  onSetQuickRoi?: (roi: { x: number; y: number; width: number; height: number } | null) => void;
  currentRoi?: { x: number; y: number; width: number; height: number } | null;
}

export function PresetSelector({
  selectedPresetId,
  onSelectPreset,
  onCustomImageUpload,
  activeMethod,
  onSelectMethod,
  onSetQuickRoi,
  currentRoi,
}: PresetSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePreset = PRESET_IMAGES.find((p) => p.id === selectedPresetId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCustomImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Top row: Sample presets segmented control + Upload button */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Campioni:</span>
          </span>

          {PRESET_IMAGES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500/80 text-cyan-200 shadow-sm ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {preset.category === 'authentic' && <Camera className="w-3.5 h-3.5 text-emerald-400" />}
                {preset.category === 'ai' && <Bot className="w-3.5 h-3.5 text-purple-400" />}
                {preset.category === 'manipulated' && <Scissors className="w-3.5 h-3.5 text-amber-400" />}
                <span>{preset.name}</span>
                <span className="text-[10px] text-slate-400">· {preset.badge}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Carica Altra Foto</span>
          </button>
        </div>
      </div>

      {/* Suggested Quick ROIs for current preset if available */}
      {activePreset?.suggestedRois && onSetQuickRoi && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-lg px-3.5 py-2 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-semibold">Sonde Rapide ROI per questo Poster:</span>
            <span className="text-slate-400 hidden sm:inline">(Isola le zone AI per testare Benford senza il testo)</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {activePreset.suggestedRois.map((item) => (
              <button
                key={item.label}
                onClick={() => onSetQuickRoi(item.roi)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                🎯 {item.label}
              </button>
            ))}
            {currentRoi && (
              <button
                onClick={() => onSetQuickRoi(null)}
                className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-xs font-mono text-rose-300 transition-colors cursor-pointer"
              >
                ✕ Tutta l'immagine
              </button>
            )}
          </div>
        </div>
      )}

      {/* Method selector tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proprietà Matematiche per la Traduzione del Pixel in [1–9]:</span>
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">
            ★ Usa "Crominanza Cb" per smascherare modelli AI a diffusione
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {FORENSIC_METHODS.map((method) => {
            const isSelected = activeMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => onSelectMethod(method.id)}
                className={`flex flex-col text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-500/80 text-white shadow-xs'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {method.shortLabel}
                  </span>
                  {method.category === 'counterproof' ? (
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1 rounded">
                      Controprova
                    </span>
                  ) : method.id === 'chrominance_cb' ? (
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/80 px-1.5 rounded">
                      Anti-AI
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {method.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
