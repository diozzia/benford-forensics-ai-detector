/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BenfordResult, DIGIT_COLORS, ForensicMethodId } from '../utils/benfordEngine';
import { CheckCircle2, AlertTriangle, XCircle, Activity, Sparkles, AlertOctagon, ArrowRight, ShieldAlert } from 'lucide-react';

interface BenfordChartProps {
  result: BenfordResult;
  highlightDigit: number | null;
  setHighlightDigit: (digit: number | null) => void;
  onSwitchMethod?: (methodId: ForensicMethodId) => void;
}

export function BenfordChart({
  result,
  highlightDigit,
  setHighlightDigit,
  onSwitchMethod,
}: BenfordChartProps) {
  const maxVal = Math.max(
    35,
    ...result.observedFrequencies,
    ...result.theoreticalFrequencies
  );

  const getVerdictBadge = () => {
    switch (result.verdict) {
      case 'authentic':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
          label: 'ALTA AUTENTICITÀ OTTICA (NATURALE)',
        };
      case 'acceptable':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" />,
          color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80',
          label: 'CONFORME (COMPATIBILE FOTO REALE)',
        };
      case 'suspect':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          color: 'text-amber-400 bg-amber-950/60 border-amber-800/80',
          label: 'ANOMALIA SOSPETTA / POSTER GRAFICO',
        };
      case 'manipulated':
      default:
        return {
          icon: <XCircle className="w-4 h-4 text-rose-400" />,
          color: 'text-rose-400 bg-rose-950/60 border-rose-800/80',
          label: 'NON CONFORME (GENERAZIONE AI / ALTERATA)',
        };
    }
  };

  const badge = getVerdictBadge();

  // SVG chart dimensions
  const chartHeight = 220;
  const chartWidth = 520;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const groupWidth = plotWidth / 9;

  // Build points for theoretical curve
  const curvePoints = result.theoreticalFrequencies.map((val, idx) => {
    const x = paddingLeft + idx * groupWidth + groupWidth / 2;
    const y = paddingTop + plotHeight - (val / maxVal) * plotHeight;
    return `${x},${y}`;
  }).join(' ');

  const ens = result.ensembleAnalysis;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-5 shadow-lg">
      {/* Header and Verdict Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold tracking-wide text-slate-100 uppercase">
              Distribuzione delle Prime Cifre (1–9)
            </h3>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {result.verdictDescription}
        </p>
      </div>

      {/* Ensemble AI Diagnostic Warning if Graphic Pollution or Cb Discrepancy is detected */}
      {ens && (ens.hasGraphicPollution || ens.cbMAD > 2.0 || ens.overallAiProbability > 60) && (
        <div className="bg-gradient-to-r from-amber-950/50 to-slate-950 border border-amber-800/70 rounded-lg p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Diagnosi Forense Multi-Canale &amp; Rischio AI:</span>
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              ens.overallAiProbability > 70 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}>
              Probabilità Sintesi AI: {ens.overallAiProbability}%
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {ens.diagnosticNote}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono bg-slate-950/80 p-2 rounded border border-slate-800">
            <div>
              <span className="text-slate-400 block">Crominanza Cb MAD:</span>
              <span className={`font-bold tabular-nums ${ens.cbMAD > 2.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {ens.cbMAD.toFixed(2)}% {ens.cbMAD > 2.0 ? '(Critico AI!)' : ''}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Blocchi Anomali:</span>
              <span className={`font-bold tabular-nums ${ens.blockAnomalyRate > 20 ? 'text-rose-400' : 'text-slate-200'}`}>
                {ens.blockAnomalyRate.toFixed(1)}% ({ens.totalBlocks} totali)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Inquinamento Grafico:</span>
              <span className="text-amber-400 font-bold">
                {ens.hasGraphicPollution ? 'Rilevato (Testo/Cornici)' : 'Assente'}
              </span>
            </div>
          </div>

          {result.methodId !== 'chrominance_cb' && onSwitchMethod && (
            <button
              onClick={() => onSwitchMethod('chrominance_cb')}
              className="mt-1 flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-200 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <span>Passa subito a "Crominanza Cb (Anti-AI)" per smascherare l'AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Main Quantitative Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            MAD (Scostamento)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-xl font-mono font-bold tabular-nums ${
              result.mad < 0.65 ? 'text-emerald-400' :
              result.mad < 1.25 ? 'text-cyan-400' :
              result.mad < 1.8 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {result.mad.toFixed(3)}
            </span>
            <span className="text-xs font-mono text-slate-500">%</span>
          </div>
          <span className="text-[10px] text-slate-500">Target &lt; 0.60%</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Test Chi-Quadro (χ²)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-mono font-bold tabular-nums text-slate-200">
              {result.chiSquare.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">df=8</span>
          </div>
          <span className="text-[10px] text-slate-500">
            p = {result.pValue < 0.001 ? '< 0.001' : result.pValue.toFixed(3)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Campioni Valutati
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-mono font-bold tabular-nums text-slate-200">
              {result.totalSamples.toLocaleString('it-IT')}
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            Zeri scartati: {result.zeroCount.toLocaleString('it-IT')}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Indice Anomalia
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-xl font-mono font-bold tabular-nums ${
              result.anomalyScore > 60 ? 'text-rose-400' :
              result.anomalyScore > 35 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {result.anomalyScore}
            </span>
            <span className="text-xs font-mono text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {result.anomalyScore > 60 ? 'Deviazione Critica' : result.anomalyScore > 35 ? 'Deviazione Media' : 'Coerenza Naturale'}
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto select-none font-mono"
        >
          {/* Grid lines and y-axis ticks */}
          {[0, 10, 20, 30].map((tick) => {
            if (tick > maxVal) return null;
            const y = paddingTop + plotHeight - (tick / maxVal) * plotHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : '2,2'}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#64748b"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Theoretical Curve Line & Area */}
          <polyline
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            points={curvePoints}
          />

          {/* Bar Groups for digits 1 through 9 */}
          {result.observedFrequencies.map((obs, idx) => {
            const digit = idx + 1;
            const th = result.theoreticalFrequencies[idx];
            const groupX = paddingLeft + idx * groupWidth;
            const barWidth = groupWidth * 0.58;
            const barX = groupX + (groupWidth - barWidth) / 2;
            
            const barH = (obs / maxVal) * plotHeight;
            const barY = paddingTop + plotHeight - barH;
            
            const isHighlighted = highlightDigit === digit;
            const delta = obs - th;

            return (
              <g
                key={digit}
                className="cursor-pointer transition-opacity"
                onClick={() => setHighlightDigit(highlightDigit === digit ? null : digit)}
                onMouseEnter={() => setHighlightDigit(digit)}
                onMouseLeave={() => setHighlightDigit(null)}
              >
                {/* Background highlight area on hover */}
                <rect
                  x={groupX}
                  y={paddingTop}
                  width={groupWidth}
                  height={plotHeight}
                  fill={isHighlighted ? '#06b6d4' : 'transparent'}
                  fillOpacity="0.08"
                />

                {/* Observed Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={Math.max(1, barH)}
                  rx="2"
                  fill={DIGIT_COLORS[digit]?.hex || '#38bdf8'}
                  opacity={highlightDigit === null || isHighlighted ? 0.9 : 0.35}
                />

                {/* Theoretical marker dot */}
                {(() => {
                  const thY = paddingTop + plotHeight - (th / maxVal) * plotHeight;
                  return (
                    <circle
                      cx={groupX + groupWidth / 2}
                      cy={thY}
                      r="3.5"
                      fill="#06b6d4"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                  );
                })()}

                {/* Digit label on X-axis */}
                <text
                  x={groupX + groupWidth / 2}
                  y={chartHeight - 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={isHighlighted ? '#38bdf8' : '#94a3b8'}
                >
                  {digit}
                </text>

                {/* Observed % label */}
                <text
                  x={groupX + groupWidth / 2}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#64748b"
                >
                  {obs.toFixed(1)}%
                </text>

                {/* Theoretical target value atop */}
                {isHighlighted && (
                  <text
                    x={groupX + groupWidth / 2}
                    y={Math.max(14, barY - 6)}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#f1f5f9"
                  >
                    Δ {delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-cyan-500 inline-block"></span>
              <span>Istogramma Osservato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
              <span>Curva Teorica di Benford</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500">
            Clicca una colonna per isolare la cifra sulla mappa
          </span>
        </div>
      </div>

      {/* Detailed Frequency Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
              <th className="py-1.5 px-2">Cifra</th>
              <th className="py-1.5 px-2">Teorica (Benford)</th>
              <th className="py-1.5 px-2">Osservata</th>
              <th className="py-1.5 px-2">Scostamento (Δ)</th>
              <th className="py-1.5 px-2 text-right">Conteggio Pixel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {result.observedFrequencies.map((obs, idx) => {
              const digit = idx + 1;
              const th = result.theoreticalFrequencies[idx];
              const delta = obs - th;
              const count = result.counts[idx];
              const isSelected = highlightDigit === digit;

              return (
                <tr
                  key={digit}
                  onClick={() => setHighlightDigit(isSelected ? null : digit)}
                  className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                    isSelected ? 'bg-cyan-950/40' : ''
                  }`}
                >
                  <td className="py-1.5 px-2 flex items-center gap-2 font-bold">
                    <span
                      className="w-2.5 h-2.5 rounded-xs"
                      style={{ backgroundColor: DIGIT_COLORS[digit]?.hex }}
                    ></span>
                    <span className="text-slate-200">{digit}</span>
                  </td>
                  <td className="py-1.5 px-2 text-slate-400 tabular-nums">
                    {th.toFixed(2)}%
                  </td>
                  <td className="py-1.5 px-2 font-semibold text-slate-200 tabular-nums">
                    {obs.toFixed(2)}%
                  </td>
                  <td className={`py-1.5 px-2 tabular-nums font-medium ${
                    Math.abs(delta) < 0.8 ? 'text-emerald-400' :
                    Math.abs(delta) < 2.0 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}%
                  </td>
                  <td className="py-1.5 px-2 text-right text-slate-400 tabular-nums">
                    {count.toLocaleString('it-IT')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
