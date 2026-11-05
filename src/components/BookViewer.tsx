import React, { useState } from 'react';
import { BookPage } from '../data/bookContent';
import { ChevronLeft, ChevronRight, BookOpen, Layers, Sparkles, Award } from 'lucide-react';

interface BookViewerProps {
  pages: BookPage[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onSelectForColoring: (page: BookPage) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  pages,
  currentPage,
  setCurrentPage,
  onSelectForColoring,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'spread'>('single');

  const page = pages.find((p) => p.pageNumber === currentPage) || pages[0];
  const isIllustration = page.type === 'illustration';

  const nextPage = () => {
    if (viewMode === 'spread') {
      setCurrentPage(Math.min(pages.length, currentPage + 2));
    } else {
      setCurrentPage(Math.min(pages.length, currentPage + 1));
    }
  };

  const prevPage = () => {
    if (viewMode === 'spread') {
      setCurrentPage(Math.max(1, currentPage - 2));
    } else {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
  };

  // Render a single page content
  const renderPageContent = (p: BookPage, isLeftSpread: boolean = false) => {
    switch (p.type) {
      case 'half-title':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-amber-50/20">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
              Frontespizio Interno KDP
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 max-w-md">
              {p.title}
            </h1>
            <p className="text-base text-slate-600 mb-8 max-w-sm">
              {p.subtitle}
            </p>
            <div className="w-16 h-1 bg-amber-500 rounded-full mb-6" />
            <p className="text-sm font-semibold text-slate-500">
              Edizioni Piccoli Esploratori
            </p>
          </div>
        );

      case 'title':
        return (
          <div className="h-full flex flex-col justify-between p-8 text-xs text-slate-600 bg-white leading-relaxed">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                Informazioni di Pubblicazione &amp; Copyright
              </h2>
              <p className="mb-3">
                <b>Titolo:</b> Il Mio Grande Libro Pratico da Colorare: 100+ Disegni con Linee Spesse per Bambini da 1 a 4 Anni
              </p>
              <p className="mb-3">
                <b>Collana:</b> Guide Pratiche &amp; Accessibili per la Prima Infanzia
              </p>
              <p className="mb-3">
                <b>Formato KDP:</b> Copertina Flessibile (Paperback), 21.59 x 27.94 cm (8.5 x 11 pollici), 102 Pagine.
              </p>
              <p className="mb-3">
                <b>ISBN-13:</b> 979-12-80000-00-0
              </p>
              <p className="mb-3">
                <b>Copyright © 2026 Piccoli Esploratori Studio.</b> Tutti i diritti sono riservati. Nessuna parte di questa pubblicazione può essere riprodotta o trasmessa senza autorizzazione scritta dell'editore.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-800 mb-1">Specifiche di Stampa Amazon KDP:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-500">
                <li>Stampa su richiesta (Print on Demand) tramite Amazon KDP</li>
                <li>Carta bianca standard 55 libbre (90 g/m²)</li>
                <li>Design a pagina singola anti-sbavatura</li>
                <li>Conforme alle linee guida di sicurezza e accessibilità visiva</li>
              </ul>
            </div>
          </div>
        );

      case 'belongs-to':
        return (
          <div className="h-full flex flex-col justify-between items-center text-center p-8 border-4 border-amber-400 rounded-2xl bg-amber-50/40">
            <div className="pt-4">
              <span className="text-sm font-bold text-amber-800 uppercase tracking-wider">
                🌟 Il Tuo Libro Personale 🌟
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Questo Libro Speciale Appartiene a:
              </h2>
            </div>

            <div className="w-full max-w-sm space-y-6 my-auto">
              <div className="border-b-4 border-dashed border-amber-500 pb-2">
                <span className="text-xs text-amber-700 font-semibold block mb-1">IL MIO NOME:</span>
                <div className="h-10 text-xl font-bold text-slate-800 flex items-center justify-center">
                  (Scrivi o fai scrivere il nome qui)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-b-2 border-dashed border-amber-400 pb-1">
                  <span className="text-xs text-amber-700 block">HO QUESTI ANNI:</span>
                  <div className="h-8 flex items-center justify-center font-bold text-slate-700">______</div>
                </div>
                <div className="border-b-2 border-dashed border-amber-400 pb-1">
                  <span className="text-xs text-amber-700 block">COLORE PREFERITO:</span>
                  <div className="h-8 flex items-center justify-center font-bold text-slate-700">______</div>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-amber-900">
                🖐️ <b>Impronta della mia manina:</b> puoi fare il contorno della tua mano qui sotto con il tuo pastello preferito!
              </div>
            </div>

            <div className="w-full h-24 border-2 border-dashed border-amber-300 rounded-xl flex items-center justify-center text-xs text-amber-600">
              Disegna il contorno della tua manina qui dentro
            </div>
          </div>
        );

      case 'guide-intro':
        return (
          <div className="h-full flex flex-col justify-between p-6 bg-emerald-50/30 border border-emerald-200 rounded-xl text-slate-700">
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Guida Pratica &amp; Accessibile
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                Come usare questo libro con bambini da 1 a 4 anni
              </h2>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Questo non è un semplice libro da colorare: è uno strumento pratico di esplorazione sensoriale e potenziamento della motricità fine.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-xs">
                  <h4 className="font-bold text-emerald-900 mb-1">1. Le Linee Extra Spesse (5-8 mm)</h4>
                  <p className="text-slate-600">
                    A 1-3 anni la visione e la coordinazione non permettono precisione millimetrica. Il contorno spesso e scuro offre un confine visivo netto e rassicurante.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-xs">
                  <h4 className="font-bold text-emerald-900 mb-1">2. Stimolazione Fonetica &amp; Onomatopee</h4>
                  <p className="text-slate-600">
                    Ogni pagina suggerisce il verso dell'animale o il suono dell'oggetto (es. <i>"Ciuf ciuf"</i>, <i>"Brum brum"</i>). Ripetilo con gioia: attiva le aree del linguaggio.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-xs">
                  <h4 className="font-bold text-emerald-900 mb-1">3. Nessuna Pressione sul Risultato</h4>
                  <p className="text-slate-600">
                    Il primo stadio è lo scarabocchio energico. Valorizza la scelta del colore e l'intenzione del bambino senza imporre di "stare nei bordi".
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-xs">
                  <h4 className="font-bold text-emerald-900 mb-1">4. Pastelli Consigliati</h4>
                  <p className="text-slate-600">
                    Usa pastelli a cera a fusto triangolare o pennarelli lavabili con punta grossa e bloccata, ideali per la presa palmare dei più piccoli.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-800 bg-emerald-100/60 p-2.5 rounded-lg font-medium text-center">
              💡 Troverai la <b>Mini-Guida Pratica</b> in fondo a ciascuna pagina da colorare!
            </div>
          </div>
        );

      case 'blank-back':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700 mb-1">
              Pagina Protettiva Anti-Sbavatura
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              Questo retro pagina è volutamente lasciato libero per evitare che l'inchiostro dei pennarelli attraversi la carta e rovini il disegno successivo.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 max-w-xs">
              ✏️ <b>Idea creativa:</b> il bambino può usare questo spazio per fare scarabocchi liberi o incollare adesivi!
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="h-full flex flex-col justify-between items-center text-center p-8 border-8 border-double border-amber-500 rounded-2xl bg-amber-50/60">
            <div className="pt-2">
              <Award className="w-14 h-14 text-amber-500 mx-auto mb-2" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-800">
                Traguardo Raggiunto
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                SUPER ATTESTATO DEL PICCOLO ARTISTA
              </h2>
            </div>

            <div className="space-y-4 my-auto max-w-sm w-full">
              <p className="text-sm text-slate-700 font-medium">
                Si certifica con grande gioia che:
              </p>
              <div className="border-b-4 border-amber-600 pb-1">
                <span className="text-xl font-bold text-slate-900 block">
                  ___________________________
                </span>
              </div>
              <p className="text-xs text-slate-600">
                ha colorato con fantasia, curiosità e allegria, scoprendo tanti nuovi amici del mondo animale, veicoli e natura!
              </p>

              <div className="flex justify-between items-center pt-6 px-4 text-xs font-semibold text-slate-700">
                <div>
                  <div className="w-24 border-b border-slate-400 mb-1" />
                  <span>Data</span>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-black text-amber-800 bg-amber-100 rotate-12">
                  BRAVISSIMO!
                </div>
                <div>
                  <div className="w-24 border-b border-slate-400 mb-1" />
                  <span>Firma Genitore</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-amber-800 font-bold">
              🌟 Conserva questa pagina ricordo come prima opera d'arte del tuo bambino!
            </p>
          </div>
        );

      case 'author-note':
        return (
          <div className="h-full flex flex-col justify-between p-8 bg-white border border-slate-200 rounded-xl text-slate-700">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                Grazie di Cuore
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                Un Messaggio dall'Autore
              </h2>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Cara mamma, caro papà o educatore, creare questo libro è stato un atto di amore per le prime fasi dell'infanzia. Speriamo che abbia regalato al tuo piccolo ore di serenità e scoperte gioiose.
              </p>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <h4 className="font-bold text-amber-900 text-xs mb-1">
                  ⭐ Il Tuo Aiuto Vale Tantissimo su Amazon!
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed mb-2">
                  Le recensioni oneste dei genitori sono fondamentali per far conoscere questo progetto indipendente. Se il libro ti è piaciuto, <b>lascia una recensione a 5 stelle con una foto delle creazioni del tuo bimbo!</b>
                </p>
                <div className="inline-block px-3 py-1 bg-amber-600 text-white rounded text-xs font-bold">
                  amazon.it/review/create-review
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <h4 className="font-bold text-slate-800 mb-1">🎁 20 Pagine Extra in Regalo (PDF Stampabile)</h4>
                <p className="text-slate-600 mb-2">
                  Scarica gratis altre 20 illustrazioni speciali visitando il sito dell'autore o inquadrando il QR code nel retro copertina:
                </p>
                <code className="text-slate-800 font-mono text-[11px] bg-slate-200 px-2 py-0.5 rounded">
                  bonus.piccoliesploratori.com/kdp
                </code>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Stampato con passione tramite Amazon KDP · Prima Edizione 2026
            </div>
          </div>
        );

      case 'illustration':
      default:
        return (
          <div className="h-full flex flex-col justify-between bg-white rounded-xl relative">
            {/* Header with traceable bold word label */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {p.category}
              </span>
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 tracking-widest font-mono border-2 border-dashed border-slate-300 px-3 py-0.5 rounded-lg bg-slate-50">
                  {p.wordLabel}
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-medium mt-0.5">
                  Colora o traccia le lettere
                </span>
              </div>
              <span className="text-xs font-bold text-amber-600">
                #{p.id - 4}
              </span>
            </div>

            {/* Main coloring SVG canvas */}
            <div className="flex-1 flex items-center justify-center p-2 min-h-0">
              <div
                className="w-full h-full max-h-[360px] flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: p.svgData || '' }}
              />
            </div>

            {/* Bottom: Practical Accessible Guide for Parents */}
            {p.practicalGuide && (
              <div className="mt-2 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Guida Pratica Accessibile per il Genitore</span>
                  </div>
                  <button
                    onClick={() => onSelectForColoring(p)}
                    className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 underline"
                  >
                    Colora digitalmente →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-700 leading-tight">
                  <div className="bg-white/80 p-1.5 rounded border border-amber-100">
                    <span className="font-bold text-amber-800">🗣️ Vocabolario:</span>{' '}
                    {p.practicalGuide.vocabolario}
                  </div>
                  <div className="bg-white/80 p-1.5 rounded border border-amber-100">
                    <span className="font-bold text-amber-800">🖐️ Motricità:</span>{' '}
                    {p.practicalGuide.motricita}
                  </div>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-slate-600">
                  <span>
                    <b>💡 Stimolo:</b> {p.practicalGuide.domandaAccessibile}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Top controls toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'single'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pagina Singola (KDP Interior)
          </button>
          <button
            onClick={() => setViewMode('spread')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'spread'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Doppia Pagina (Libro Aperto)
          </button>
        </div>

        {/* Quick jump input and page indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Pagina <span className="font-bold text-slate-800">{currentPage}</span> di{' '}
            <span className="font-bold text-slate-800">{pages.length}</span>
          </span>

          <input
            type="range"
            min={1}
            max={pages.length}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="w-28 sm:w-40 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={currentPage <= 1}
              aria-label="Pagina precedente"
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= pages.length}
              aria-label="Pagina successiva"
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {isIllustration && (
          <button
            onClick={() => onSelectForColoring(page)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <span>Colora Questa Pagina</span>
          </button>
        )}
      </div>

      {/* Book simulation container */}
      <div className="flex justify-center items-center py-4 bg-slate-100/80 rounded-2xl p-4 border border-slate-200 min-h-[580px]">
        {viewMode === 'single' ? (
          /* Single Page View */
          <div className="relative bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-[480px] aspect-[8.5/11] flex flex-col justify-between border border-slate-300">
            {/* Top safe margin indicator */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono select-none">
              <span>FORMATO KDP 8.5" x 11"</span>
              <span>MARGINE SICURO 0.5"</span>
            </div>

            {/* Page content */}
            <div className="flex-1 my-2 overflow-hidden flex flex-col justify-between">
              {renderPageContent(page)}
            </div>

            {/* Bottom page number */}
            <div className="text-center pt-2 border-t border-slate-100 text-xs font-mono text-slate-400">
              — {page.pageNumber} —
            </div>
          </div>
        ) : (
          /* Dual Spread View (Left & Right) */
          <div className="flex items-center gap-1 max-w-[960px] w-full">
            {/* Left Page (Verso, even) */}
            {currentPage > 1 ? (
              <div className="flex-1 bg-white shadow-lg rounded-l-lg p-6 aspect-[8.5/11] flex flex-col justify-between border border-slate-300 border-r-slate-400/50">
                <div className="text-[10px] text-slate-400 font-mono text-left">
                  PAGINA SINISTRA (VERSO)
                </div>
                <div className="flex-1 my-2 overflow-hidden">
                  {renderPageContent(pages[currentPage - 2] || pages[0], true)}
                </div>
                <div className="text-left text-xs font-mono text-slate-400">
                  — {currentPage - 1} —
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-slate-200/50 rounded-l-lg p-6 aspect-[8.5/11] flex items-center justify-center text-xs text-slate-400 italic">
                Retro di Copertina (Bianco)
              </div>
            )}

            {/* Center Book Spine Crease */}
            <div className="w-3 self-stretch bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 shadow-inner rounded-xs opacity-60" />

            {/* Right Page (Recto, odd) */}
            <div className="flex-1 bg-white shadow-lg rounded-r-lg p-6 aspect-[8.5/11] flex flex-col justify-between border border-slate-300 border-l-slate-400/50">
              <div className="text-[10px] text-slate-400 font-mono text-right">
                PAGINA DESTRA (RECTO)
              </div>
              <div className="flex-1 my-2 overflow-hidden">
                {renderPageContent(page, false)}
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                — {page.pageNumber} —
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Jump Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
        <span className="font-semibold text-slate-800">Salta rapidamente a:</span>
        <button
          onClick={() => setCurrentPage(1)}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Frontespizio (p.1)
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Appartiene a... (p.3)
        </button>
        <button
          onClick={() => setCurrentPage(4)}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Guida Genitori (p.4)
        </button>
        <button
          onClick={() => setCurrentPage(5)}
          className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition-colors"
        >
          Primo Disegno (p.5)
        </button>
        <button
          onClick={() => setCurrentPage(51)}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Metà Libro (p.51)
        </button>
        <button
          onClick={() => setCurrentPage(101)}
          className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition-colors"
        >
          Attestato Finale (p.101)
        </button>
        <button
          onClick={() => setCurrentPage(102)}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Bonus &amp; Review (p.102)
        </button>
      </div>
    </div>
  );
};
