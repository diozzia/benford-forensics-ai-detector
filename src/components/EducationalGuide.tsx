/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FORENSIC_METHODS } from '../utils/benfordEngine';
import { BookOpen, Check, X, Sparkles, Brain, Sigma, Layers, ShieldCheck } from 'lucide-react';

export function EducationalGuide() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-2">
      {/* Hero Explanatory Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/50 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Guida Scientifica e Risposta Diretta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
            Come Tradurre le Proprietà dei Pixel in Cifre da 1 a 9 per la Legge di Benford
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            La Legge di Benford stabilisce che in molti insiemi di dati naturali la prima cifra significativa non è equiprobabile, ma segue la legge logaritmica{' '}
            <span className="text-cyan-300 font-mono font-semibold">P(d) = log₁₀(1 + 1/d)</span>.
            I singoli valori di colore RGB (0–255) non possono essere usati direttamente, ma esistono proprietà matematiche fondamentali dei pixel che la soddisfano in modo perfetto.
          </p>
        </div>
      </div>

      {/* Question 1: Why raw RGB fails */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg">
        <div className="flex items-center gap-2.5 text-rose-400">
          <X className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-100">
            1. Perché i valori RGB grezzi (0–255) NON funzionano direttamente?
          </h2>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          Se proviamo a estrarre la prima cifra direttamente dall'intensità luminosa o dal valore del canale RGB di un pixel (un numero intero tra 0 e 255), la Legge di Benford fallisce miseramente per due ragioni matematiche:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4">
            <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-1.5">
              A. Distorsione da Dominio Finito a 8-bit
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nell'intervallo 0..255, i numeri che iniziano con <strong>1</strong> sono 1, 10–19 e 100–199 (ben <strong>111 valori su 256</strong>, pari al 43.3%!). Quelli che iniziano con <strong>9</strong> sono solo 9 e 90–99 (solo <strong>11 valori</strong>, pari al 4.3%). Questa distorsione deriva puramente dalla codifica a 8-bit e dall'esposizione della fotocamera, non dalla struttura fisica dell'immagine.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4">
            <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-1.5">
              B. Assenza di Invarianza di Scala
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La Legge di Benford si applica a variabili che si estendono su <strong>diversi ordini di grandezza</strong> (ad esempio da 0.001 a 1000) e che presentano distribuzioni a coda pesante (power-law o log-normali). I pixel grezzi sono vincolati tra il nero (0) e il bianco saturo (255).
            </p>
          </div>
        </div>
      </div>

      {/* Question 2: Which properties DO translate to 1..9? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col gap-6 shadow-lg">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <Check className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-100">
            2. Quali proprietà dei pixel si possono tradurre in cifre da 1 a 9?
          </h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          La ricerca scientifica in <em>Digital Image Forensics</em> (in particolare gli studi pionieristici di <strong>Fu et al., 2007</strong> e <strong>Pevný & Fridrich</strong>) ha dimostrato che applicando operatori differenziali o spettrali ai pixel, i risultati seguono rigorosamente la Legge di Benford. Ecco le 4 proprietà più efficaci:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FORENSIC_METHODS.filter(m => m.category !== 'counterproof').map((method) => (
            <div
              key={method.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-100">
                    {method.name}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                    Scientifico
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-300 mt-2 bg-slate-900/90 px-2.5 py-1.5 rounded border border-slate-800">
                  {method.formula}
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {method.scientificExplanation}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-[11px] text-slate-500">
                <span className="text-slate-400 font-semibold">Perché l'AI fallisce:</span>{' '}
                {method.whyAiFails}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question 3: How does the algorithm extract the digit 1..9 from a pixel? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg">
        <div className="flex items-center gap-2.5 text-cyan-400">
          <Sigma className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-100">
            3. Algoritmo di Estrazione: Da Proprietà a Numero [1–9]
          </h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Qualsiasi proprietà calcolata produce un numero reale continuo positivo <span className="font-mono text-cyan-300">V &gt; 0</span> (ad esempio una magnitudo gradiente di 4.82 o un residuo Laplaciano di 0.039). L'estrazione della prima cifra significativa avviene in 3 passaggi:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs font-mono">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1.5">
            <span className="text-slate-500 text-[10px] uppercase">Passaggio 1</span>
            <span className="text-slate-200 font-bold">Scarto degli Zeri</span>
            <p className="text-[11px] font-sans text-slate-400 mt-1">
              Se la variazione è nulla (V = 0), il pixel viene scartato poiché zero non ha una prima cifra significativa tra 1 e 9.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1.5">
            <span className="text-slate-500 text-[10px] uppercase">Passaggio 2</span>
            <span className="text-slate-200 font-bold">Notazione Scientifica</span>
            <p className="text-[11px] font-sans text-slate-400 mt-1">
              Il valore viene normalizzato: <span className="text-cyan-300">V = d.ddd × 10ⁿ</span>, dove <span className="text-cyan-300">d ∈ [1..9]</span> e <span className="text-cyan-300">n ∈ ℤ</span>.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-1.5">
            <span className="text-slate-500 text-[10px] uppercase">Passaggio 3</span>
            <span className="text-slate-200 font-bold">Conteggio e χ² / MAD</span>
            <p className="text-[11px] font-sans text-slate-400 mt-1">
              Si incrementa il contatore della cifra <span className="text-cyan-300">d</span>. A fine analisi si confronta l'istogramma con la curva teorica log₁₀(1 + 1/d).
            </p>
          </div>
        </div>
      </div>

      {/* Question 4: Why AI models break Benford's Law */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg">
        <div className="flex items-center gap-2.5 text-cyan-400">
          <Brain className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-100">
            4. Perché le Immagini AI (Midjourney, DALL-E, Stable Diffusion) Violano Benford?
          </h2>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-300 leading-relaxed">
          <p>
            Una fotocamera reale cattura i fotoni attraverso un obiettivo ottico in vetro e li converte in cariche elettriche tramite un sensore fisico CMOS/CCD. Questo processo introduce naturalmente il <strong>rumore di shot fotoelettronico (distribuzione di Poisson)</strong> e il <strong>rumore PRNU (Photo-Response Non-Uniformity)</strong>. Le superfici del mondo reale hanno inoltre rugosità frattali naturali.
          </p>
          <p>
            Al contrario, i modelli di intelligenza artificiale generativa:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>
              <strong>Operano nello spazio latente compresso:</strong> Le immagini sono generate decodificando vettori latenti tramite un decodificatore VAE neurale con convoluzioni e blocchi di attenzione.
            </li>
            <li>
              <strong>Assenza di sensore ottico reale:</strong> Manca il microscopico rumore termico e quantistico del silicio, sostituito da un'interpolazione continua che crea transizioni di gradiente "troppo perfette" o insolitamente lisce.
            </li>
            <li>
              <strong>Pattern spettrali periodici:</strong> L'upscaling convoluzionale lascia sottili artefatti a griglia ("checkerboard artifacts") che concentrano l'energia ad armoniche specifiche, alterando i coefficienti DCT.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
