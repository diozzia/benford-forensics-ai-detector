import { jsPDF } from 'jspdf';
import { BookPage, BookMetadata, BOOK_METADATA } from '../data/bookContent';
import { calculateCoverDimensions } from './kdpCalculations';

export interface PdfGenerationProgress {
  current: number;
  total: number;
  percentage: number;
  status: string;
}

export interface GeneratedPdfResult {
  doc: jsPDF;
  blob: Blob;
  blobUrl: string;
  filename: string;
  pageCount: number;
  byteSize: number;
}

/**
 * Converts an SVG string to a high-resolution PNG data URL via HTML Canvas.
 * Optimized with URI encoding (no cross-origin blob tainting) and fast rendering.
 */
export function svgToPngDataUrl(
  svgString: string,
  width: number = 800,
  height: number = 800
): Promise<string> {
  return new Promise((resolve) => {
    try {
      let cleanSvg = svgString.trim();
      if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!cleanSvg.includes('width=')) {
        cleanSvg = cleanSvg.replace('<svg', `<svg width="${width}" height="${height}" `);
      }

      // Safe data URI avoiding any iframe cross-origin restrictions
      const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cleanSvg);
      const img = new Image();

      // 2-second timeout guard
      const timer = setTimeout(() => {
        resolve('');
      }, 2000);

      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve('');
            return;
          }

          // Clean white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const pngDataUrl = canvas.toDataURL('image/png', 0.9);
          resolve(pngDataUrl);
        } catch {
          resolve('');
        }
      };

      img.onerror = () => {
        clearTimeout(timer);
        resolve('');
      };

      img.src = dataUri;
    } catch {
      resolve('');
    }
  });
}

/**
 * Builds the PDF document instance and exports a Blob and Object URL
 */
export async function createKdpBookPdfDoc(
  pages: BookPage[],
  metadata: BookMetadata = BOOK_METADATA,
  onProgress?: (progress: PdfGenerationProgress) => void,
  customFilename?: string
): Promise<GeneratedPdfResult> {
  const total = pages.length;
  const filename = customFilename || (
    total === 102
      ? 'Il_Mio_Grande_Libro_da_Colorare_102_Pagine_KDP.pdf'
      : `Il_Mio_Grande_Libro_da_Colorare_${total}_Pagine_KDP.pdf`
  );

  // Initialize jsPDF with standard Amazon KDP US Letter format (8.5 x 11 inches)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [8.5, 11],
    compress: true,
  });

  for (let i = 0; i < total; i++) {
    const p = pages[i];
    const pageNum = p.pageNumber || i + 1;

    // Report progress
    if (onProgress) {
      onProgress({
        current: i + 1,
        total,
        percentage: Math.round(((i + 1) / total) * 100),
        status: `Elaborazione pagina ${i + 1} di ${total} (${p.title || p.wordLabel || 'Pagina'})...`,
      });
    }

    // Add page for subsequent pages
    if (i > 0) {
      doc.addPage([8.5, 11], 'portrait');
    }

    // Render Page Content based on type
    switch (p.type) {
      case 'half-title':
        renderHalfTitle(doc, p, metadata);
        break;

      case 'title':
        renderCopyright(doc, p, metadata);
        break;

      case 'belongs-to':
        renderBelongsTo(doc, p);
        break;

      case 'guide-intro':
        renderGuideIntro(doc, p);
        break;

      case 'blank-back':
        renderBlankBack(doc, p);
        break;

      case 'certificate':
        renderCertificate(doc, p);
        break;

      case 'author-note':
        renderAuthorOutro(doc, p);
        break;

      case 'illustration':
      default:
        await renderIllustration(doc, p);
        break;
    }

    // Bottom Page Number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(140, 140, 140);
    doc.text(`— ${pageNum} —`, 4.25, 10.5, { align: 'center' });

    // Allow UI thread tick
    await new Promise((r) => setTimeout(r, 8));
  }

  // Create real Blob
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  if (onProgress) {
    onProgress({
      current: total,
      total,
      percentage: 100,
      status: 'File PDF compilato con successo!',
    });
  }

  return {
    doc,
    blob,
    blobUrl,
    filename,
    pageCount: total,
    byteSize: blob.size,
  };
}

/**
 * Generates and downloads the complete Amazon KDP Paperback PDF (8.5" x 11", 102 pages)
 */
export async function generateKdpBookPdf(
  pages: BookPage[],
  metadata: BookMetadata = BOOK_METADATA,
  onProgress?: (progress: PdfGenerationProgress) => void,
  customFilename?: string
): Promise<GeneratedPdfResult> {
  const result = await createKdpBookPdfDoc(pages, metadata, onProgress, customFilename);

  // Attempt automatic download
  try {
    result.doc.save(result.filename);
  } catch (err) {
    console.warn('Programmatic download was prevented by iframe security. Blob URL is ready for user click:', err);
  }

  return result;
}

/**
 * Generates and downloads the full KDP Wraparound Cover as a 300 DPI PDF
 * Format: Width = 17.48 in, Height = 11.25 in (including 0.58 cm spine and 0.125 in bleed)
 */
export async function generateKdpCoverPdf(
  pageCount: number = 102,
  onProgress?: (progress: PdfGenerationProgress) => void
): Promise<GeneratedPdfResult> {
  const specs = calculateCoverDimensions(pageCount, 8.5, 11.0, 'white');
  const filename = `Copertina_KDP_Wraparound_${pageCount}pagine_Dorso_0.58cm.pdf`;

  if (onProgress) {
    onProgress({
      current: 1,
      total: 1,
      percentage: 30,
      status: 'Rendering copertina completa wraparound (17.48" x 11.25")...',
    });
  }

  // Get SVG element from DOM or generate standalone SVG string
  const svgElement = document.getElementById('kdp-full-cover-svg');
  let svgData = '';
  if (svgElement) {
    svgData = new XMLSerializer().serializeToString(svgElement);
  } else {
    svgData = buildStandaloneCoverSvg(pageCount);
  }

  const pngDataUrl = await svgToPngDataUrl(svgData, 2800, 1800);

  if (onProgress) {
    onProgress({
      current: 1,
      total: 1,
      percentage: 80,
      status: 'Composizione PDF copertina KDP...',
    });
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [specs.totalCoverWidthInches, specs.totalCoverHeightInches],
    compress: true,
  });

  if (pngDataUrl) {
    doc.addImage(
      pngDataUrl,
      'PNG',
      0,
      0,
      specs.totalCoverWidthInches,
      specs.totalCoverHeightInches
    );
  } else {
    // Vector fallback
    doc.setFillColor(254, 249, 195);
    doc.rect(0, 0, specs.totalCoverWidthInches, specs.totalCoverHeightInches, 'F');
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  try {
    doc.save(filename);
  } catch (err) {
    console.warn('Programmatic download of cover failed:', err);
  }

  if (onProgress) {
    onProgress({
      current: 1,
      total: 1,
      percentage: 100,
      status: 'Copertina PDF pronta per il salvataggio!',
    });
  }

  return {
    doc,
    blob,
    blobUrl,
    filename,
    pageCount: 1,
    byteSize: blob.size,
  };
}

/**
 * Generates and downloads a single page as PDF for test prints
 */
export async function generateSinglePagePdf(page: BookPage): Promise<GeneratedPdfResult> {
  const filename = `Pagina_${page.pageNumber}_${page.wordLabel || 'disegno'}.pdf`;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [8.5, 11],
  });

  if (page.type === 'illustration') {
    await renderIllustration(doc, page);
  } else {
    renderHalfTitle(doc, page, BOOK_METADATA);
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(140, 140, 140);
  doc.text(`— ${page.pageNumber} —`, 4.25, 10.5, { align: 'center' });

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  try {
    doc.save(filename);
  } catch (e) {
    console.warn('doc.save single page error:', e);
  }

  return {
    doc,
    blob,
    blobUrl,
    filename,
    pageCount: 1,
    byteSize: blob.size,
  };
}

// -------------------------------------------------------------
// Page Renderers
// -------------------------------------------------------------

function renderHalfTitle(doc: jsPDF, p: BookPage, meta: BookMetadata) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(160, 160, 160);
  doc.text('FRONTESPIZIO INTERNO KDP', 4.25, 2.5, { align: 'center' });

  doc.setFontSize(26);
  doc.setTextColor(30, 41, 59);
  const titleLines = doc.splitTextToSize(meta.title, 6.5);
  doc.text(titleLines, 4.25, 3.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105);
  const subLines = doc.splitTextToSize(p.subtitle || meta.subtitle, 5.5);
  doc.text(subLines, 4.25, 5.2, { align: 'center' });

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.04);
  doc.line(3.5, 6.2, 5.0, 6.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text(meta.author, 4.25, 7.0, { align: 'center' });
}

function renderCopyright(doc: jsPDF, p: BookPage, meta: BookMetadata) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('INFORMAZIONI DI PUBBLICAZIONE & COPYRIGHT', 1.0, 1.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const lines = [
    `Titolo: ${meta.title}`,
    `Collana: ${meta.series}`,
    `Formato Amazon KDP: Copertina Flessibile, 21.59 x 27.94 cm (8.5 x 11 pollici)`,
    `Pagine totali: ${meta.pageCount}`,
    `ISBN-13: ${meta.isbnPlaceholder}`,
    '',
    'Copyright © 2026 Piccoli Esploratori Studio. Tutti i diritti riservati.',
    'Nessuna parte di questo libro puo essere riprodotta senza autorizzazione.',
    '',
    'Specifiche di stampa Amazon KDP Print on Demand:',
    '- Carta bianca standard 55 libbre (90 g/m2)',
    '- Layout a pagina singola anti-sbavatura per pennarelli',
    '- Conforme agli standard di sicurezza visiva per la prima infanzia',
  ];

  let y = 2.4;
  lines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 6.5);
    doc.text(wrapped, 1.0, y);
    y += wrapped.length * 0.22;
  });
}

function renderBelongsTo(doc: jsPDF, p: BookPage) {
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.06);
  doc.roundedRect(0.8, 0.8, 6.9, 9.2, 0.3, 0.3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(180, 83, 9);
  doc.text('IL TUO LIBRO SPECIALE', 4.25, 1.8, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59);
  doc.text('Questo Libro Appartiene a:', 4.25, 2.6, { align: 'center' });

  // Name line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.04);
  doc.line(1.8, 3.8, 6.7, 3.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('IL MIO NOME:', 1.8, 3.5);

  // Age and Favorite Color
  doc.line(1.8, 4.8, 3.8, 4.8);
  doc.text('HO ANNI:', 1.8, 4.5);

  doc.line(4.5, 4.8, 6.7, 4.8);
  doc.text('COLORE PREFERITO:', 4.5, 4.5);

  // Handprint box
  doc.setDrawColor(245, 158, 11);
  doc.setLineDashPattern([0.1, 0.1], 0);
  doc.roundedRect(1.5, 5.6, 5.5, 3.5, 0.2, 0.2);
  doc.setLineDashPattern([], 0);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'Disegna il contorno della tua manina qui dentro con il tuo pastello preferito!',
    4.25,
    7.3,
    { align: 'center', maxWidth: 4.5 }
  );
}

function renderGuideIntro(doc: jsPDF, p: BookPage) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129);
  doc.text('GUIDA PRATICA & ACCESSIBILE PER GENITORI ED EDUCATORI', 1.0, 1.4);

  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59);
  doc.text('Come usare questo libro con bambini da 1 a 4 anni', 1.0, 2.0);

  const tips = [
    {
      title: '1. Le Linee Extra Spesse (5-8 mm)',
      desc: 'A 1-3 anni la visione e la coordinazione non permettono precisione millimetrica. Il contorno spesso e scuro offre un confine visivo netto e rassicurante.',
    },
    {
      title: '2. Stimolazione Fonetica & Onomatopee',
      desc: 'Ogni pagina suggerisce il verso o il suono dell\'oggetto ("Ciuf ciuf", "Brum brum"). Ripetilo con gioia: attiva le aree del linguaggio.',
    },
    {
      title: '3. Nessuna Pressione sul Risultato',
      desc: 'Il primo stadio naturale e lo scarabocchio energico. Valorizza la scelta del colore e l\'intenzione del bambino senza imporre di "stare nei bordi".',
    },
    {
      title: '4. Pastelli Consigliati',
      desc: 'Usa pastelli a cera a fusto triangolare o pennarelli lavabili con punta grossa e bloccata, ideali per la presa palmare dei piu piccoli.',
    },
  ];

  let y = 2.6;
  tips.forEach((t) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.02);
    doc.roundedRect(1.0, y, 6.5, 1.25, 0.1, 0.1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(t.title, 1.2, y + 0.35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(t.desc, 6.1);
    doc.text(descLines, 1.2, y + 0.65);

    y += 1.45;
  });
}

function renderBlankBack(doc: jsPDF, p: BookPage) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(160, 160, 160);
  doc.text('Pagina Protettiva Anti-Sbavatura', 4.25, 5.0, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.text(
    'Questo retro pagina e lasciato libero per evitare che i pennarelli passino sul disegno successivo.',
    4.25,
    5.4,
    { align: 'center', maxWidth: 4.5 }
  );

  doc.text('Usa questo spazio per scarabocchiare liberamente!', 4.25, 5.8, {
    align: 'center',
  });
}

function renderCertificate(doc: jsPDF, p: BookPage) {
  // Double certificate frame
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.08);
  doc.roundedRect(0.8, 0.8, 6.9, 9.2, 0.3, 0.3);
  doc.setLineWidth(0.03);
  doc.roundedRect(0.95, 0.95, 6.6, 8.9, 0.2, 0.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(180, 83, 9);
  doc.text('TRAGUARDO RAGGIUNTO', 4.25, 1.8, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59);
  doc.text('SUPER ATTESTATO DEL PICCOLO ARTISTA', 4.25, 2.7, {
    align: 'center',
    maxWidth: 6.0,
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('Si certifica con grande gioia che:', 4.25, 3.8, { align: 'center' });

  // Name line
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.05);
  doc.line(2.0, 4.8, 6.5, 4.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'ha colorato con fantasia, curiosita e allegria le sue prime 100 grandi scoperte a colori!',
    4.25,
    5.6,
    { align: 'center', maxWidth: 5.5 }
  );

  // Signatures
  doc.line(1.5, 7.8, 3.3, 7.8);
  doc.text('Data', 2.4, 8.1, { align: 'center' });

  doc.line(5.2, 7.8, 7.0, 7.8);
  doc.text('Firma Genitore', 6.1, 8.1, { align: 'center' });
}

function renderAuthorOutro(doc: jsPDF, p: BookPage) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text("Un Messaggio Speciale dall'Autore", 1.0, 2.0);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const msg =
    'Cara mamma, caro papa o educatore, grazie di cuore per aver scelto questo libro! Creare questo progetto accessibile e stato un atto di amore per le prime fasi dell\'infanzia.';
  doc.text(doc.splitTextToSize(msg, 6.5), 1.0, 2.6);

  // Amazon review box
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.02);
  doc.roundedRect(1.0, 3.8, 6.5, 1.8, 0.15, 0.15, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(146, 64, 14);
  doc.text('Il tuo aiuto vale tantissimo su Amazon!', 1.3, 4.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  const reviewText =
    'Le recensioni dei genitori sono fondamentali per far conoscere questo progetto indipendente. Se il libro ti e piaciuto, lascia una recensione a 5 stelle con una foto delle creazioni del tuo bimbo!';
  doc.text(doc.splitTextToSize(reviewText, 5.9), 1.3, 4.6);

  doc.setFont('helvetica', 'bold');
  doc.text('amazon.it/review/create-review', 1.3, 5.3);
}

async function renderIllustration(doc: jsPDF, p: BookPage) {
  // Category top left
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text((p.category || 'ILLUSTRAZIONE').toUpperCase(), 1.0, 0.9);

  // Word Label centered
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(15, 23, 42);
  doc.text(p.wordLabel || 'DISEGNO', 4.25, 1.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text('COLORA O TRACCIA LE LETTERE', 4.25, 1.75, { align: 'center' });

  // Main Illustration Canvas
  if (p.svgData) {
    try {
      const pngData = await svgToPngDataUrl(p.svgData, 800, 800);
      if (pngData) {
        doc.addImage(pngData, 'PNG', 1.45, 2.0, 5.6, 5.6);
      } else {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.02);
        doc.rect(1.45, 2.0, 5.6, 5.6);
      }
    } catch {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.02);
      doc.rect(1.45, 2.0, 5.6, 5.6);
    }
  }

  // Practical Guide Box at bottom
  if (p.practicalGuide) {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.02);
    doc.roundedRect(0.85, 8.0, 6.8, 2.1, 0.12, 0.12, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14);
    doc.text('GUIDA PRATICA ACCESSIBILE PER IL GENITORE', 1.05, 8.3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);

    const vocab = `Vocabolario: ${p.practicalGuide.vocabolario}`;
    const motricita = `Motricita: ${p.practicalGuide.motricita}`;
    const stimolo = `Domanda & Stimolo: ${p.practicalGuide.domandaAccessibile}`;

    doc.text(doc.splitTextToSize(vocab, 6.4), 1.05, 8.65);
    doc.text(doc.splitTextToSize(motricita, 6.4), 1.05, 9.15);
    doc.text(doc.splitTextToSize(stimolo, 6.4), 1.05, 9.65);
  }
}

/**
 * Standalone Cover SVG generator if Cover DOM element is not mounted
 */
function buildStandaloneCoverSvg(pageCount: number): string {
  const specs = calculateCoverDimensions(pageCount, 8.5, 11.0, 'white');
  const spinePx = Math.round((specs.spineWidthInches / specs.totalCoverWidthInches) * 1748);

  return `<svg id="kdp-full-cover-svg" viewBox="0 0 1748 1125" width="2800" height="1800" xmlns="http://www.w3.org/2000/svg">
    <!-- Background Canvas -->
    <rect width="1748" height="1125" fill="#FEF08A" />
    
    <!-- Bleed Safety Zone Outline -->
    <rect x="12" y="12" width="1724" height="1101" fill="none" stroke="#F59E0B" stroke-dasharray="8 6" stroke-width="2" />

    <!-- Retro (Back Cover) -->
    <g transform="translate(40, 40)">
      <rect x="30" y="30" width="740" height="985" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="6" />
      <rect x="30" y="30" width="740" height="110" rx="24" fill="#3B82F6" />
      <text x="400" y="100" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="38" font-weight="900">IL LIBRO PREFERITO DEI PICCOLI!</text>
      <text x="70" y="200" fill="#1E293B" font-family="sans-serif" font-size="24" font-weight="800">100 Disegni Facili &amp; Divertenti con Linee Spesse</text>

      <!-- Bullet Points -->
      <g transform="translate(70, 240)">
        <circle cx="15" cy="15" r="8" fill="#10B981" />
        <text x="35" y="22" fill="#334155" font-size="20" font-weight="700">Linee extra spesse (8mm) per colorare senza frustrazione</text>

        <circle cx="15" cy="65" r="8" fill="#10B981" />
        <text x="35" y="72" fill="#334155" font-size="20" font-weight="700">Guide pratiche accessibili per genitori ed educatori</text>

        <circle cx="15" cy="115" r="8" fill="#10B981" />
        <text x="35" y="122" fill="#334155" font-size="20" font-weight="700">Animali felici, veicoli, natura e oggetti della vita quotidiana</text>

        <circle cx="15" cy="165" r="8" fill="#10B981" />
        <text x="35" y="172" fill="#334155" font-size="20" font-weight="700">Pagine singole protette: mai più colori che passano sul retro!</text>

        <circle cx="15" cy="215" r="8" fill="#10B981" />
        <text x="35" y="222" fill="#334155" font-size="20" font-weight="700">Super Attestato del Piccolo Artista incluso al termine</text>
      </g>

      <!-- 4 Preview Circles -->
      <g transform="translate(60, 520)">
        <text x="340" y="0" text-anchor="middle" fill="#64748B" font-size="18" font-weight="bold">ANTEPRIMA DEI DISEGNI ALL'INTERNO:</text>
        <circle cx="70" cy="70" r="55" fill="#FEF08A" stroke="#E2E8F0" stroke-width="4" />
        <text x="70" y="80" text-anchor="middle" font-size="42">☀️</text>

        <circle cx="230" cy="70" r="55" fill="#FCE7F3" stroke="#E2E8F0" stroke-width="4" />
        <text x="230" y="80" text-anchor="middle" font-size="42">🍦</text>

        <circle cx="390" cy="70" r="55" fill="#DCFCE7" stroke="#E2E8F0" stroke-width="4" />
        <text x="390" y="80" text-anchor="middle" font-size="42">🚂</text>

        <circle cx="550" cy="70" r="55" fill="#E0E7FF" stroke="#E2E8F0" stroke-width="4" />
        <text x="550" y="80" text-anchor="middle" font-size="42">🚀</text>
      </g>

      <!-- Age Target & Format Badge -->
      <rect x="70" y="690" width="300" height="90" rx="16" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3" />
      <text x="220" y="730" text-anchor="middle" fill="#92400E" font-size="20" font-weight="900">ETÀ: 1 - 4 ANNI</text>
      <text x="220" y="760" text-anchor="middle" fill="#B45309" font-size="16" font-weight="bold">FORMATO GRANDE 21.6 x 27.9 cm</text>

      <!-- BARCODE BOX COMPLETAMENTE ELIMINATO: Spazio bianco libero per Amazon KDP -->

      <!-- Publisher Mark - Alzato di 1,5 cm (~60px) da y=940 a y=875 -->
      <text x="400" y="875" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="16" font-weight="bold">Edizioni Piccoli Esploratori · Pubblicato con Amazon KDP</text>
    </g>

    <!-- Dorso (Spine - 0.58 cm) -->
    <rect x="860" y="0" width="${spinePx}" height="1125" fill="#EAB308" />
    <g transform="translate(${860 + spinePx / 2}, 560) rotate(90)">
      <text x="0" y="4" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="900" fill="#78350F" letter-spacing="2">
        IL MIO GRANDE LIBRO DA COLORARE (1-4 ANNI) — Edizioni Piccoli Esploratori
      </text>
    </g>

    <!-- Fronte (Front Cover) -->
    <g transform="translate(900, 40)">
      <rect x="30" y="30" width="780" height="985" rx="36" fill="#FEF9C3" stroke="#3B82F6" stroke-width="12" />

      <!-- Side & Corner Motifs -->
      <!-- Rocket (Top Left) -->
      <g transform="translate(90, 65) scale(0.40)">
        <path d="M200 40 Q250 120 250 250 L150 250 Q150 120 200 40 Z" fill="#38BDF8" stroke="#000" stroke-width="12" />
        <circle cx="200" cy="160" r="30" fill="#FEF08A" stroke="#000" stroke-width="10" />
        <path d="M150 210 L85 275 L150 265 Z" fill="#F43F5E" stroke="#000" stroke-width="10" />
        <path d="M250 210 L315 275 L250 265 Z" fill="#F43F5E" stroke="#000" stroke-width="10" />
      </g>
      <!-- Mushroom (Top Center) -->
      <g transform="translate(345, 65) scale(0.42)">
        <path d="M150 210 C140 320 130 350 200 350 C270 350 260 320 250 210" fill="#F1F5F9" stroke="#000" stroke-width="12" />
        <path d="M60 210 C60 110 110 50 200 50 C290 50 340 110 340 210 Z" fill="#EF4444" stroke="#000" stroke-width="12" />
        <circle cx="130" cy="140" r="26" fill="#FFF" />
        <circle cx="200" cy="105" r="30" fill="#FFF" />
        <circle cx="270" cy="145" r="24" fill="#FFF" />
      </g>
      <!-- Sun (Top Right) -->
      <g transform="translate(605, 65) scale(0.40)">
        <circle cx="200" cy="200" r="85" fill="#FDE047" stroke="#000" stroke-width="12" />
        <ellipse cx="170" cy="185" rx="10" ry="14" fill="#000" />
        <ellipse cx="230" cy="185" rx="10" ry="14" fill="#000" />
      </g>
      <!-- Ice Cream (Middle Left - Cleared from Plaque) -->
      <g transform="translate(48, 345) scale(0.33)">
        <circle cx="200" cy="65" r="22" fill="#EF4444" stroke="#000" stroke-width="8" />
        <path d="M140 180 C110 160 110 110 150 95 C170 70 230 70 250 95 C290 110 290 160 260 180 Z" fill="#F472B6" stroke="#000" stroke-width="12" />
        <polygon points="135,185 265,185 200,375" fill="#FBBF24" stroke="#000" stroke-width="12" />
      </g>
      <!-- Flower (Middle Right - Cleared from Plaque) -->
      <g transform="translate(695, 345) scale(0.33)">
        <circle cx="200" cy="95" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="265" cy="130" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="265" cy="205" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="200" cy="240" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="135" cy="205" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="135" cy="130" r="38" fill="#F472B6" stroke="#000" stroke-width="8" />
        <circle cx="200" cy="165" r="50" fill="#FDE047" stroke="#000" stroke-width="10" />
      </g>
      <!-- Train (Bottom Left) -->
      <g transform="translate(55, 680) scale(0.42)">
        <rect x="170" y="140" width="150" height="130" fill="#EF4444" stroke="#000" stroke-width="12" rx="10" />
        <rect x="70" y="200" width="100" height="70" fill="#22C55E" stroke="#000" stroke-width="12" rx="10" />
        <circle cx="120" cy="300" r="42" fill="#3B82F6" stroke="#000" stroke-width="12" />
        <circle cx="210" cy="300" r="42" fill="#3B82F6" stroke="#000" stroke-width="12" />
        <circle cx="295" cy="300" r="42" fill="#3B82F6" stroke="#000" stroke-width="12" />
      </g>
      <!-- Chick (Bottom Center) -->
      <g transform="translate(340, 680) scale(0.44)">
        <ellipse cx="200" cy="220" rx="90" ry="100" fill="#FDE047" stroke="#000" stroke-width="12" />
        <circle cx="200" cy="130" r="65" fill="#FDE047" stroke="#000" stroke-width="12" />
        <polygon points="180,145 220,145 200,175" fill="#F97316" stroke="#000" stroke-width="8" />
      </g>
      <!-- Palm Tree (Bottom Right) -->
      <g transform="translate(635, 680) scale(0.44)">
        <path d="M200 160 Q210 260 215 360" stroke="#92400E" stroke-width="32" stroke-linecap="round" />
        <path d="M200 160 Q130 110 80 160" stroke="#16A34A" stroke-width="24" stroke-linecap="round" fill="none" />
        <path d="M200 160 Q270 110 320 160" stroke="#16A34A" stroke-width="24" stroke-linecap="round" fill="none" />
      </g>

      <!-- Center Title Plaque - Generous 550px width -->
      <rect x="145" y="270" width="550" height="315" rx="36" fill="#FFFFFF" stroke="#EAB308" stroke-width="8" />
      <text x="420" y="338" text-anchor="middle" fill="#16A34A" font-family="sans-serif" font-size="35" font-weight="900" letter-spacing="1">Il Mio Grande</text>
      <text x="420" y="402" text-anchor="middle" fill="#EF4444" font-family="sans-serif" font-size="38" font-weight="900" letter-spacing="0.5">LIBRO DA COLORARE</text>
      <text x="420" y="458" text-anchor="middle" fill="#2563EB" font-family="sans-serif" font-size="34" font-weight="900">per Bambini</text>
      <text x="420" y="508" text-anchor="middle" fill="#D97706" font-family="sans-serif" font-size="18" font-weight="800">100+ Disegni con Linee Spesse</text>
      <text x="420" y="542" text-anchor="middle" fill="#059669" font-family="sans-serif" font-size="14" font-weight="700">Guide Pratiche per Genitori · Pagine Protette</text>

      <!-- Wide Orange Age Banner Pill (480px, no overflow) -->
      <g transform="translate(180, 605)">
        <rect x="0" y="0" width="480" height="58" rx="29" fill="#F97316" stroke="#C2410C" stroke-width="3" />
        <text x="240" y="37" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="22" font-weight="900" letter-spacing="1.2">PER BAMBINI DA 1 A 4 ANNI</text>
      </g>

      <text x="420" y="965" text-anchor="middle" fill="#475569" font-family="sans-serif" font-size="18" font-weight="bold">Linee Spesse · Immagini Felici · Sviluppo Motorio e Fonetico</text>
      <text x="420" y="995" text-anchor="middle" fill="#64748B" font-family="sans-serif" font-size="15" font-weight="bold">Edizioni Piccoli Esploratori · Edizione Ufficiale KDP</text>
    </g>
  </svg>`;
}
