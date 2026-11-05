/**
 * Book Content, SVG Vector Illustrations, and Practical Guides
 * Formatted specifically for Amazon KDP Paperback (8.5" x 11" / 21.59 x 27.94 cm)
 */

import { ALL_48_UNIQUE_ILLUSTRATIONS, IllustrationItem } from './illustrationsData';

export interface BookPage {
  id: number;
  pageNumber: number;
  type: 'cover' | 'half-title' | 'title' | 'belongs-to' | 'guide-intro' | 'illustration' | 'blank-back' | 'certificate' | 'author-note';
  title: string;
  subtitle?: string;
  category?: 'Animali' | 'Veicoli' | 'Natura' | 'Oggetti' | 'Forme' | 'Editoriale';
  wordLabel?: string;
  practicalGuide?: {
    vocabolario: string;
    motricita: string;
    domandaAccessibile: string;
    consiglioGenitore: string;
  };
  svgData?: string;
  notes?: string;
}

export interface BookMetadata {
  title: string;
  subtitle: string;
  author: string;
  series: string;
  isbnPlaceholder: string;
  suggestedPriceEur: number;
  targetAge: string;
  pageCount: number;
  dimensionsCm: string;
  dimensionsInches: string;
  paperType: string;
  bleed: string;
  descriptionHtml: string;
  amazonKeywords: string[];
  bisacCategories: string[];
}

export const BOOK_METADATA: BookMetadata = {
  title: "Il Mio Grande Libro Pratico da Colorare: 100+ Disegni con Linee Spesse per Bambini da 1 a 4 Anni",
  subtitle: "Guida Accessibile per lo Sviluppo Motorio, Prime Parole e Divertimento Creativo (Animali, Veicoli, Natura e Oggetti Quotidiani)",
  author: "Piccoli Esploratori Studio",
  series: "Guide Pratiche & Accessibili per la Prima Infanzia",
  isbnPlaceholder: "979-12-80000-00-0",
  suggestedPriceEur: 7.99,
  targetAge: "1 - 4 Anni",
  pageCount: 102,
  dimensionsCm: "21.59 x 0.58 x 27.94 cm",
  dimensionsInches: "8.5 x 11 pollici (US Letter)",
  paperType: "Carta Bianca Standard KDP 55lb (90 GSM)",
  bleed: "Nessun al vivo (No Bleed) - Margini di sicurezza KDP 0.5 in",
  amazonKeywords: [
    "libri da disegno per bambini 1 anno",
    "libro da colorare linee spesse 2 anni",
    "primi disegni montessori 1 4 anni",
    "attività pratiche prescolari accessibili",
    "disegni facili da colorare animali",
    "regalo bambino 2 3 anni compleanno",
    "libro colorare grande formato kdp"
  ],
  bisacCategories: [
    "JUV001000 - JUVENILE NONFICTION / Activity Books / Coloring",
    "JUV009020 - JUVENILE NONFICTION / Concepts / Words",
    "FAM012000 - FAMILY & RELATIONSHIPS / Child Development"
  ],
  descriptionHtml: `<h3>🎨 Il Grande Libro da Colorare &amp; Guida Pratica per Bambini da 1 a 4 Anni</h3>
<p>Cerchi un libro da colorare davvero <b>accessibile, educativo e divertente</b> per i primi anni di vita? Questo volume da <b>102 pagine</b> in grande formato (21,59 x 27,94 cm) è stato appositamente progettato seguendo i principi della psicomotricità infantile.</p>

<h4>✨ Perché questo libro è unico e differente:</h4>
<ul>
  <li><b>48 Disegni Tutti Diversi a Linee Extra Spesse (8 mm):</b> Contorni marcati e rassicuranti per aiutare la coordinazione occhio-mano senza frustrazioni.</li>
  <li><b>Tutti Soggetti Sempre Diversi:</b> Trenino, sole, farfalla, cagnolino, funghetto, razzo, dinosauro, frutta e tanti altri senza ripetizioni!</li>
  <li><b>Mini-Guide Pratiche su ogni pagina:</b> Suggerimenti accessibili per genitori per stimolare il vocabolario, fare il verso degli animali e compiere piccoli gesti motori.</li>
  <li><b>Grandi Lettere da Tracciare:</b> Il nome di ogni disegno in stampatello maiuscolo leggibile per favorire il primo riconoscimento delle lettere.</li>
  <li><b>Formato Grande KDP 8.5" x 11" (21.59 x 27.94 cm):</b> Pagine ampie e comode, con pagine singole protette per evitare il passaggio del colore con pennarelli.</li>
  <li><b>Attestato Finale del Piccolo Artista:</b> Una sorpresa finale che gratifica il piccolo e festeggia il suo traguardo!</li>
</ul>

<h4>🎁 Un'idea regalo intelligente e accessibile a meno di 8 € per compleanni, nido e tempo di qualità in famiglia!</h4>`
};

// 48 completely unique hand-crafted SVG illustrations with bold lines (8px) for kids 1-4 years
export const RAW_ILLUSTRATIONS = ALL_48_UNIQUE_ILLUSTRATIONS;

/**
 * Builds the complete 102-page book page array adhering to Amazon KDP specifications:
 * - Cover / Title
 * - Belonging page ("Questo libro appartiene a...")
 * - Practical Guide for Parents
 * - 48 Unique Single-sided illustrations paired with 48 protective blank/pattern reverse pages
 * - Certificate of Completion
 * - Author / Bonus download page
 * Total = 102 pages!
 */
export function buildCompleteBook(): BookPage[] {
  const pages: BookPage[] = [];

  // Page 1: Half Title / Frontespizio
  pages.push({
    id: 1,
    pageNumber: 1,
    type: 'half-title',
    title: BOOK_METADATA.title,
    subtitle: "Edizione Pratica & Accessibile per la Prima Infanzia (1-4 Anni)",
    category: 'Editoriale',
    notes: 'Frontespizio interno KDP'
  });

  // Page 2: Copyright & KDP Info (verso)
  pages.push({
    id: 2,
    pageNumber: 2,
    type: 'title',
    title: "Copyright & Informazioni di Pubblicazione",
    category: 'Editoriale',
    notes: 'KDP Legal Notice, ISBN, Diritti riservati'
  });

  // Page 3: Belonging Page ("Questo libro speciale appartiene a...")
  pages.push({
    id: 3,
    pageNumber: 3,
    type: 'belongs-to',
    title: "Questo Libro Speciale Appartiene a...",
    category: 'Editoriale',
    notes: 'Pagina di personalizzazione per il bambino'
  });

  // Page 4: Practical Guide for Parents (Guida Accessibile)
  pages.push({
    id: 4,
    pageNumber: 4,
    type: 'guide-intro',
    title: "Guida Pratica per Genitori ed Educatori",
    subtitle: "Come valorizzare questo libro per lo sviluppo sensoriale e motorio (1-4 anni)",
    category: 'Editoriale',
    notes: 'Metodo pratico accessibile: linee spesse, rinforzo positivo, stimolo fonetico'
  });

  // Pages 5 to 100: Alternating 48 Unique Illustrations (Recto, odd) and 48 Protective Pages (Verso, even)
  // This satisfies standard Amazon KDP coloring book quality (single-sided print preventing marker bleed)
  const illustrationCount = 48; // 48 unique illustrations * 2 pages = 96 pages + 4 intro + 2 outro = 102 pages!

  for (let i = 0; i < illustrationCount; i++) {
    const rawTemplate = ALL_48_UNIQUE_ILLUSTRATIONS[i];
    const pageNumRecto = 5 + i * 2;
    const pageNumVerso = 6 + i * 2;

    // Odd page (Recto) -> The coloring drawing + practical guide box (Always unique!)
    pages.push({
      id: pageNumRecto,
      pageNumber: pageNumRecto,
      type: 'illustration',
      title: rawTemplate.name,
      category: rawTemplate.category,
      wordLabel: rawTemplate.word,
      svgData: rawTemplate.svg,
      practicalGuide: rawTemplate.guide,
      notes: `Disegno #${i + 1} - ${rawTemplate.name} (Linee spesse 8px per bambini 1-4 anni)`
    });

    // Even page (Verso) -> Protective blank/pattern page
    pages.push({
      id: pageNumVerso,
      pageNumber: pageNumVerso,
      type: 'blank-back',
      title: "Spazio Libero per il Tuo Piccolo Artista",
      subtitle: "Pagina anti-sbavatura per proteggere il disegno successivo",
      category: 'Editoriale',
      notes: 'Retro pagina protettivo: evita il passaggio dei pennarelli'
    });
  }

  // Page 101: Certificate of Completion
  pages.push({
    id: 101,
    pageNumber: 101,
    type: 'certificate',
    title: "Super Attestato del Piccolo Artista",
    subtitle: "Complimenti per aver completato le tue prime grandi scoperte a colori!",
    category: 'Editoriale',
    notes: 'Premio di completamento per il bambino'
  });

  // Page 102: Author Note, Review Request & Bonus QR/Code
  pages.push({
    id: 102,
    pageNumber: 102,
    type: 'author-note',
    title: "Un Messaggio Speciale dall'Autore",
    subtitle: "Grazie per aver scelto il nostro libro! Lascia la tua recensione su Amazon",
    category: 'Editoriale',
    notes: 'Marketing page: recensioni KDP e risorse bonus'
  });

  return pages;
}
