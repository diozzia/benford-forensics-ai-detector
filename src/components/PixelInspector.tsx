/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PixelProbeData, DIGIT_COLORS } from '../utils/benfordEngine';
import { Crosshair, ArrowRight, Calculator, Eye } from 'lucide-react';

interface PixelInspectorProps {
  probe: PixelProbeData | null;
  methodName: string;
  methodFormula: string;
}

export function PixelInspector({ probe, methodName, methodFormula }: PixelInspectorProps) {
  if (!probe) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 text-slate-400 min-h-[220px]">
        <Crosshair className="w-8 h-8 text-slate-600 animate-pulse" />
        <div>
          <div className="text-sm font-medium text-slate-300">
            Sonda di Ispezione Pixel Attiva
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Passa il cursore del mouse sopra l'immagine a sinistra per vivisezionare un singolo pixel e vedere in tempo reale la sua trasformazione matematica da 1 a 9.
          </p>
        </div>
      </div>
    );
  }

  const digitColor = probe.firstDigit ? DIGIT_COLORS[probe.firstDigit] : null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
      {/* Title & Coordinates */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Sonda Pixel: X={probe.x}, Y={probe.y}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3.5 h-3.5 rounded-sm border border-white/20 inline-block shadow-xs"
            style={{ backgroundColor: `rgb(${probe.r}, ${probe.g}, ${probe.b})` }}
          />
          <span className="text-xs font-mono text-slate-400">
            RGB({probe.r}, {probe.g}, {probe.b})
          </span>
        </div>
      </div>

      {/* The 3-Step Pipeline: Pixel -> Formula -> Scientific Notation -> Digit 1..9 */}
      <div className="flex flex-col gap-3">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Conversione Proprietà Pixel → Cifra Significativa [1–9]</span>
        </div>

        {/* Step Cards Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Step 1: Neighborhood & Raw values */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              1. Intorno 3×3 & Luminanza
            </span>
            <div className="my-2 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
                {probe.neighborhood.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const isCenter = rIdx === 1 && cIdx === 1;
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-7 h-7 flex items-center justify-center rounded-xs ${
                          isCenter
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {Math.round(val)}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono">
              Y = {probe.luminance.toFixed(1)}
            </div>
          </div>

          {/* Step 2: Continuous Formula Output */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              2. Valore Calcolato Continuo
            </span>
            <div className="my-2 flex flex-col items-center justify-center">
              <span className="text-xl font-mono font-bold text-slate-100 tabular-nums">
                {probe.calculatedValue.toFixed(4)}
              </span>
              <span className="text-[10px] font-mono text-slate-500 mt-1">
                Notazione: <span className="text-cyan-300">{probe.scientificNotation}</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-500 text-center truncate">
              {methodName}
            </div>
          </div>

          {/* Step 3: Extracted Leading Digit */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              3. Prima Cifra Estratta (1-9)
            </span>
            <div className="my-2 flex flex-col items-center justify-center">
              {probe.firstDigit !== null ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl font-mono font-extrabold text-white shadow-md"
                    style={{ backgroundColor: digitColor?.hex }}
                  >
                    {probe.firstDigit}
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-500 flex items-center justify-center text-sm font-mono">
                  0 (Ignorato)
                </div>
              )}
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono">
              {probe.firstDigit !== null ? (
                <span style={{ color: digitColor?.hex }}>
                  Classe {probe.firstDigit} ({digitColor?.name.split(' ')[0]})
                </span>
              ) : (
                'Variazione nulla'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory callout for this specific pixel calculation */}
      <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg px-3 py-2 text-xs text-slate-400 flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-300 font-semibold font-mono text-[11px] block">
            Formula Operatore: {methodFormula}
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Il calcolo produce un numero reale continuo positivo. Scrivendolo in notazione scientifica{' '}
            <span className="text-cyan-300 font-mono">d.ddd × 10ⁿ</span>, la prima cifra prima della virgola{' '}
            <span className="text-cyan-300 font-mono font-bold">d ∈ [1..9]</span> è la cifra significativa conteggiata per la Legge di Benford.
          </p>
        </div>
      </div>
    </div>
  );
}
