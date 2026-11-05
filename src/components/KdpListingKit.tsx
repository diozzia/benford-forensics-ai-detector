import React, { useState } from 'react';
import { BOOK_METADATA } from '../data/bookContent';
import { calculateKdpRoyalty } from '../utils/kdpCalculations';
import { DollarSign, Copy, Check, TrendingUp, AlertCircle, Sparkles, BookCheck } from 'lucide-react';

interface KdpListingKitProps {
  pageCount: number;
}

export const KdpListingKit: React.FC<KdpListingKitProps> = ({ pageCount }) => {
  const [sellingPrice, setSellingPrice] = useState<number>(7.99);
  const [monthlyCopies, setMonthlyCopies] = useState<number>(250);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const pricing = calculateKdpRoyalty(sellingPrice, pageCount, false);
  const monthlyRevenue = Number((pricing.netProfitEur * monthlyCopies).toFixed(2));
  const yearlyRevenue = Number((monthlyRevenue * 12).toFixed(2));

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Financial & Royalty Calculator Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              Calcolatore Ufficiale Royalty Amazon KDP
            </span>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Economia del Libro: Prezzo di Vendita a circa 7€
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simula il tuo guadagno netto per copia venduta su Amazon.it per un libro cartaceo di {pageCount} pagine.
            </p>
          </div>

          <div className="bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 text-right">
            <span className="text-[11px] text-emerald-800 font-medium block">
              Tuo Guadagno Netto per Copia:
            </span>
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {pricing.netProfitEur.toFixed(2)} €
            </span>
            <span className="text-[10px] text-emerald-600 block">
              (Margine del {pricing.profitMarginPercent}%)
            </span>
          </div>
        </div>

        {/* Pricing Slider & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Prezzo di Vendita su Amazon.it:</span>
                <span className="text-base text-amber-600 font-mono">{sellingPrice.toFixed(2)} €</span>
              </div>
              <input
                type="range"
                min={pricing.minimumListPriceEur + 0.5}
                max={12.99}
                step={0.1}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>Min KDP: {pricing.minimumListPriceEur.toFixed(2)} €</span>
                <span className="font-bold text-slate-700">Consigliato: 6.99 € - 7.99 €</span>
                <span>Max: 12.99 €</span>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Prezzo di Listino Copertina:</span>
                <span className="font-mono font-bold text-slate-800">{sellingPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Costo di Stampa Amazon KDP ({pageCount} pag B&amp;N):</span>
                <span className="font-mono text-red-600">- {pricing.totalPrintCostEur.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quota Distribuzione Amazon (40%):</span>
                <span className="font-mono text-slate-500">- {(sellingPrice * 0.4).toFixed(2)} €</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-800 text-sm">
                <span>Royalty Netta Accreditata su Conto:</span>
                <span className="font-mono">+{pricing.netProfitEur.toFixed(2)} € / copia</span>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Simulator */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold">Simulatore Entrate Passive Mensili</h3>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Copie vendute al mese su Amazon:</span>
                <span className="font-mono font-bold text-amber-400">{monthlyCopies} copie/mese</span>
              </div>
              <input
                type="range"
                min={20}
                max={1000}
                step={10}
                value={monthlyCopies}
                onChange={(e) => setMonthlyCopies(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-300 block">Guadagno Mensile Netto:</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {monthlyRevenue.toLocaleString('it-IT')} €
                </span>
                <span className="text-[10px] text-slate-400 block">ogni mese su c/c</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-300 block">Proiezione Annuale:</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {yearlyRevenue.toLocaleString('it-IT')} €
                </span>
                <span className="text-[10px] text-slate-400 block">12 mesi di vendite</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amazon KDP Listing Toolkit (Copy-Paste Ready) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Amazon KDP Dashboard Ready
          </span>
          <h2 className="text-lg font-black text-slate-900">
            Kit di Pubblicazione &amp; Metadati Ottimizzati SEO
          </h2>
          <p className="text-xs text-slate-500">
            Copia e incolla questi testi direttamente nei campi della tua bacheca Amazon KDP.
          </p>
        </div>

        {/* Title and Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">1. Titolo del Libro:</span>
              <button
                onClick={() => copyToClipboard(BOOK_METADATA.title, 'title')}
                className="text-xs text-slate-600 hover:text-amber-600 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'title' ? 'Copiato!' : 'Copia'}
              </button>
            </div>
            <p className="text-xs text-slate-800 font-medium">{BOOK_METADATA.title}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">2. Sottotitolo del Libro:</span>
              <button
                onClick={() => copyToClipboard(BOOK_METADATA.subtitle, 'subtitle')}
                className="text-xs text-slate-600 hover:text-amber-600 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'subtitle' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'subtitle' ? 'Copiato!' : 'Copia'}
              </button>
            </div>
            <p className="text-xs text-slate-800 font-medium">{BOOK_METADATA.subtitle}</p>
          </div>
        </div>

        {/* 7 Amazon KDP Backend Keywords */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-xs font-bold text-slate-800">
                3. Le 7 Parole Chiave di Ricerca KDP (Keyword Boxes):
              </span>
              <span className="text-[11px] text-slate-500 block">
                Ottimizzate per comparire quando i genitori cercano su Amazon
              </span>
            </div>
            <button
              onClick={() =>
                copyToClipboard(BOOK_METADATA.amazonKeywords.join('\n'), 'all_keywords')
              }
              className="text-xs text-slate-600 hover:text-amber-600 flex items-center gap-1 font-semibold"
            >
              {copiedKey === 'all_keywords' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'all_keywords' ? 'Tutte Copiate!' : 'Copia Tutte'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
            {BOOK_METADATA.amazonKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs"
              >
                <span className="text-slate-800 font-medium truncate">
                  <span className="font-bold text-amber-600 mr-1.5">#{idx + 1}</span>
                  {kw}
                </span>
                <button
                  onClick={() => copyToClipboard(kw, `kw_${idx}`)}
                  className="text-slate-400 hover:text-slate-700 ml-2"
                >
                  {copiedKey === `kw_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BISAC Categories */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-800">
              4. Categorie Ufficiali Amazon / BISAC da selezionare:
            </span>
          </div>
          <div className="space-y-1 text-xs">
            {BOOK_METADATA.bisacCategories.map((cat, i) => (
              <div key={i} className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-700">
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Formatted HTML Description */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-xs font-bold text-slate-800">
                5. Descrizione di Vendita Amazon (Formattata in HTML):
              </span>
              <span className="text-[11px] text-slate-500 block">
                Con titoli in grassetto e punti elenco per massimizzare il tasso di conversione all'acquisto
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(BOOK_METADATA.descriptionHtml, 'desc_html')}
              className="text-xs text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-colors"
            >
              {copiedKey === 'desc_html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'desc_html' ? 'HTML Copiato!' : 'Copia Codice HTML'}
            </button>
          </div>

          <div
            className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 max-h-60 overflow-y-auto space-y-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: BOOK_METADATA.descriptionHtml }}
          />
        </div>
      </div>

      {/* KDP Publication 7-Step Checklist */}
      <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-2 mb-4">
          <BookCheck className="w-5 h-5 text-emerald-700" />
          <h3 className="text-sm font-bold text-emerald-950">
            Procedura di Pubblicazione su Amazon KDP (Passo dopo Passo)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              1. Crea o accedi al tuo account KDP
            </span>
            <p className="text-slate-600">
              Vai su <b>kdp.amazon.com</b> e accedi con il tuo account Amazon.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              2. Scegli "Crea Copertina Flessibile"
            </span>
            <p className="text-slate-600">
              Imposta il titolo, sottotitolo, autore e incolla le 7 parole chiave fornite sopra.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              3. Impostazioni Interno: 8.5" x 11" No Bleed
            </span>
            <p className="text-slate-600">
              Scegli carta bianca standard, orientamento verticale, dimensioni 21.59 x 27.94 cm.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              4. Carica il Manoscritto (PDF) e Copertina
            </span>
            <p className="text-slate-600">
              Usa il pulsante <b>"Esporta PDF per KDP"</b> in alto per scaricare o stampare il file pronto.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              5. Esegui il KDP Print Previewer
            </span>
            <p className="text-slate-600">
              Amazon controllerà margini, risoluzione e dorso in automatico (approvazione garantita).
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="font-bold text-emerald-800 block mb-0.5">
              6. Imposta il Prezzo a 7,99 € o 6,99 €
            </span>
            <p className="text-slate-600">
              Seleziona la distribuzione principale su Amazon.it e attiva la distribuzione estesa.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-200/60 text-center text-xs font-semibold text-emerald-900">
          🚀 Una volta cliccato su "Pubblica il tuo libro cartaceo", Amazon lo renderà acquistabile in tutto il mondo entro 24-72 ore!
        </div>
      </div>
    </div>
  );
};
