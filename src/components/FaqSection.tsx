/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      q: 'Cos\'è esattamente la Legge di Benford (First-Digit Law)?',
      a: 'La Legge di Benford stabilisce che in serie di dati naturali non casuali (lunghezze dei fiumi, popolazioni, bilanci aziendali, differenze di fotoni), il primo numero significativo non ha probabilità uniforme del 11.1% per ogni cifra da 1 a 9, ma segue P(d) = log10(1 + 1/d). La cifra 1 compare circa il 30.1% delle volte, la cifra 2 il 17.6%, fino al 9 con il 4.6%.',
    },
    {
      q: 'Come faccio a trasformare un pixel in un numero da 1 a 9?',
      a: 'Prendi una proprietà differenziale del pixel, ad esempio la magnitudo del gradiente |∇I| o il residuo laplaciano. Otterrai un valore reale continuo (es. 23.47 oppure 0.0481). Converti questo valore in notazione scientifica (es. 2.347 × 10¹ o 4.81 × 10⁻²): la prima cifra prima della virgola (2 nel primo caso, 4 nel secondo) è la prima cifra significativa. Gli zeri esatti (aree piatte) vengono scartati.',
    },
    {
      q: 'Perché i modelli AI generativi non rispettano Benford?',
      a: 'I modelli generativi come Stable Diffusion, Flux, Midjourney e DALL-E campionano rumore gaussiano standard in uno spazio latente compresso, e poi lo ricostruiscono tramite reti neurali (U-Net, DiT e decoder VAE). Non catturano fotoni fisici attraverso lenti ottiche e sensori di silicio, quindi mancano del rumore fisico Poisson-Gaussiano e delle statistiche naturali di gradiente multi-scala.',
    },
    {
      q: 'La Legge di Benford da sola garantisce al 100% che una foto sia reale o falsa?',
      a: 'Nell\'analisi forense delle immagini (Digital Image Forensics), la Legge di Benford è uno strumento probabilistico di primo livello estremamente potente, spesso combinato con la Error Level Analysis (ELA), l\'analisi dei metadati EXIF e il Photo-Response Non-Uniformity (PRNU). Una forte anomalia (MAD > 1.8%) indica con altissima confidenza una manomissione, compressione ripetuta o generazione sintetica.',
    },
    {
      q: 'Cosa succede se seleziono solo una parte dell\'immagine (strumento ROI)?',
      a: 'Lo strumento ROI (Region of Interest) è fondamentale per individuare il fotoritocco locale (splicing o inpainting). Ad esempio, se in una fotografia autentica viene incollato un oggetto generato da AI, l\'analisi dell\'intera immagine potrebbe attenuare l\'anomalia, ma isolando con il box ROI l\'oggetto incollato si noterà immediatamente l\'anomalia locale.',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>Domande Frequenti sull'Applicazione Forense di Benford</span>
        </h2>
        <p className="text-xs text-slate-400">
          Risposte pratiche e teoriche per comprendere l'uso forense della statistica applicata alle immagini digitali.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-2"
          >
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Q:</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed pl-5">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
