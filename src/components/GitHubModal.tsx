/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, Copy, Github, Download, Loader2, ExternalLink, FolderArchive, ArrowRight } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip?: () => void;
  isDownloadingZip?: boolean;
}

export function GitHubModal({ isOpen, onClose, onDownloadZip, isDownloadingZip }: GitHubModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const gitCommands = `# 1. Inizializza il repository git locale
git init

# 2. Aggiungi tutti i file al tracking
git add .

# 3. Effettua il primo commit
git commit -m "feat: initial open source release of BenfordForensics"

# 4. Rinomina il branch principale in main
git branch -M main

# 5. Collega il tuo repository remoto GitHub (sostituisci TUO-USERNAME)
git remote add origin https://github.com/TUO-USERNAME/benford-forensics-ai-detector.git

# 6. Esegui il push del codice su GitHub
git push -u origin main`;

  const handleCopy = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Scarica il Codice &amp; Pubblica su GitHub
              </h2>
              <p className="text-xs text-slate-400">
                Guida e download diretto per il tuo computer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 text-sm">
          {/* Step 0: Direct Download ZIP Box */}
          <div className="bg-gradient-to-r from-cyan-950/60 to-slate-950 border border-cyan-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">
                  Scarica Tutto il Codice sul Computer (.ZIP)
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Scarica un archivio compresso contenente tutti i file (React, TypeScript, immagini, README.md, LICENSE MIT e package.json) pronto da estrarre sul tuo PC.
                </p>
              </div>
            </div>

            {onDownloadZip && (
              <button
                onClick={onDownloadZip}
                disabled={isDownloadingZip}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap shrink-0 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDownloadingZip ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Download className="w-4 h-4 text-slate-950" />
                )}
                <span>{isDownloadingZip ? 'Generazione ZIP...' : 'Scarica .ZIP Ora'}</span>
              </button>
            )}
          </div>

          {/* Step 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>Crea il nuovo repository su GitHub</span>
            </div>
            <p className="text-xs text-slate-400 pl-7 leading-relaxed">
              Accedi al tuo account GitHub e visita{' '}
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-mono"
              >
                github.com/new <ExternalLink className="w-3 h-3" />
              </a>
              . Assegna un nome (es. <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">benford-forensics-ai-detector</code>), impostalo come <strong>Public</strong> e <u>non</u> spuntare "Add README" o "Add .gitignore" (sono già nel file ZIP che scarichi!).
            </p>
          </div>

          {/* Step 2: Terminal Commands */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <span>Esegui i comandi nel terminale della cartella estratta</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiati!' : 'Copia Comandi'}</span>
              </button>
            </div>

            <div className="pl-7">
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed select-all">
                {gitCommands}
              </pre>
            </div>
          </div>

          {/* Step 3: Files in zip */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>Cosa contiene l'archivio ZIP scaricato</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-7 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col gap-1">
                <span className="font-mono text-cyan-300 font-bold">README.md</span>
                <span className="text-slate-400 text-[11px]">
                  Documentazione scientifica, formule matematiche e guida al deploy.
                </span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col gap-1">
                <span className="font-mono text-cyan-300 font-bold">LICENSE</span>
                <span className="text-slate-400 text-[11px]">
                  Licenza ufficiale <strong>MIT</strong> pronta per open source.
                </span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col gap-1">
                <span className="font-mono text-cyan-300 font-bold">src/ e assets/</span>
                <span className="text-slate-400 text-[11px]">
                  Tutti i componenti React, il motore Benford e le immagini di test.
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Free One-Click Deployment */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center font-mono">
                4
              </span>
              <span>Come avviarlo in locale dopo averlo estratto</span>
            </div>
            <div className="pl-7 bg-slate-950 border border-slate-800 p-3 rounded-lg font-mono text-xs text-slate-300 flex flex-col gap-1">
              <span className="text-slate-500"># 1. Installa i pacchetti:</span>
              <span className="text-cyan-300 font-bold">npm install</span>
              <span className="text-slate-500 mt-1"># 2. Avvia l'applicazione:</span>
              <span className="text-cyan-300 font-bold">npm run dev</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3.5 bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Pronto per essere condiviso con la community</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
