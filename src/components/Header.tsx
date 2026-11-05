/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Upload, Github, Download, Loader2 } from 'lucide-react';

interface HeaderProps {
  activeSection: 'lab' | 'theory' | 'methods' | 'faq';
  setActiveSection: (section: 'lab' | 'theory' | 'methods' | 'faq') => void;
  onUploadClick: () => void;
  onOpenGitHubModal: () => void;
  onDownloadZip: () => void;
  isDownloadingZip?: boolean;
}

export function Header({
  activeSection,
  setActiveSection,
  onUploadClick,
  onOpenGitHubModal,
  onDownloadZip,
  isDownloadingZip,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between gap-8 px-6 py-3.5">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm shadow-sm">
          β₁
        </div>
        <button
          onClick={() => setActiveSection('lab')}
          className="text-left cursor-pointer"
        >
          <div className="text-base font-bold tracking-tight text-slate-100 whitespace-nowrap">
            BenfordForensics
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
            Analisi Forense & Autenticità Immagini
          </div>
        </button>
      </div>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveSection('lab')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'lab' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Laboratorio Analisi
        </button>
        <button
          onClick={() => setActiveSection('theory')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'theory' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Come Tradurre i Pixel (1–9)
        </button>
        <button
          onClick={() => setActiveSection('methods')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'methods' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Confronto Metodi Matematici
        </button>
        <button
          onClick={() => setActiveSection('faq')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'faq' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Perché l'AI Viola Benford
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onDownloadZip}
          disabled={isDownloadingZip}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          title="Scarica tutto il codice sorgente in formato .ZIP sul tuo computer"
        >
          {isDownloadingZip ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          ) : (
            <Download className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span className="hidden sm:inline">Scarica ZIP</span>
        </button>

        <button
          onClick={onOpenGitHubModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          title="Guida per pubblicare su GitHub come Open Source"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Pubblica su GitHub</span>
        </button>

        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-900/30 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Carica Immagine</span>
        </button>
      </div>
    </header>
  );
}
