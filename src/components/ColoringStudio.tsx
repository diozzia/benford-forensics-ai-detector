import React, { useState, useRef, useEffect } from 'react';
import { BookPage } from '../data/bookContent';
import { Palette, Undo, RefreshCw, Download, Sparkles, Check, Edit3 } from 'lucide-react';

interface ColoringStudioProps {
  initialPage?: BookPage;
  allPages: BookPage[];
  onUpdatePageGuide?: (pageId: number, newGuide: any) => void;
}

const PALETTE_COLORS = [
  { name: 'Giallo Sole', hex: '#FACC15' },
  { name: 'Arancione Carota', hex: '#FB923C' },
  { name: 'Rosso Fragola', hex: '#EF4444' },
  { name: 'Rosa Confetto', hex: '#F472B6' },
  { name: 'Viola Mirtillo', hex: '#A855F7' },
  { name: 'Blu Cielo', hex: '#38BDF8' },
  { name: 'Blu Notte', hex: '#3B82F6' },
  { name: 'Verde Prato', hex: '#4ADE80' },
  { name: 'Verde Bosco', hex: '#22C55E' },
  { name: 'Marrone Orsetto', hex: '#A16207' },
  { name: 'Grigio Nuvoletta', hex: '#94A3B8' },
  { name: 'Nero Inchiostro', hex: '#111827' },
  { name: 'Bianco Gomma', hex: '#FFFFFF' },
];

export const ColoringStudio: React.FC<ColoringStudioProps> = ({
  initialPage,
  allPages,
  onUpdatePageGuide,
}) => {
  const illustrationPages = allPages.filter((p) => p.type === 'illustration');
  const [selectedPage, setSelectedPage] = useState<BookPage>(
    initialPage && initialPage.type === 'illustration'
      ? initialPage
      : illustrationPages[0] || allPages[0]
  );

  const [activeColor, setActiveColor] = useState<string>('#FACC15');
  const [fillHistory, setFillHistory] = useState<Array<{ id: string; fill: string; previous: string }>>([]);
  const [isEditingGuide, setIsEditingGuide] = useState<boolean>(false);
  const [editedGuide, setEditedGuide] = useState(
    selectedPage.practicalGuide || {
      vocabolario: '',
      motricita: '',
      domandaAccessibile: '',
      consiglioGenitore: '',
    }
  );

  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Sync state when page changes and configure shapes for interactive coloring
  useEffect(() => {
    if (selectedPage.practicalGuide) {
      setEditedGuide(selectedPage.practicalGuide);
    }
    setFillHistory([]);

    if (svgContainerRef.current) {
      const svg = svgContainerRef.current.querySelector('svg');
      if (svg) {
        svg.style.pointerEvents = 'auto';
        const shapes = svg.querySelectorAll('path, polygon, circle, rect, ellipse');
        shapes.forEach((s) => {
          (s as SVGElement).style.pointerEvents = 'all';
          (s as SVGElement).style.cursor = 'pointer';
        });
      }
    }
  }, [selectedPage]);

  // Click-to-fill on SVG shapes
  const handleSvgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (
      target &&
      (target.tagName === 'path' ||
        target.tagName === 'polygon' ||
        target.tagName === 'circle' ||
        target.tagName === 'rect' ||
        target.tagName === 'ellipse')
    ) {
      const currentFill = target.getAttribute('fill') || 'none';
      target.setAttribute('fill', activeColor);

      setFillHistory((prev) => [
        ...prev,
        {
          id: target.id || Math.random().toString(),
          fill: activeColor,
          previous: currentFill,
        },
      ]);
    }
  };

  const handleResetColors = () => {
    if (svgContainerRef.current) {
      const elements = svgContainerRef.current.querySelectorAll('path, polygon, circle, rect, ellipse');
      elements.forEach((el) => {
        el.setAttribute('fill', '#ffffff');
      });
      setFillHistory([]);
    }
  };

  const handleSaveGuide = () => {
    if (onUpdatePageGuide) {
      onUpdatePageGuide(selectedPage.id, editedGuide);
    }
    setIsEditingGuide(false);
  };

  const handleDownloadSvg = () => {
    if (!svgContainerRef.current) return;
    const svgEl = svgContainerRef.current.querySelector('svg');
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kdp_disegno_${selectedPage.wordLabel || 'colorare'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-4">
      {/* Selector header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            Studio di Colorazione Digitale &amp; Personalizzazione Guida
          </h2>
          <p className="text-xs text-slate-500">
            Testa i disegni prima della stampa KDP o personalizza i consigli pratici per genitori.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-600 font-medium whitespace-nowrap">
            Scegli disegno:
          </label>
          <select
            value={selectedPage.id}
            onChange={(e) => {
              const found = allPages.find((p) => p.id === Number(e.target.value));
              if (found) setSelectedPage(found);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-amber-500"
          >
            {illustrationPages.map((p) => (
              <option key={p.id} value={p.id}>
                p.{p.pageNumber}: {p.wordLabel} — {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Coloring Canvas */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          {/* Palette bar */}
          <div className="w-full mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">Tavolozza Colori per Bambini (1-4 anni):</span>
              <span className="text-xs text-slate-500">
                Colore attivo: <span className="font-bold">{PALETTE_COLORS.find((c) => c.hex === activeColor)?.name || activeColor}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
              {PALETTE_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setActiveColor(c.hex)}
                  title={c.name}
                  aria-label={c.name}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform shadow-xs ${
                    activeColor === c.hex
                      ? 'scale-115 border-slate-900 ring-2 ring-amber-400'
                      : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* SVG Canvas Area */}
          <div className="w-full aspect-[8.5/11] max-w-[420px] bg-white border-2 border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div className="text-center pb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">p. {selectedPage.pageNumber}</span>
              <span className="text-2xl font-black text-slate-900 tracking-widest font-mono">
                {selectedPage.wordLabel}
              </span>
              <span className="text-xs font-semibold text-amber-600">Linee 8px</span>
            </div>

            {/* Interactive SVG */}
            <div
              ref={svgContainerRef}
              onClick={handleSvgClick}
              className="flex-1 flex items-center justify-center p-2 cursor-pointer hover:opacity-95"
              dangerouslySetInnerHTML={{ __html: selectedPage.svgData || '' }}
            />

            <div className="text-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              Clicca su qualsiasi area bianca per colorare con il pastello attivo!
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={handleResetColors}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sbianca Disegno
            </button>
            <button
              onClick={handleDownloadSvg}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Scarica SVG Vettoriale
            </button>
          </div>
        </div>

        {/* Right: Practical Guide & Educational Tips Editor */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Guida Pratica per Genitori (Inclusa nella Pagina)
                </h3>
              </div>
              <button
                onClick={() => setIsEditingGuide(!isEditingGuide)}
                className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditingGuide ? 'Annulla' : 'Modifica'}
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Questo testo viene stampato alla base della pagina per trasformare il libro in una vera guida accessibile per lo sviluppo infantile.
            </p>

            {isEditingGuide ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    🗣️ Vocabolario &amp; Suono:
                  </label>
                  <textarea
                    rows={2}
                    value={editedGuide.vocabolario}
                    onChange={(e) =>
                      setEditedGuide({ ...editedGuide, vocabolario: e.target.value })
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    🖐️ Motricità Fine &amp; Tratto:
                  </label>
                  <textarea
                    rows={2}
                    value={editedGuide.motricita}
                    onChange={(e) =>
                      setEditedGuide({ ...editedGuide, motricita: e.target.value })
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    💡 Domanda Accessibile:
                  </label>
                  <input
                    type="text"
                    value={editedGuide.domandaAccessibile}
                    onChange={(e) =>
                      setEditedGuide({ ...editedGuide, domandaAccessibile: e.target.value })
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    👨‍👩‍👧 Consiglio per Genitore/Educatore:
                  </label>
                  <textarea
                    rows={2}
                    value={editedGuide.consiglioGenitore}
                    onChange={(e) =>
                      setEditedGuide({ ...editedGuide, consiglioGenitore: e.target.value })
                    }
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  onClick={handleSaveGuide}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Salva Modifiche Guida
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    🗣️ Vocabolario &amp; Suono:
                  </span>
                  <p className="text-slate-600">{editedGuide.vocabolario}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    🖐️ Motricità Fine:
                  </span>
                  <p className="text-slate-600">{editedGuide.motricita}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    💡 Domanda Accessibile:
                  </span>
                  <p className="text-slate-600">{editedGuide.domandaAccessibile}</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-0.5">
                    👨‍👩‍👧 Consiglio per il Genitore:
                  </span>
                  <p className="text-amber-800">{editedGuide.consiglioGenitore}</p>
                </div>
              </div>
            )}
          </div>

          {/* KDP Best Practice Callout */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs text-slate-700">
            <h4 className="font-bold text-emerald-900 mb-1">
              ✨ Perché questa guida aumenta le vendite su Amazon:
            </h4>
            <p className="text-slate-600 leading-relaxed">
              I libri da colorare standard hanno solo disegni vuoti. Aggiungendo stimoli vocali, motori e domande guidate, il libro diventa un vero <b>manuale Montessori per la prima infanzia</b>. Questo ti permette di posizionarti su parole chiave ad alto intento d'acquisto e giustifica pienamente il prezzo di <b>7,99 €</b> con recensioni a 5 stelle entusiaste!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
