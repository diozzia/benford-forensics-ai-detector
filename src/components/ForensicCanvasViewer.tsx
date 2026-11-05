/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  PixelProbeData,
  BlockAnomalyData,
  DIGIT_COLORS,
  renderDigitHeatmap,
  renderBlockAnomalies,
} from '../utils/benfordEngine';
import { Eye, Layers, ZoomIn, ZoomOut, RotateCcw, Crosshair, BoxSelect, Grid3X3 } from 'lucide-react';

interface ForensicCanvasViewerProps {
  imageSrc: string;
  imageElement: HTMLImageElement | null;
  digitMap: Uint8Array | null;
  valuesMap: Float32Array | null;
  blockAnomalies: BlockAnomalyData[];
  methodName: string;
  highlightDigit: number | null;
  setHighlightDigit: (digit: number | null) => void;
  setProbeData: (probe: PixelProbeData | null) => void;
  roi: { x: number; y: number; width: number; height: number } | null;
  setRoi: (roi: { x: number; y: number; width: number; height: number } | null) => void;
}

export function ForensicCanvasViewer({
  imageSrc,
  imageElement,
  digitMap,
  valuesMap,
  blockAnomalies,
  methodName,
  highlightDigit,
  setHighlightDigit,
  setProbeData,
  roi,
  setRoi,
}: ForensicCanvasViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);

  const [viewMode, setViewMode] = useState<'blended' | 'heatmap' | 'blocks' | 'original'>('blended');
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(0.75);
  const [zoom, setZoom] = useState<number>(1);
  const [isSelectingRoi, setIsSelectingRoi] = useState<boolean>(false);
  const [roiStart, setRoiStart] = useState<{ x: number; y: number } | null>(null);
  const [currentRoiDrag, setCurrentRoiDrag] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Render heatmap whenever digitMap or highlightDigit changes
  useEffect(() => {
    if (!heatmapCanvasRef.current || !digitMap || !imageElement) return;

    const w = imageElement.naturalWidth;
    const h = imageElement.naturalHeight;
    const hmCanvas = heatmapCanvasRef.current;
    
    if (hmCanvas.width !== w || hmCanvas.height !== h) {
      hmCanvas.width = w;
      hmCanvas.height = h;
    }

    const ctx = hmCanvas.getContext('2d');
    if (!ctx) return;

    renderDigitHeatmap(digitMap, w, h, ctx, 1.0, highlightDigit);
  }, [digitMap, imageElement, highlightDigit]);

  // Handle mouse move over canvas to probe pixel
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !imageElement || !digitMap || !valuesMap) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const px = Math.floor((e.clientX - rect.left) * scaleX);
      const py = Math.floor((e.clientY - rect.top) * scaleY);

      if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) {
        return;
      }

      // If dragging ROI
      if (isSelectingRoi && roiStart) {
        const startX = Math.min(roiStart.x, px);
        const startY = Math.min(roiStart.y, py);
        const w = Math.abs(px - roiStart.x);
        const h = Math.abs(py - roiStart.y);
        setCurrentRoiDrag({ x: startX, y: startY, width: w, height: h });
      }

      // Sample pixel color and neighborhood
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const centerPix = ctx.getImageData(px, py, 1, 1).data;
      const r = centerPix[0];
      const g = centerPix[1];
      const b = centerPix[2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const cb = -0.168736 * r - 0.331264 * g + 0.5 * b;
      const cr = 0.5 * r - 0.418688 * g - 0.081312 * b;

      // Build 3x3 neighborhood
      const neighborhood: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = Math.min(Math.max(0, px + dx), canvas.width - 1);
          const ny = Math.min(Math.max(0, py + dy), canvas.height - 1);
          const p = ctx.getImageData(nx, ny, 1, 1).data;
          neighborhood[dy + 1][dx + 1] = 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];
        }
      }

      const idx = py * canvas.width + px;
      const calcVal = valuesMap[idx] || 0;
      const digit = digitMap[idx] || null;
      const scientific = Math.abs(calcVal) > 1e-9 ? Math.abs(calcVal).toExponential(3) : '0.000e+0';

      setProbeData({
        x: px,
        y: py,
        r,
        g,
        b,
        luminance: lum,
        cb,
        cr,
        neighborhood,
        calculatedValue: calcVal,
        scientificNotation: scientific,
        firstDigit: digit,
        methodLabel: methodName,
      });
    },
    [imageElement, digitMap, valuesMap, methodName, setProbeData, isSelectingRoi, roiStart]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelectingRoi || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const px = Math.floor((e.clientX - rect.left) * scaleX);
    const py = Math.floor((e.clientY - rect.top) * scaleY);
    setRoiStart({ x: px, y: py });
  };

  const handleMouseUp = () => {
    if (isSelectingRoi && currentRoiDrag) {
      if (currentRoiDrag.width > 15 && currentRoiDrag.height > 15) {
        setRoi(currentRoiDrag);
      }
      setIsSelectingRoi(false);
      setRoiStart(null);
      setCurrentRoiDrag(null);
    }
  };

  // Redraw main canvas
  useEffect(() => {
    if (!canvasRef.current || !imageElement) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = imageElement.naturalWidth;
    const h = imageElement.naturalHeight;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);

    // Draw base image
    if (viewMode === 'original' || viewMode === 'blended' || viewMode === 'blocks') {
      ctx.drawImage(imageElement, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
    }

    // Blend heatmap overlay
    if ((viewMode === 'heatmap' || viewMode === 'blended') && heatmapCanvasRef.current) {
      ctx.save();
      ctx.globalAlpha = viewMode === 'heatmap' ? 1.0 : heatmapOpacity;
      ctx.drawImage(heatmapCanvasRef.current, 0, 0, w, h);
      ctx.restore();
    }

    // Blend Block Anomaly Grid
    if (viewMode === 'blocks' && blockAnomalies.length > 0) {
      renderBlockAnomalies(blockAnomalies, ctx, heatmapOpacity);
    }

    // Draw active ROI box if present
    const activeRoi = currentRoiDrag || roi;
    if (activeRoi) {
      ctx.save();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = Math.max(2, Math.round(w / 400));
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(activeRoi.x, activeRoi.y, activeRoi.width, activeRoi.height);

      ctx.fillStyle = 'rgba(6, 182, 212, 0.18)';
      ctx.fillRect(activeRoi.x, activeRoi.y, activeRoi.width, activeRoi.height);

      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(
        `ROI: ${Math.round(activeRoi.width)}×${Math.round(activeRoi.height)}px`,
        activeRoi.x + 6,
        Math.max(16, activeRoi.y - 6)
      );
      ctx.restore();
    }
  }, [imageElement, viewMode, heatmapOpacity, digitMap, highlightDigit, roi, currentRoiDrag, blockAnomalies]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Viewer Toolbar */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('blended')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'blended' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Miscelata (Overlay)
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'heatmap' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mappa Cifre 1–9
          </button>
          <button
            onClick={() => setViewMode('blocks')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'blocks' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid3X3 className="w-3 h-3" />
            <span>Mappa Blocchi 48×48</span>
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'original' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Originale
          </button>
        </div>

        {/* Opacity slider */}
        {(viewMode === 'blended' || viewMode === 'blocks') && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Opacità:</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="w-8 text-slate-300 tabular-nums font-semibold">
              {Math.round(heatmapOpacity * 100)}%
            </span>
          </div>
        )}

        {/* ROI and Zoom buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (roi) {
                setRoi(null);
                setIsSelectingRoi(false);
              } else {
                setIsSelectingRoi(!isSelectingRoi);
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-colors cursor-pointer ${
              roi
                ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                : isSelectingRoi
                ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Trascina sull'immagine per selezionare un'area di interesse (ROI)"
          >
            <BoxSelect className="w-3.5 h-3.5" />
            <span>{roi ? 'Rimuovi ROI' : isSelectingRoi ? 'Trascina Box...' : 'Isola Area (ROI)'}</span>
          </button>

          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
            title="Zoom Avanti"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
            className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
            title="Zoom Indietro"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {zoom !== 1 && (
            <button
              onClick={() => setZoom(1)}
              className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
              title="Reimposta Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[380px] max-h-[560px] bg-slate-950 overflow-auto flex items-center justify-center p-4 cursor-crosshair select-none"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setProbeData(null)}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          className="max-w-full max-h-[520px] object-contain rounded-md shadow-2xl transition-transform"
        />

        {/* Offscreen canvas for fast pre-rendered heatmap */}
        <canvas ref={heatmapCanvasRef} className="hidden" />
      </div>

      {/* Quick Digit Filter Bar */}
      <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span className="shrink-0">Filtra per cifra:</span>
          <button
            onClick={() => setHighlightDigit(null)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
              highlightDigit === null
                ? 'bg-slate-700 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tutte
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              onClick={() => setHighlightDigit(highlightDigit === d ? null : d)}
              className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold font-mono cursor-pointer transition-all ${
                highlightDigit === d
                  ? 'ring-2 ring-white scale-110'
                  : 'opacity-85 hover:opacity-100'
              }`}
              style={{
                backgroundColor: DIGIT_COLORS[d]?.hex,
                color: '#ffffff',
              }}
              title={`Isola cifra ${d} (${DIGIT_COLORS[d]?.name})`}
            >
              {d}
            </button>
          ))}
        </div>

        {viewMode === 'blocks' && (
          <span className="text-[11px] font-mono text-rose-300 whitespace-nowrap">
            ■ Blocchi Rossi: MAD &gt; 1.8% (Anomalie AI / Ritocco)
          </span>
        )}

        {highlightDigit !== null && (
          <span className="text-[11px] font-mono text-cyan-300 whitespace-nowrap">
            Filtro attivo: Cifra {highlightDigit}
          </span>
        )}
      </div>
    </div>
  );
}
