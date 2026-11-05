import React from 'react';
import { X, Check, Award, ArrowRight, ShieldCheck } from 'lucide-react';

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Analisi Competitiva &amp; Benchmark Amazon KDP
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Confronto con il Best-Seller del tuo Screenshot
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi modale"
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side by side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Reference Image from User Screenshot */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                1. Il Tuo Screenshot di Riferimento (Amazon.it):
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                #1 Più Venduto
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-300 shadow-xs max-h-72 flex items-center justify-center bg-white">
              <img
                src="/assets/aistudio/Immagine_324e3411.png"
                alt="Screenshot del libro best seller su Amazon KDP"
                className="w-full h-auto object-cover max-h-72"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
              <p><b>Titolo:</b> Il Mio Grande Libro da Colorare per Bambini (1-4 anni)</p>
              <p><b>Prezzo Amazon:</b> 7,99 € (Copertina flessibile)</p>
              <p><b>Pagine:</b> 102 pagine</p>
              <p><b>Dimensioni:</b> 21.59 x 0.58 x 27.94 cm (8.5" x 11")</p>
              <p><b>Elementi copertina:</b> Razzo, fungo, gelato, trenino, pulcino, palma, sole, fiore</p>
            </div>
          </div>

          {/* Our Generated & Upgraded Book Model */}
          <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">
                2. Il Nostro Modello Potenziato (Guide Pratiche):
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Conforme KDP
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-amber-100 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Stesse Specifiche Tecniche Vincenti di Amazon:
                </div>
                <p className="text-slate-600 text-[11px] pl-5">
                  102 pagine esatte, formato 21.59 x 27.94 cm, dorso calibrato a 0.58 cm, prezzo target a 7.99 € (netto per te: <b>2.97 €</b> a copia!).
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-amber-100 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  Il Nostro Vantaggio Competitivo: "Guide Pratiche &amp; Accessibili"
                </div>
                <p className="text-slate-600 text-[11px] pl-5">
                  Mentre il libro dello screenshot ha solo sagome vuote, il nostro include in ogni pagina:
                </p>
                <ul className="list-disc list-inside text-[11px] text-slate-700 pl-5 space-y-0.5">
                  <li><b>Vocabolario &amp; Onomatopee:</b> versi e suoni per lo stimolo del linguaggio.</li>
                  <li><b>Guida Motricità:</b> indicazioni sul gesto grafico per manine di 1-4 anni.</li>
                  <li><b>Domanda accessibile:</b> stimola l'interazione tra genitore e figlio.</li>
                  <li><b>Super Attestato finale:</b> gratificazione per il bambino e foto per recensioni!</li>
                </ul>
              </div>

              <div className="p-3 bg-white rounded-lg border border-amber-100 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Kit Pubblicazione Immediata:
                </div>
                <p className="text-slate-600 text-[11px] pl-5">
                  Trovi già pronti il testo della descrizione HTML per Amazon, le 7 parole chiave segrete, e la copertina completa pronta da esportare in PDF.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Tutti i file sono pronti per l'upload su Amazon KDP Print On Demand.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Inizia ad Esplorare il Libro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
