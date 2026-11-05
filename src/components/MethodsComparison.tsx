/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FORENSIC_METHODS } from '../utils/benfordEngine';
import { SlidersHorizontal, Check, AlertCircle, ArrowRight } from 'lucide-react';

export function MethodsComparison() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          <span>Confronto Comparativo delle Proprietà dei Pixel</span>
        </h2>
        <p className="text-xs text-slate-400">
          Analisi delle diverse tecniche matematiche usate nella letteratura scientifica forense per trasformare i pixel in insiemi conformi alla Legge di Benford.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {FORENSIC_METHODS.map((method, idx) => (
          <div
            key={method.id}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-100">
                  {method.name}
                </h3>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border ${
                method.category !== 'counterproof'
                  ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800'
                  : 'text-amber-400 bg-amber-950/60 border-amber-800'
              }`}>
                {method.category !== 'counterproof' ? 'Proprietà Valida per Forense' : 'Controprova Didattica'}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-cyan-300">
              Formula: {method.formula}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                <span className="font-semibold text-slate-300 block mb-1">
                  Principio Matematico &amp; Risposta Ottica:
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {method.scientificExplanation}
                </p>
              </div>

              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                <span className="font-semibold text-slate-300 block mb-1">
                  Sensibilità alla Manipolazione &amp; AI:
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {method.whyAiFails}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
