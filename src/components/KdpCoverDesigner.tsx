import React, { useState } from 'react';
import { calculateCoverDimensions } from '../utils/kdpCalculations';
import { Sparkles, Download, Layers, ShieldCheck, Info } from 'lucide-react';

interface KdpCoverDesignerProps {
  pageCount: number;
}

export const KdpCoverDesigner: React.FC<KdpCoverDesignerProps> = ({ pageCount }) => {
  const [selectedPaper, setSelectedPaper] = useState<'white' | 'cream'>('white');
  const [titleText, setTitleText] = useState('IL MIO GRANDE LIBRO DA COLORARE');
  const [subtitleText, setSubtitleText] = useState(
    '100+ Divertenti Disegni con Linee Spesse e Guide Pratiche per Bambini da 1 a 4 Anni'
  );
  const [authorText, setAuthorText] = useState('Edizioni Piccoli Esploratori');

  const [isGeneratingCoverPdf, setIsGeneratingCoverPdf] = useState(false);
  const [coverStatus, setCoverStatus] = useState<string | null>(null);

  const specs = calculateCoverDimensions(pageCount, 8.5, 11.0, selectedPaper);

  const handleDownloadCoverPdf = async () => {
    setIsGeneratingCoverPdf(true);
    setCoverStatus(null);
    try {
      const { generateKdpCoverPdf } = await import('../utils/pdfGenerator');
      await generateKdpCoverPdf(pageCount);
      setCoverStatus('PDF Copertina scaricato con successo!');
    } catch (err: any) {
      console.error(err);
      setCoverStatus('Errore nella generazione del PDF copertina.');
    } finally {
      setIsGeneratingCoverPdf(false);
    }
  };

  const handleDownloadCoverSvg = () => {
    const el = document.getElementById('kdp-full-cover-svg');
    if (!el) return;
    const svgData = new XMLSerializer().serializeToString(el);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kdp_copertina_completa_${pageCount}pagine.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Specifiche Ufficiali Amazon KDP
          </span>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Copertina Completa KDP Wraparound (Retro + Dorso + Fronte)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Progettata per replicare il successo del best-seller Amazon del tuo screenshot, con dorso esatto di <b>{specs.spineWidthMm} mm ({ (specs.spineWidthMm / 10).toFixed(2) } cm)</b> per {pageCount} pagine.
          </p>
          {coverStatus && (
            <p className="text-xs text-emerald-700 font-bold mt-1">{coverStatus}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadCoverPdf}
            disabled={isGeneratingCoverPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isGeneratingCoverPdf ? 'Generazione PDF...' : 'Scarica PDF Copertina (17.48" x 11.25")'}
          </button>

          <button
            onClick={handleDownloadCoverSvg}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Scarica SVG
          </button>
        </div>
      </div>

      {/* Dimensional Specs KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Spessore Dorso (Spine):</span>
          <span className="text-lg font-black text-amber-600 font-mono">
            {specs.spineWidthMm} mm
          </span>
          <span className="text-[10px] text-slate-500 block">≈ 0.58 cm (Screenshot!)</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Larghezza Totale Wrap:</span>
          <span className="text-lg font-black text-slate-900 font-mono">
            {specs.totalCoverWidthInches}"
          </span>
          <span className="text-[10px] text-slate-500 block">({specs.totalCoverWidthMm} mm)</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Altezza Totale (+Al Vivo):</span>
          <span className="text-lg font-black text-slate-900 font-mono">
            {specs.totalCoverHeightInches}"
          </span>
          <span className="text-[10px] text-slate-500 block">({specs.totalCoverHeightMm} mm)</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Margine Al Vivo (Bleed):</span>
          <span className="text-lg font-black text-emerald-600 font-mono">
            0.125" (3.2 mm)
          </span>
          <span className="text-[10px] text-slate-500 block">Tutti i 4 lati</span>
        </div>
      </div>

      {/* Live Interactive Wraparound Cover Preview */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-xl overflow-x-auto">
        <div className="text-center text-xs text-slate-400 mb-3 flex items-center justify-center gap-2">
          <span>← Retro Copertina</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[11px]">
            Dorso {specs.spineWidthMm} mm
          </span>
          <span>Fronte Copertina →</span>
        </div>

        {/* The Full Wraparound SVG (Retro + Dorso + Fronte) */}
        <div className="min-w-[800px] flex justify-center">
          <svg
            id="kdp-full-cover-svg"
            viewBox="0 0 1748 1125"
            className="w-full max-w-[1000px] h-auto shadow-2xl rounded-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Canvas: Cheerful Bestseller Yellow */}
            <rect x="0" y="0" width="1748" height="1125" fill="#FEF08A" />

            {/* Bleed Safety Zone Outline (0.125" = ~12.5px scale) */}
            <rect
              x="12"
              y="12"
              width="1724"
              height="1101"
              fill="none"
              stroke="#F59E0B"
              strokeDasharray="8 6"
              strokeWidth="2"
            />

            {/* ======================================================== */}
            {/* RETRO COPERTINA (BACK COVER - X: 12 to 850) */}
            {/* Versione precedente con codice a barre eliminato del tutto */}
            {/* e scritta editore alzata di 1,5 cm verso l'alto           */}
            {/* ======================================================== */}
            <g transform="translate(40, 40)">
              {/* Back Card Container */}
              <rect
                x="30"
                y="30"
                width="740"
                height="985"
                rx="24"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="6"
              />

              {/* Back Header Banner */}
              <rect x="30" y="30" width="740" height="110" rx="24" fill="#3B82F6" />
              <text
                x="400"
                y="100"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="system-ui, sans-serif"
                fontSize="38"
                fontWeight="900"
              >
                IL LIBRO PREFERITO DEI PICCOLI!
              </text>

              {/* Subheading */}
              <text
                x="70"
                y="200"
                fill="#1E293B"
                fontFamily="system-ui, sans-serif"
                fontSize="24"
                fontWeight="800"
              >
                100 Disegni Facili &amp; Divertenti con Linee Spesse
              </text>

              {/* Bullet Points */}
              <g transform="translate(70, 240)">
                <circle cx="15" cy="15" r="8" fill="#10B981" />
                <text x="35" y="22" fill="#334155" fontSize="20" fontWeight="700">
                  Linee extra spesse (8mm) per colorare senza frustrazione
                </text>

                <circle cx="15" cy="65" r="8" fill="#10B981" />
                <text x="35" y="72" fill="#334155" fontSize="20" fontWeight="700">
                  Guide pratiche accessibili per genitori ed educatori
                </text>

                <circle cx="15" cy="115" r="8" fill="#10B981" />
                <text x="35" y="122" fill="#334155" fontSize="20" fontWeight="700">
                  Animali felici, veicoli, natura e oggetti della vita quotidiana
                </text>

                <circle cx="15" cy="165" r="8" fill="#10B981" />
                <text x="35" y="172" fill="#334155" fontSize="20" fontWeight="700">
                  Pagine singole protette: mai più colori che passano sul retro!
                </text>

                <circle cx="15" cy="215" r="8" fill="#10B981" />
                <text x="35" y="222" fill="#334155" fontSize="20" fontWeight="700">
                  Super Attestato del Piccolo Artista incluso al termine
                </text>
              </g>

              {/* 4 Preview Circles */}
              <g transform="translate(60, 520)">
                <text x="340" y="0" textAnchor="middle" fill="#64748B" fontSize="18" fontWeight="bold">
                  ANTEPRIMA DEI DISEGNI ALL'INTERNO:
                </text>

                {/* Circle 1: Sole */}
                <circle cx="70" cy="70" r="55" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="4" />
                <text x="70" y="80" textAnchor="middle" fontSize="42">☀️</text>

                {/* Circle 2: Gelato */}
                <circle cx="230" cy="70" r="55" fill="#FCE7F3" stroke="#E2E8F0" strokeWidth="4" />
                <text x="230" y="80" textAnchor="middle" fontSize="42">🍦</text>

                {/* Circle 3: Treno */}
                <circle cx="390" cy="70" r="55" fill="#DCFCE7" stroke="#E2E8F0" strokeWidth="4" />
                <text x="390" y="80" textAnchor="middle" fontSize="42">🚂</text>

                {/* Circle 4: Razzo */}
                <circle cx="550" cy="70" r="55" fill="#E0E7FF" stroke="#E2E8F0" strokeWidth="4" />
                <text x="550" y="80" textAnchor="middle" fontSize="42">🚀</text>
              </g>

              {/* Age Target & Format Badge (Left Side) */}
              <rect x="70" y="690" width="300" height="90" rx="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
              <text x="220" y="730" textAnchor="middle" fill="#92400E" fontSize="20" fontWeight="900">
                ETÀ: 1 - 4 ANNI
              </text>
              <text x="220" y="760" textAnchor="middle" fill="#B45309" fontSize="16" fontWeight="bold">
                FORMATO GRANDE 21.6 x 27.9 cm
              </text>

              {/* BARCODE BOX COMPLETAMENTE ELIMINATO: Spazio bianco pulito per Amazon KDP */}

              {/* Publisher Mark - Alzato di 1,5 cm (~60px) da y=940 a y=875 */}
              <text x="400" y="875" textAnchor="middle" fill="#94A3B8" fontSize="16" fontWeight="bold">
                {authorText} · Pubblicato con Amazon KDP
              </text>
            </g>

            {/* ======================================================== */}
            {/* DORSO (SPINE - Exactly centered, width = 5.8mm scaled) */}
            {/* ======================================================== */}
            <g transform="translate(860, 0)">
              <rect x="0" y="0" width="28" height="1125" fill="#EAB308" />
              {/* Spine Text: Rotated 90 degrees as required by KDP */}
              <g transform="translate(19, 560) rotate(90)">
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#78350F"
                  fontSize="15"
                  fontWeight="900"
                  letterSpacing="2"
                  fontFamily="system-ui, sans-serif"
                >
                  IL MIO GRANDE LIBRO DA COLORARE (1-4 ANNI) — Edizioni Piccoli Esploratori
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* FRONTE COPERTINA (FRONT COVER - Inspired by Amazon Bestseller) */}
            {/* ======================================================== */}
            <g transform="translate(900, 40)">
              {/* Outer decorative frame */}
              <rect
                x="30"
                y="30"
                width="780"
                height="985"
                rx="36"
                fill="#FEF9C3"
                stroke="#3B82F6"
                strokeWidth="12"
              />

              {/* =================================================== */}
              {/* CHARACTERS / MOTIFS AROUND THE FRONT COVER          */}
              {/* Positioned cleanly on perimeter without overlapping */}
              {/* =================================================== */}

              {/* 1. Rocket (Top Left) */}
              <g transform="translate(90, 65) scale(0.40)">
                <path d="M200 40 Q250 120 250 250 L150 250 Q150 120 200 40 Z" fill="#38BDF8" stroke="#000" strokeWidth="12" />
                <circle cx="200" cy="160" r="30" fill="#FEF08A" stroke="#000" strokeWidth="10" />
                <path d="M150 210 L85 275 L150 265 Z" fill="#F43F5E" stroke="#000" strokeWidth="10" />
                <path d="M250 210 L315 275 L250 265 Z" fill="#F43F5E" stroke="#000" strokeWidth="10" />
                <path d="M165 250 Q200 350 235 250 Z" fill="#F97316" stroke="#000" strokeWidth="8" />
              </g>

              {/* 2. Mushroom (Top Center) */}
              <g transform="translate(345, 65) scale(0.42)">
                <path d="M150 210 C140 320 130 350 200 350 C270 350 260 320 250 210" fill="#F1F5F9" stroke="#000" strokeWidth="12" />
                <path d="M60 210 C60 110 110 50 200 50 C290 50 340 110 340 210 Z" fill="#EF4444" stroke="#000" strokeWidth="12" />
                <circle cx="130" cy="140" r="26" fill="#FFF" />
                <circle cx="200" cy="105" r="30" fill="#FFF" />
                <circle cx="270" cy="145" r="24" fill="#FFF" />
              </g>

              {/* 3. Sun (Top Right) */}
              <g transform="translate(605, 65) scale(0.40)">
                <circle cx="200" cy="200" r="85" fill="#FDE047" stroke="#000" strokeWidth="12" />
                <ellipse cx="170" cy="185" rx="10" ry="14" fill="#000" />
                <ellipse cx="230" cy="185" rx="10" ry="14" fill="#000" />
                <path d="M170 215 Q200 250 230 215" stroke="#000" strokeWidth="10" fill="none" />
                <line x1="200" y1="40" x2="200" y2="85" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" />
                <line x1="40" y1="200" x2="85" y2="200" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" />
                <line x1="315" y1="200" x2="360" y2="200" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" />
              </g>

              {/* 4. Ice Cream Cone (Middle Left - Cleared away from title plaque) */}
              <g transform="translate(48, 345) scale(0.33)">
                <circle cx="200" cy="65" r="22" fill="#EF4444" stroke="#000" strokeWidth="8" />
                <path d="M140 180 C110 160 110 110 150 95 C170 70 230 70 250 95 C290 110 290 160 260 180 Z" fill="#F472B6" stroke="#000" strokeWidth="12" />
                <polygon points="135,185 265,185 200,375" fill="#FBBF24" stroke="#000" strokeWidth="12" />
              </g>

              {/* 5. Smiling Daisy Flower (Middle Right - Cleared away from title plaque) */}
              <g transform="translate(695, 345) scale(0.33)">
                <circle cx="200" cy="95" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="265" cy="130" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="265" cy="205" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="200" cy="240" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="135" cy="205" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="135" cy="130" r="38" fill="#F472B6" stroke="#000" strokeWidth="8" />
                <circle cx="200" cy="165" r="50" fill="#FDE047" stroke="#000" strokeWidth="10" />
                <ellipse cx="185" cy="155" rx="5" ry="8" fill="#000" />
                <ellipse cx="215" cy="155" rx="5" ry="8" fill="#000" />
                <path d="M185 175 Q200 190 215 175" stroke="#000" strokeWidth="6" fill="none" strokeLinecap="round" />
              </g>

              {/* 6. Train with wheels (Bottom Left) */}
              <g transform="translate(55, 680) scale(0.42)">
                <rect x="170" y="140" width="150" height="130" fill="#EF4444" stroke="#000" strokeWidth="12" rx="10" />
                <rect x="70" y="200" width="100" height="70" fill="#22C55E" stroke="#000" strokeWidth="12" rx="10" />
                <rect x="220" y="165" width="70" height="60" rx="10" fill="#BAE6FD" stroke="#000" strokeWidth="8" />
                <circle cx="120" cy="300" r="42" fill="#3B82F6" stroke="#000" strokeWidth="12" />
                <circle cx="210" cy="300" r="42" fill="#3B82F6" stroke="#000" strokeWidth="12" />
                <circle cx="295" cy="300" r="42" fill="#3B82F6" stroke="#000" strokeWidth="12" />
              </g>

              {/* 7. Cute Chick / Duckling (Bottom Center) */}
              <g transform="translate(340, 680) scale(0.44)">
                <ellipse cx="200" cy="220" rx="90" ry="100" fill="#FDE047" stroke="#000" strokeWidth="12" />
                <circle cx="200" cy="130" r="65" fill="#FDE047" stroke="#000" strokeWidth="12" />
                <circle cx="175" cy="125" r="14" fill="#000" />
                <circle cx="225" cy="125" r="14" fill="#000" />
                <polygon points="180,145 220,145 200,175" fill="#F97316" stroke="#000" strokeWidth="8" />
                <path d="M170 320 L170 360" stroke="#F97316" strokeWidth="14" strokeLinecap="round" />
                <path d="M230 320 L230 360" stroke="#F97316" strokeWidth="14" strokeLinecap="round" />
              </g>

              {/* 8. Palm Tree (Bottom Right) */}
              <g transform="translate(635, 680) scale(0.44)">
                <path d="M200 160 Q210 260 215 360" stroke="#92400E" strokeWidth="32" strokeLinecap="round" />
                <path d="M200 160 Q130 110 80 160" stroke="#16A34A" strokeWidth="24" strokeLinecap="round" fill="none" />
                <path d="M200 160 Q270 110 320 160" stroke="#16A34A" strokeWidth="24" strokeLinecap="round" fill="none" />
                <path d="M200 160 Q200 70 210 60" stroke="#16A34A" strokeWidth="24" strokeLinecap="round" fill="none" />
                <circle cx="190" cy="165" r="14" fill="#78350F" />
                <circle cx="215" cy="165" r="14" fill="#78350F" />
              </g>

              {/* =================================================== */}
              {/* INNER WHITE CLOUD / CENTER TITLE PLAQUE            */}
              {/* Rendered on top of canvas and side motifs           */}
              {/* =================================================== */}
              <rect
                x="145"
                y="270"
                width="550"
                height="315"
                rx="36"
                fill="#FFFFFF"
                stroke="#EAB308"
                strokeWidth="8"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.12))' }}
              />

              {/* FRONT TITLE: Bold Clean Bubble-Style Letters */}
              <text
                x="420"
                y="338"
                textAnchor="middle"
                fill="#16A34A"
                fontFamily="system-ui, sans-serif"
                fontSize="35"
                fontWeight="900"
                letterSpacing="1"
              >
                Il Mio Grande
              </text>

              <text
                x="420"
                y="402"
                textAnchor="middle"
                fill="#EF4444"
                fontFamily="system-ui, sans-serif"
                fontSize="38"
                fontWeight="900"
                letterSpacing="0.5"
              >
                LIBRO DA COLORARE
              </text>

              <text
                x="420"
                y="458"
                textAnchor="middle"
                fill="#2563EB"
                fontFamily="system-ui, sans-serif"
                fontSize="34"
                fontWeight="900"
              >
                per Bambini
              </text>

              <text
                x="420"
                y="508"
                textAnchor="middle"
                fill="#D97706"
                fontFamily="system-ui, sans-serif"
                fontSize="18"
                fontWeight="800"
              >
                100+ Disegni con Linee Spesse
              </text>

              <text
                x="420"
                y="542"
                textAnchor="middle"
                fill="#059669"
                fontFamily="system-ui, sans-serif"
                fontSize="14"
                fontWeight="700"
              >
                Guide Pratiche per Genitori · Pagine Protette
              </text>

              {/* =================================================== */}
              {/* AGE BANNER PILL: WIDE 480px - NO OVERFLOW           */}
              {/* =================================================== */}
              <g transform="translate(180, 605)">
                <rect
                  x="0"
                  y="0"
                  width="480"
                  height="58"
                  rx="29"
                  fill="#F97316"
                  stroke="#C2410C"
                  strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 4px 10px rgba(249, 115, 22, 0.35))' }}
                />
                <text
                  x="240"
                  y="37"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="system-ui, sans-serif"
                  fontSize="22"
                  fontWeight="900"
                  letterSpacing="1.2"
                >
                  PER BAMBINI DA 1 A 4 ANNI
                </text>
              </g>

              {/* Bottom Tagline */}
              <text
                x="420"
                y="965"
                textAnchor="middle"
                fill="#475569"
                fontFamily="system-ui, sans-serif"
                fontSize="18"
                fontWeight="bold"
              >
                Linee Spesse · Immagini Felici · Sviluppo Motorio e Fonetico
              </text>

              {/* Author / Publisher Brand */}
              <text
                x="420"
                y="995"
                textAnchor="middle"
                fill="#64748B"
                fontFamily="system-ui, sans-serif"
                fontSize="15"
                fontWeight="bold"
              >
                {authorText} · Edizione Ufficiale KDP
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Editor Controls for Cover text & paper type */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Tipo di Carta Interna KDP:
          </label>
          <select
            value={selectedPaper}
            onChange={(e) => setSelectedPaper(e.target.value as any)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="white">Carta Bianca Standard KDP (Spessore 0.0572 mm/pag)</option>
            <option value="cream">Carta Crema KDP (Spessore 0.0635 mm/pag)</option>
          </select>
          <span className="text-[10px] text-slate-500 block mt-1">
            Per i libri per bambini si consiglia sempre la <b>carta bianca standard</b>.
          </span>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Nome Autore / Marchio Editoriale:
          </label>
          <input
            type="text"
            value={authorText}
            onChange={(e) => setAuthorText(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Sottotitolo sulla Copertina:
          </label>
          <input
            type="text"
            value={subtitleText}
            onChange={(e) => setSubtitleText(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>
    </div>
  );
};
