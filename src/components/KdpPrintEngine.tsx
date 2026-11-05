import React, { useState } from 'react';
import { BookPage, BOOK_METADATA } from '../data/bookContent';
import {
  generateKdpBookPdf,
  generateKdpCoverPdf,
  PdfGenerationProgress,
  GeneratedPdfResult,
} from '../utils/pdfGenerator';
import {
  downloadStandaloneHtmlBook,
  openPrintableHtmlInNewWindow,
} from '../utils/htmlExporter';
import {
  Printer,
  Download,
  CheckCircle2,
  FileText,
  Sparkles,
  AlertCircle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Eye,
  X,
  HelpCircle,
  Scissors,
} from 'lucide-react';

interface KdpPrintEngineProps {
  pages: BookPage[];
}

export const KdpPrintEngine: React.FC<KdpPrintEngineProps> = ({ pages }) => {
  const [printScope, setPrintScope] = useState<'all' | 'samples' | 'frontmatter'>('samples');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<PdfGenerationProgress | null>(null);
  const [generatedPdf, setGeneratedPdf] = useState<GeneratedPdfResult | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate full 102-page PDF
  const handleDownloadFullPdf = async () => {
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await generateKdpBookPdf(pages, BOOK_METADATA, (progress) => {
        setPdfProgress(progress);
      });
      setGeneratedPdf(result);
      setSuccessMessage('PDF da 102 pagine generato con successo! Se il download automatico non si è avviato, usa i pulsanti verdi qui sotto.');
    } catch (err: any) {
      console.error('Errore generazione PDF:', err);
      setErrorMessage(
        'Si è verificato un errore durante la compilazione del PDF. Usa il pulsante "Apri Versione Stampabile" oppure scarica il campione da 10 pagine.'
      );
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Generate Part 1 (pages 1-52)
  const handleDownloadPart1 = async () => {
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const partPages = pages.slice(0, 52);
      const result = await generateKdpBookPdf(
        partPages,
        BOOK_METADATA,
        (progress) => setPdfProgress(progress),
        'Il_Mio_Grande_Libro_PARTE_1_Pagine_1_a_52.pdf'
      );
      setGeneratedPdf(result);
      setSuccessMessage('Parte 1 (Pagine 1-52) generata con successo!');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Errore nella generazione della Parte 1.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Generate Part 2 (pages 53-102)
  const handleDownloadPart2 = async () => {
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const partPages = pages.slice(52);
      const result = await generateKdpBookPdf(
        partPages,
        BOOK_METADATA,
        (progress) => setPdfProgress(progress),
        'Il_Mio_Grande_Libro_PARTE_2_Pagine_53_a_102.pdf'
      );
      setGeneratedPdf(result);
      setSuccessMessage('Parte 2 (Pagine 53-102) generata con successo!');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Errore nella generazione della Parte 2.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Generate sample 10-page PDF
  const handleDownloadSamplePdf = async () => {
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await generateKdpBookPdf(
        pages.slice(0, 10),
        BOOK_METADATA,
        (progress) => setPdfProgress(progress),
        'Campione_KDP_Prime_10_Pagine.pdf'
      );
      setGeneratedPdf(result);
      setSuccessMessage('Campione PDF (10 pagine) generato con successo!');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Errore nella generazione del campione PDF.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Generate Wraparound Cover PDF
  const handleDownloadCoverPdf = async () => {
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await generateKdpCoverPdf(pages.length, (progress) => {
        setPdfProgress(progress);
      });
      setGeneratedPdf(result);
      setSuccessMessage('Copertina KDP Wraparound (17.48" x 11.25", Dorso 0.58 cm) pronta per il salvataggio!');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Errore nella generazione del PDF copertina.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Open printable version directly in a new window/tab
  const handleOpenPrintWindow = () => {
    try {
      openPrintableHtmlInNewWindow(pages);
      setSuccessMessage('Nuova finestra di stampa aperta! Premi Ctrl+P (o Cmd+P) e seleziona "Salva come PDF".');
    } catch {
      downloadStandaloneHtmlBook(pages);
      setSuccessMessage('File HTML scaricato: aprilo con un clic nel tuo browser per salvare come PDF!');
    }
  };

  // Download Standalone HTML file
  const handleDownloadHtml = () => {
    try {
      downloadStandaloneHtmlBook(pages);
      setSuccessMessage('File HTML autonomo scaricato! Aprilo con doppio clic per visualizzare e stampare tutte le 102 pagine.');
    } catch (err: any) {
      setErrorMessage('Errore nel download del file HTML.');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP NOTIFICATION: Why PDF download might be blocked in iframe */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-xs">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <p className="font-bold text-amber-950 text-sm">
              Non riesci a salvare il PDF? Ecco come fare subito:
            </p>
            <p className="text-amber-800 leading-relaxed">
              I browser moderni (Chrome, Safari, Edge) bloccano per motivi di sicurezza i download automatici all'interno dei pannelli di anteprima in <i>iframe</i>.
              Per salvare il libro sul tuo computer senza blocchi, hai <b>3 opzioni garantite</b>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <b className="text-emerald-800 block mb-0.5">Opzione 1 (Consigliata)</b>
                Clicca su <b>"Genera PDF"</b> e poi sul link diretto di download fisico che compare nel riquadro verde.
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <b className="text-blue-800 block mb-0.5">Opzione 2 (In Nuova Scheda)</b>
                Clicca su <b>"Apri in Nuova Scheda"</b> per visualizzare il PDF a schermo intero e cliccare sull'icona della freccia "Salva".
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <b className="text-amber-900 block mb-0.5">Opzione 3 (Stampa Vettoriale)</b>
                Clicca su <b>"Apri Versione Stampabile"</b> e salva direttamente con Ctrl+P / Cmd+P in qualità 100% vettoriale.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN DOWNLOAD CONTROL CENTER */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              Esportazione Ufficiale Amazon KDP
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Printer className="w-6 h-6 text-slate-800" />
              Centro Stampa &amp; Salvataggio PDF (102 Pagine)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Formato Amazon KDP standard: <b>8.5" x 11" (21.59 x 27.94 cm)</b> · Margini di sicurezza 0.5" · No Bleed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* 102 Pages Full Book */}
            <button
              onClick={handleDownloadFullPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generazione in corso...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Genera PDF Completo (102 Pagine)</span>
                </>
              )}
            </button>

            {/* Open Printable Version in New Tab */}
            <button
              onClick={handleOpenPrintWindow}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-800 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              title="Apre il documento completo in una nuova finestra fuori dall'iframe con finestra di stampa nativa"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Apri Versione Stampabile (Ctrl+P)</span>
            </button>

            {/* Quick 10 Pages Sample */}
            <button
              onClick={handleDownloadSamplePdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Campione 10 Pagine</span>
            </button>
          </div>
        </div>

        {/* Live Progress Bar when Generating */}
        {isGeneratingPdf && pdfProgress && (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 animate-pulse">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                {pdfProgress.status}
              </span>
              <span className="font-mono text-sm">{pdfProgress.percentage}%</span>
            </div>

            <div className="w-full h-3 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-150"
                style={{ width: `${pdfProgress.percentage}%` }}
              />
            </div>

            <p className="text-[11px] text-emerald-700 text-center">
              Compilazione delle pagine a 300 DPI con contorni bold per bambini 1-4 anni...
            </p>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUCCESS PANEL: THE PERSISTENT DOWNLOAD ACTIONS */}
        {/* ------------------------------------------------------------- */}
        {generatedPdf && (
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500 rounded-2xl shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-emerald-950">
                    Il tuo PDF è pronto! ({generatedPdf.pageCount} {generatedPdf.pageCount === 1 ? 'pagina' : 'pagine'}, ~{(generatedPdf.byteSize / 1024 / 1024).toFixed(1)} MB)
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Scegli la modalità che preferisci per salvare o visualizzare il file:
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                {generatedPdf.filename}
              </span>
            </div>

            {/* The 4 Guaranteed Save/Open Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Option A: Direct Physical Download Link (Allowed by browser) */}
              <a
                href={generatedPdf.blobUrl}
                download={generatedPdf.filename}
                className="inline-flex items-center justify-center gap-2 p-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm hover:shadow text-center"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>1. Scarica File PDF</span>
              </a>

              {/* Option B: Open in New Browser Tab (Outside iframe, with browser save toolbar) */}
              <a
                href={generatedPdf.blobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 p-3 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all shadow-xs text-center"
              >
                <ExternalLink className="w-4 h-4 text-slate-600 shrink-0" />
                <span>2. Apri in Nuova Scheda</span>
              </a>

              {/* Option C: In-App Embedded Preview Modal */}
              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 p-3 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors text-center cursor-pointer"
              >
                <Eye className="w-4 h-4 text-blue-600 shrink-0" />
                <span>3. Anteprima Integrata</span>
              </button>

              {/* Option D: Standalone HTML Print-to-PDF */}
              <button
                onClick={handleOpenPrintWindow}
                className="inline-flex items-center justify-center gap-2 p-3 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors text-center cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-700 shrink-0" />
                <span>4. Stampa Vettoriale (Ctrl+P)</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 text-rose-900 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && !generatedPdf && (
          <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECONDARY GENERATION OPTIONS: PARTS & COVER */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <span className="text-xs font-bold text-slate-700 block">
            Opzioni di Download Alternative &amp; Copertina:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Split Part 1 */}
            <button
              onClick={handleDownloadPart1}
              disabled={isGeneratingPdf}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-slate-500" />
                  Parte 1 (Pag. 1 - 52)
                </span>
                <span className="text-[10px] text-slate-400">52 pag</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Frontespizio, Guide e primi 22 disegni (file più leggero).
              </p>
            </button>

            {/* Split Part 2 */}
            <button
              onClick={handleDownloadPart2}
              disabled={isGeneratingPdf}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-slate-500" />
                  Parte 2 (Pag. 53 - 102)
                </span>
                <span className="text-[10px] text-slate-400">50 pag</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Disegni 23-48, attestato finale e nota autore.
              </p>
            </button>

            {/* Full Wraparound Cover PDF */}
            <button
              onClick={handleDownloadCoverPdf}
              disabled={isGeneratingPdf}
              className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Copertina Wraparound KDP
                </span>
                <span className="text-[10px] text-amber-700 font-mono">0.58 cm dorso</span>
              </div>
              <p className="text-[11px] text-amber-800">
                PDF 17.48" x 11.25" con fronte, dorso esatto e retro.
              </p>
            </button>

            {/* Standalone HTML File */}
            <button
              onClick={handleDownloadHtml}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  File HTML Autonomo
                </span>
                <span className="text-[10px] text-slate-400">.html</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Scarica file unico da aprire in locale e salvare con Ctrl+P.
              </p>
            </button>
          </div>
        </div>

        {/* Technical Specs Footer */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Formato 8.5" x 11" (21.59 x 27.94 cm) · Margine 0.5" · No Bleed · Carta Bianca KDP 55lb</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenPrintWindow}
              className="text-amber-700 hover:text-amber-900 font-semibold underline flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              Apri finestra di stampa browser esterna
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STEP-BY-STEP KDP UPLOAD GUIDE */}
      {/* ------------------------------------------------------------- */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Come caricare il file scaricato su Amazon KDP (Passo dopo Passo)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-slate-600">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              1
            </span>
            <b className="text-slate-900 block">Scarica il PDF</b>
            <p className="text-[11px]">
              Clicca su "Scarica File PDF" o salvalo tramite "Apri in Nuova Scheda". Troverai il file nella tua cartella <i>Download</i>.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              2
            </span>
            <b className="text-slate-900 block">Accedi a KDP</b>
            <p className="text-[11px]">
              Vai su <b>kdp.amazon.com</b> &gt; Crea &gt; seleziona <b>Copertina Flessibile</b> (Paperback).
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              3
            </span>
            <b className="text-slate-900 block">Imposta le Dimensioni</b>
            <p className="text-[11px]">
              Dimensioni gabbia: <b>8,5 x 11 pollici</b>.<br />
              Al vivo: <b>Nessun al vivo (No Bleed)</b>.<br />
              Finitura: Lucida o Opaca.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              4
            </span>
            <b className="text-slate-900 block">Carica Manoscritto</b>
            <p className="text-[11px]">
              Fai clic su <b>"Carica manoscritto con copertina flessibile"</b> e seleziona il PDF scaricato. Il controllo automatico KDP lo approverà senza errori!
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ON-SCREEN PREVIEW OF THE BOOK PAGES */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Anteprima Rapida a Schermo:</span>
            <button
              onClick={() => setPrintScope('samples')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                printScope === 'samples'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Campione 10 Pagine
            </button>
            <button
              onClick={() => setPrintScope('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                printScope === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tutte le 102 Pagine
            </button>
            <button
              onClick={() => setPrintScope('frontmatter')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                printScope === 'frontmatter'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Guide &amp; Attestato
            </button>
          </div>

          <span className="text-[11px] text-slate-400">
            Mostrate {printScope === 'all' ? 102 : printScope === 'samples' ? 10 : 6} pagine
          </span>
        </div>

        {/* Stack */}
        <div className="space-y-4">
          {(printScope === 'all'
            ? pages
            : printScope === 'samples'
            ? pages.slice(0, 10)
            : pages.filter((p) => p.type !== 'illustration' && p.type !== 'blank-back')
          ).map((p) => (
            <div
              key={p.id}
              className="kdp-page bg-white p-8 rounded-xl border border-slate-200 shadow-sm aspect-[8.5/11] max-w-[550px] mx-auto flex flex-col justify-between"
            >
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-b border-slate-100 pb-2">
                <span>{p.category || 'GUIDA PRATICA KDP'}</span>
                <span>PAGINA {p.pageNumber} DI 102</span>
              </div>

              <div className="flex-1 my-4 flex flex-col justify-center">
                {p.type === 'half-title' && (
                  <div className="text-center p-6">
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{p.title}</h1>
                    <p className="text-xs text-slate-600">{p.subtitle}</p>
                  </div>
                )}

                {p.type === 'belongs-to' && (
                  <div className="text-center border-2 border-dashed border-slate-300 p-6 rounded-xl">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">{p.title}</h2>
                    <div className="w-48 h-8 border-b-2 border-slate-400 mx-auto mb-4" />
                    <p className="text-xs text-slate-500">Età: ________ | Colore preferito: ________</p>
                  </div>
                )}

                {p.type === 'guide-intro' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                    <p className="text-slate-600">{p.subtitle}</p>
                    <p className="text-slate-500 text-[11px]">
                      Linee spesse 8mm per guidare il gesto grafico dei bimbi da 1 a 4 anni.
                    </p>
                  </div>
                )}

                {p.type === 'certificate' && (
                  <div className="text-center border-4 border-double border-amber-500 p-6 rounded-xl bg-amber-50/30">
                    <h2 className="text-xl font-black text-slate-900 mb-2">{p.title}</h2>
                    <p className="text-xs text-slate-600 mb-4">{p.subtitle}</p>
                    <div className="w-56 h-8 border-b-2 border-amber-600 mx-auto mb-2" />
                    <span className="text-[10px] text-slate-400">Nome del Bambino</span>
                  </div>
                )}

                {p.type === 'blank-back' && (
                  <div className="text-center text-xs text-slate-400 italic p-6">
                    Pagina protettiva anti-sbavatura (lasciata volutamente libera)
                  </div>
                )}

                {p.type === 'illustration' && (
                  <div className="h-full flex flex-col justify-between">
                    <div className="text-center mb-2">
                      <span className="text-3xl font-black font-mono tracking-widest text-slate-900">
                        {p.wordLabel}
                      </span>
                    </div>
                    <div
                      className="w-full flex-1 max-h-[360px] flex items-center justify-center p-2"
                      dangerouslySetInnerHTML={{ __html: p.svgData || '' }}
                    />
                    {p.practicalGuide && (
                      <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-600">
                        <span className="font-bold text-slate-800">Guida Genitori:</span>{' '}
                        {p.practicalGuide.vocabolario} · {p.practicalGuide.domandaAccessibile}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center text-xs font-mono text-slate-400 pt-2 border-t border-slate-100">
                — {p.pageNumber} —
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* IN-APP PDF VIEWER MODAL */}
      {/* ------------------------------------------------------------- */}
      {isPreviewModalOpen && generatedPdf && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm">{generatedPdf.filename}</h3>
                  <span className="text-xs text-slate-400">
                    {generatedPdf.pageCount} pagine · Visualizzatore PDF Integrato
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={generatedPdf.blobUrl}
                  download={generatedPdf.filename}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Scarica PDF
                </a>

                <a
                  href={generatedPdf.blobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Nuova Scheda
                </a>

                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF */}
            <div className="flex-1 bg-slate-100 p-2">
              <iframe
                src={generatedPdf.blobUrl}
                title="Anteprima PDF"
                className="w-full h-full rounded-lg border border-slate-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
