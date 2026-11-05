import { BookPage, BookMetadata, BOOK_METADATA } from '../data/bookContent';

/**
 * Generates and downloads a self-contained, standalone printable HTML file
 * containing all 102 pages formatted to 8.5" x 11" with print CSS.
 * This can be opened in any web browser and printed to PDF outside of any iframe.
 */
export function generateStandaloneHtmlString(
  pages: BookPage[],
  metadata: BookMetadata = BOOK_METADATA
): string {
  const pagesHtml = pages
    .map((p) => {
      let innerContent = '';

      switch (p.type) {
        case 'half-title':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; font-weight: bold; margin-bottom: 1rem;">Frontespizio Interno KDP</p>
              <h1 style="font-size: 28px; font-weight: 900; color: #0f172a; margin-bottom: 1rem; max-width: 500px; line-height: 1.2;">${p.title}</h1>
              <p style="font-size: 14px; color: #475569; max-width: 400px; margin-bottom: 2rem;">${p.subtitle || ''}</p>
              <div style="width: 60px; height: 4px; background: #f59e0b; border-radius: 2px; margin-bottom: 1.5rem;"></div>
              <p style="font-size: 13px; font-weight: bold; color: #64748b;">${metadata.author}</p>
            </div>
          `;
          break;

        case 'title':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem; font-size: 11px; color: #334155; line-height: 1.6;">
              <div>
                <h2 style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #0f172a; margin-bottom: 1.5rem;">Informazioni di Pubblicazione &amp; Copyright</h2>
                <p style="margin-bottom: 0.8rem;"><b>Titolo:</b> ${metadata.title}</p>
                <p style="margin-bottom: 0.8rem;"><b>Collana:</b> ${metadata.series}</p>
                <p style="margin-bottom: 0.8rem;"><b>Formato Amazon KDP:</b> Copertina Flessibile, 21.59 x 27.94 cm (8.5 x 11 pollici), 102 Pagine.</p>
                <p style="margin-bottom: 0.8rem;"><b>ISBN-13:</b> ${metadata.isbnPlaceholder}</p>
                <p style="margin-bottom: 1.5rem;"><b>Copyright &copy; 2026 Piccoli Esploratori Studio.</b> Tutti i diritti riservati.</p>
              </div>
              <div style="background: #f8fafc; padding: 1.2rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="font-weight: bold; margin-bottom: 0.5rem; color: #0f172a;">Specifiche di Stampa Amazon KDP:</p>
                <ul style="margin: 0; padding-left: 1.2rem;">
                  <li>Carta bianca standard 55 libbre (90 g/m&sup2;)</li>
                  <li>Layout a pagina singola anti-sbavatura</li>
                  <li>Conforme alle linee guida di sicurezza e accessibilita visiva</li>
                </ul>
              </div>
            </div>
          `;
          break;

        case 'belongs-to':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center; padding: 2rem; border: 3px solid #f59e0b; border-radius: 16px;">
              <div>
                <span style="font-size: 12px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 1px;">Il Tuo Libro Personale</span>
                <h2 style="font-size: 24px; font-weight: 900; color: #0f172a; margin-top: 0.5rem;">Questo Libro Speciale Appartiene a:</h2>
              </div>
              <div style="width: 100%; max-width: 400px; margin: auto;">
                <div style="border-bottom: 3px dashed #f59e0b; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
                  <span style="font-size: 11px; font-weight: bold; color: #b45309; display: block;">IL MIO NOME:</span>
                  <div style="height: 40px;"></div>
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="flex: 1; border-bottom: 2px dashed #f59e0b;">
                    <span style="font-size: 11px; font-weight: bold; color: #b45309; display: block;">HO QUESTI ANNI:</span>
                    <div style="height: 30px;"></div>
                  </div>
                  <div style="flex: 1; border-bottom: 2px dashed #f59e0b;">
                    <span style="font-size: 11px; font-weight: bold; color: #b45309; display: block;">COLORE PREFERITO:</span>
                    <div style="height: 30px;"></div>
                  </div>
                </div>
                <div style="border: 2px dashed #cbd5e1; border-radius: 12px; height: 160px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #94a3b8;">
                  Disegna il contorno della tua manina qui dentro
                </div>
              </div>
            </div>
          `;
          break;

        case 'guide-intro':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; border: 1px solid #10b981; border-radius: 12px; background: #f0fdf4;">
              <div>
                <p style="font-size: 11px; font-weight: bold; color: #047857; text-transform: uppercase;">Guida Pratica &amp; Accessibile</p>
                <h2 style="font-size: 20px; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0;">Come usare questo libro con bambini da 1 a 4 anni</h2>
                <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 11px; color: #334155;">
                  <div style="background: #ffffff; padding: 0.8rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <b>1. Le Linee Extra Spesse (5-8 mm):</b> Contorni marcati e rassicuranti adatti alla visione e coordinazione di 1-3 anni.
                  </div>
                  <div style="background: #ffffff; padding: 0.8rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <b>2. Stimolazione Fonetica &amp; Onomatopee:</b> Ripeti i suoni ("Ciuf ciuf", "Brum brum") per attivare le aree del linguaggio.
                  </div>
                  <div style="background: #ffffff; padding: 0.8rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <b>3. Nessuna Pressione:</b> Lo scarabocchio energico e naturale: loda l'intenzione e il gesto del bambino.
                  </div>
                  <div style="background: #ffffff; padding: 0.8rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <b>4. Pastelli a Cera Triangolari:</b> Consigliati per favorire l'impugnatura palmare e la motricita fine.
                  </div>
                </div>
              </div>
              <p style="font-size: 11px; color: #047857; text-align: center; font-weight: bold;">Troverai la Mini-Guida Pratica in fondo a ciascuna pagina da colorare!</p>
            </div>
          `;
          break;

        case 'blank-back':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; color: #94a3b8;">
              <h3 style="font-size: 14px; font-weight: bold; color: #64748b; margin-bottom: 0.5rem;">Pagina Protettiva Anti-Sbavatura</h3>
              <p style="font-size: 11px; max-width: 320px; line-height: 1.5; margin-bottom: 1rem;">
                Questo retro pagina e lasciato libero per evitare che i pennarelli passino sul disegno successivo.
              </p>
              <p style="font-size: 11px; color: #475569;">Usa questo spazio per scarabocchiare liberamente!</p>
            </div>
          `;
          break;

        case 'certificate':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center; padding: 2rem; border: 6px double #f59e0b; border-radius: 16px; background: #fffbeb;">
              <div>
                <span style="font-size: 12px; font-weight: 900; color: #b45309; text-transform: uppercase;">Traguardo Raggiunto</span>
                <h2 style="font-size: 24px; font-weight: 900; color: #0f172a; margin-top: 0.5rem;">SUPER ATTESTATO DEL PICCOLO ARTISTA</h2>
              </div>
              <div style="width: 100%; max-width: 400px; margin: auto;">
                <p style="font-size: 13px; color: #475569; margin-bottom: 1rem;">Si certifica con grande gioia che:</p>
                <div style="border-bottom: 3px solid #d97706; padding-bottom: 0.5rem; margin-bottom: 1rem; font-size: 18px; font-weight: bold; color: #0f172a;">
                  ___________________________
                </div>
                <p style="font-size: 11px; color: #64748b; line-height: 1.5;">
                  ha colorato con fantasia, curiosita e allegria le sue prime 100 grandi scoperte a colori!
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; font-size: 11px; color: #64748b;">
                  <div>
                    <div style="width: 90px; border-bottom: 1px solid #94a3b8; margin-bottom: 0.3rem;"></div>
                    <span>Data</span>
                  </div>
                  <div>
                    <div style="width: 90px; border-bottom: 1px solid #94a3b8; margin-bottom: 0.3rem;"></div>
                    <span>Firma Genitore</span>
                  </div>
                </div>
              </div>
              <p style="font-size: 11px; font-weight: bold; color: #b45309;">Conserva questa pagina ricordo come prima opera d'arte del tuo bambino!</p>
            </div>
          `;
          break;

        case 'author-note':
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem; font-size: 11px; color: #334155; line-height: 1.6;">
              <div>
                <h2 style="font-size: 18px; font-weight: 900; color: #0f172a; margin-bottom: 1rem;">Un Messaggio Speciale dall'Autore</h2>
                <p style="margin-bottom: 1rem;">Cara mamma, caro papa o educatore, grazie di cuore per aver scelto questo libro!</p>
                <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 1.2rem; border-radius: 12px; margin-bottom: 1rem;">
                  <b style="color: #92400e; display: block; margin-bottom: 0.4rem;">Il tuo aiuto vale tantissimo su Amazon!</b>
                  <p style="color: #b45309; margin: 0 0 0.5rem 0;">Se il libro ti e piaciuto, lascia una recensione a 5 stelle con una foto delle creazioni del tuo bimbo per sostenere questo progetto!</p>
                  <code style="background: #d97706; color: #ffffff; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: bold;">amazon.it/review/create-review</code>
                </div>
              </div>
              <p style="text-align: center; color: #94a3b8; font-size: 10px;">Stampato con Amazon KDP · Prima Edizione 2026</p>
            </div>
          `;
          break;

        case 'illustration':
        default:
          innerContent = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
                <span style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">${p.category || 'DISEGNO'}</span>
                <span style="font-size: 24px; font-weight: 900; letter-spacing: 2px; font-family: monospace; border: 2px dashed #cbd5e1; padding: 0.2rem 0.8rem; border-radius: 6px;">${p.wordLabel || ''}</span>
                <span style="font-size: 10px; font-weight: bold; color: #d97706;">#${p.id - 4}</span>
              </div>
              <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 1rem; max-height: 480px;">
                ${p.svgData || ''}
              </div>
              ${
                p.practicalGuide
                  ? `
                <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 10px; padding: 0.8rem; font-size: 10px; color: #1e293b;">
                  <b style="color: #92400e; display: block; margin-bottom: 0.3rem;">GUIDA PRATICA ACCESSIBILE PER IL GENITORE:</b>
                  <div style="margin-bottom: 0.3rem;"><b>Vocabolario:</b> ${p.practicalGuide.vocabolario}</div>
                  <div style="margin-bottom: 0.3rem;"><b>Motricita:</b> ${p.practicalGuide.motricita}</div>
                  <div><b>Domanda &amp; Stimolo:</b> ${p.practicalGuide.domandaAccessibile}</div>
                </div>
              `
                  : ''
              }
            </div>
          `;
          break;
      }

      return `
        <div class="kdp-page">
          <div class="page-header">
            <span>${p.category || 'KDP INTERIOR'}</span>
            <span>PAGINA ${p.pageNumber} DI 102</span>
          </div>
          <div class="page-body">
            ${innerContent}
          </div>
          <div class="page-footer">
            — ${p.pageNumber} —
          </div>
        </div>
      `;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>${metadata.title} - File Stampabile Amazon KDP</title>
  <style>
    @page {
      size: 8.5in 11in;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .print-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .print-btn {
      background: #f59e0b;
      color: #000000;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    .print-btn:hover {
      background: #d97706;
    }
    .book-container {
      width: 8.5in;
      margin: 20px auto;
    }
    .kdp-page {
      width: 8.5in;
      height: 11in;
      background: #ffffff;
      margin-bottom: 20px;
      padding: 0.5in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      page-break-after: always;
      break-after: page;
    }
    .page-header {
      font-size: 10px;
      font-family: monospace;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .page-body {
      flex: 1;
      padding: 12px 0;
      overflow: hidden;
    }
    .page-footer {
      text-align: center;
      font-size: 10px;
      font-family: monospace;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
      padding-top: 4px;
    }
    @media print {
      body {
        background: #ffffff;
      }
      .print-bar {
        display: none !important;
      }
      .book-container {
        margin: 0 !important;
        width: 8.5in !important;
      }
      .kdp-page {
        margin: 0 !important;
        box-shadow: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <span style="font-weight: bold; font-size: 16px;">KDP BookStudio · File Stampabile 102 Pagine (8.5" x 11")</span>
      <span style="display: block; font-size: 12px; color: #94a3b8;">Apri la finestra di stampa per salvare il PDF ufficiale pronto per KDP</span>
    </div>
    <button class="print-btn" onclick="window.print()">Stampa / Salva come PDF (Ctrl+P / Cmd+P)</button>
  </div>

  <div class="book-container">
    ${pagesHtml}
  </div>
</body>
</html>`;
}

/**
 * Downloads a self-contained, standalone printable HTML file
 */
export function downloadStandaloneHtmlBook(
  pages: BookPage[],
  metadata: BookMetadata = BOOK_METADATA
): void {
  const fullHtml = generateStandaloneHtmlString(pages, metadata);
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kdp_manoscritto_completo_102_pagine.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/**
 * Opens the printable version directly in a new browser tab/window,
 * completely outside of any iframe sandbox, so window.print() and Save-as-PDF work natively!
 */
export function openPrintableHtmlInNewWindow(
  pages: BookPage[],
  metadata: BookMetadata = BOOK_METADATA
): Window | null {
  const fullHtml = generateStandaloneHtmlString(pages, metadata);
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  return win;
}

