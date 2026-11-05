/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { PresetSelector, PRESET_IMAGES, SamplePreset } from './components/PresetSelector';
import { ForensicCanvasViewer } from './components/ForensicCanvasViewer';
import { BenfordChart } from './components/BenfordChart';
import { PixelInspector } from './components/PixelInspector';
import { EducationalGuide } from './components/EducationalGuide';
import { MethodsComparison } from './components/MethodsComparison';
import { FaqSection } from './components/FaqSection';
import { GitHubModal } from './components/GitHubModal';
import { exportProjectZip } from './utils/zipExporter';
import {
  ForensicMethodId,
  FORENSIC_METHODS,
  BenfordResult,
  PixelProbeData,
  BlockAnomalyData,
  analyzeImageData,
} from './utils/benfordEngine';
import { Activity, ShieldCheck, AlertCircle, FileSearch, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'lab' | 'theory' | 'methods' | 'faq'>('lab');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>('user_uploaded_poster');
  const [imageSrc, setImageSrc] = useState<string>(PRESET_IMAGES[0].url);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const [activeMethod, setActiveMethod] = useState<ForensicMethodId>('chrominance_cb');
  const [highlightDigit, setHighlightDigit] = useState<number | null>(null);
  const [probeData, setProbeData] = useState<PixelProbeData | null>(null);
  const [roi, setRoi] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const [analysisResult, setAnalysisResult] = useState<BenfordResult | null>(null);
  const [digitMap, setDigitMap] = useState<Uint8Array | null>(null);
  const [valuesMap, setValuesMap] = useState<Float32Array | null>(null);
  const [blockAnomalies, setBlockAnomalies] = useState<BlockAnomalyData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      await exportProjectZip();
    } catch (err) {
      console.error('Error generating project zip:', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // Hidden file input for header CTA
  const globalFileInputRef = useRef<HTMLInputElement>(null);

  // Load image whenever imageSrc changes
  useEffect(() => {
    setIsAnalyzing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageElement(img);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      setIsAnalyzing(false);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Run forensic analysis whenever image, method, or ROI changes
  useEffect(() => {
    if (!imageElement) return;

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      try {
        const offscreen = document.createElement('canvas');
        const w = imageElement.naturalWidth;
        const h = imageElement.naturalHeight;
        offscreen.width = w;
        offscreen.height = h;

        const ctx = offscreen.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(imageElement, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);

        const { result, digitMap: dMap, valuesMap: vMap, blockAnomalies: bAnom } = analyzeImageData(
          imgData,
          activeMethod,
          roi || undefined
        );

        setAnalysisResult(result);
        setDigitMap(dMap);
        setValuesMap(vMap);
        setBlockAnomalies(bAnom);
      } catch (err) {
        console.error('Forensic analysis error:', err);
      } finally {
        setIsAnalyzing(false);
      }
    }, 40);

    return () => clearTimeout(timer);
  }, [imageElement, activeMethod, roi]);

  // Handle Preset selection
  const handleSelectPreset = (preset: SamplePreset) => {
    setSelectedPresetId(preset.id);
    setRoi(null);
    setImageSrc(preset.url);
  };

  // Handle custom image file upload
  const handleCustomUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedPresetId(null);
    setRoi(null);
    setImageSrc(url);
  };

  // Clipboard paste support (Ctrl+V anywhere in window)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            handleCustomUpload(blob);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const currentMethodDef = FORENSIC_METHODS.find((m) => m.id === activeMethod);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onUploadClick={() => globalFileInputRef.current?.click()}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Hidden file input for global upload */}
      <input
        ref={globalFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleCustomUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Top Telemetry & Context Ribbon */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Risoluzione:</span>
            <span className="text-slate-200 font-semibold tabular-nums">
              {imageDimensions.width} × {imageDimensions.height} px
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Pixel Totali:</span>
            <span className="text-cyan-300 font-semibold tabular-nums">
              {(imageDimensions.width * imageDimensions.height / 1_000_000).toFixed(2)} MP
            </span>
            {roi && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-amber-400 font-bold bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                  Filtro ROI Attivo: {Math.round(roi.width)}×{Math.round(roi.height)} px
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-slate-300">
                {isAnalyzing ? 'Elaborazione Matematiche...' : 'Motore Forense Pronto'}
              </span>
            </div>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">
              Incolla con <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-semibold">Ctrl+V</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {activeSection === 'lab' && (
          <>
            {/* Image Presets & Method Selector */}
            <PresetSelector
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              onCustomImageUpload={handleCustomUpload}
              activeMethod={activeMethod}
              onSelectMethod={(m) => {
                setActiveMethod(m);
                setHighlightDigit(null);
              }}
              onSetQuickRoi={setRoi}
              currentRoi={roi}
            />

            {/* Asymmetric Split Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Canvas Viewport & Pixel Inspector (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <ForensicCanvasViewer
                  imageSrc={imageSrc}
                  imageElement={imageElement}
                  digitMap={digitMap}
                  valuesMap={valuesMap}
                  blockAnomalies={blockAnomalies}
                  methodName={currentMethodDef?.shortLabel || ''}
                  highlightDigit={highlightDigit}
                  setHighlightDigit={setHighlightDigit}
                  setProbeData={setProbeData}
                  roi={roi}
                  setRoi={setRoi}
                />

                <PixelInspector
                  probe={probeData}
                  methodName={currentMethodDef?.name || ''}
                  methodFormula={currentMethodDef?.formula || ''}
                />
              </div>

              {/* Right Column: Benford Empirical Chart & Quantitative Metrics (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {analysisResult && (
                  <BenfordChart
                    result={analysisResult}
                    highlightDigit={highlightDigit}
                    setHighlightDigit={setHighlightDigit}
                    onSwitchMethod={(m) => {
                      setActiveMethod(m);
                      setHighlightDigit(null);
                    }}
                  />
                )}

                {/* Quick Forensic Rationale Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <FileSearch className="w-4 h-4" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                      Riepilogo del Metodo Attivo
                    </h4>
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    {currentMethodDef?.name}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentMethodDef?.scientificExplanation}
                  </p>
                  <div className="text-[11px] text-amber-400/90 bg-amber-950/30 border border-amber-900/40 p-2.5 rounded-lg leading-relaxed">
                    <strong>Comportamento dell'AI:</strong> {currentMethodDef?.whyAiFails}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'theory' && <EducationalGuide />}
        {activeSection === 'methods' && <MethodsComparison />}
        {activeSection === 'faq' && <FaqSection />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">BenfordForensics</span>
            <span>·</span>
            <span>Digital Image Forensics &amp; Statistical Authenticity Verification</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection('theory')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Come Tradurre i Pixel (1–9)
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveSection('methods')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Confronto Metodi
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveSection('faq')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <span>·</span>
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="hover:text-cyan-400 text-slate-400 font-semibold transition-colors cursor-pointer"
            >
              Guida GitHub Open Source
            </button>
          </div>
        </div>
      </footer>

      {/* GitHub Open Source Guide Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />
    </div>
  );
}
