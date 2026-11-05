/**
 * 48 Unique, Hand-crafted SVG Illustrations with Bold Outlines (8px)
 * for Toddlers and Preschoolers (Ages 1 - 4).
 * Inspired by the top-selling Amazon KDP coloring books.
 * Every single drawing is completely unique with zero repetition.
 */

export interface IllustrationItem {
  id: number;
  name: string;
  category: 'Animali' | 'Veicoli' | 'Natura' | 'Oggetti' | 'Forme';
  word: string;
  guide: {
    vocabolario: string;
    motricita: string;
    domandaAccessibile: string;
    consiglioGenitore: string;
  };
  svg: string;
}

export const ALL_48_UNIQUE_ILLUSTRATIONS: IllustrationItem[] = [
  // 1. Treno
  {
    id: 1,
    name: "Trenino Ciuf Ciuf",
    category: "Veicoli",
    word: "TRENO",
    guide: {
      vocabolario: "Ciuf ciuf! Fai ripetere il suono del treno mentre corre sulle rotaie.",
      motricita: "Invita il bambino a tracciare cerchi con il pastello sopra le grandi ruote.",
      domandaAccessibile: "Dov'è il fumo del camino? Soffia forte come il vento!",
      consiglioGenitore: "Non correggere se esce dai bordi: premia l'energia del movimento."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M120 110 A20 20 0 0 1 140 85 A25 25 0 0 1 180 85 A20 20 0 0 1 190 110" />
      <path d="M185 85 A16 16 0 0 1 200 65 A20 20 0 0 1 230 70" />
      <rect x="110" y="130" width="40" height="40" rx="6" fill="#fff" />
      <path d="M100 130 L160 130" />
      <path d="M170 140 L310 140 A10 10 0 0 1 320 150 L320 270 L80 270 A10 10 0 0 1 70 260 L70 210 A10 10 0 0 1 80 200 L170 200 Z" fill="#fff" />
      <path d="M150 140 Q245 130 330 140" stroke-width="10" />
      <rect x="220" y="165" width="70" height="60" rx="10" fill="#fff" />
      <path d="M70 220 L50 225 L50 245 L70 250" />
      <circle cx="120" cy="300" r="42" fill="#fff" />
      <circle cx="120" cy="300" r="16" fill="#111827" />
      <circle cx="210" cy="300" r="42" fill="#fff" />
      <circle cx="210" cy="300" r="16" fill="#111827" />
      <circle cx="295" cy="300" r="42" fill="#fff" />
      <circle cx="295" cy="300" r="16" fill="#111827" />
      <rect x="120" y="293" width="175" height="14" rx="7" fill="#111827" />
      <line x1="30" y1="355" x2="370" y2="355" stroke-width="10" />
    </svg>`
  },

  // 2. Sole
  {
    id: 2,
    name: "Sole Splendente",
    category: "Natura",
    word: "SOLE",
    guide: {
      vocabolario: "Caldo, luminoso, giallo! 'Ciao Sole, buongiorno!'",
      motricita: "Fai tracciare linee dritte dal centro verso l'esterno per ogni raggio.",
      domandaAccessibile: "Cosa fa il sole? Ci scalda e ci fa vedere tutto felice!",
      consiglioGenitore: "Usa pastelli a cera a fusto grosso per facilitare la presa."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="200" r="85" fill="#fff" />
      <ellipse cx="170" cy="185" rx="10" ry="14" fill="#111827" />
      <ellipse cx="230" cy="185" rx="10" ry="14" fill="#111827" />
      <circle cx="173" cy="180" r="3" fill="#fff" />
      <circle cx="233" cy="180" r="3" fill="#fff" />
      <path d="M165 220 Q200 250 235 220" stroke-width="8" />
      <line x1="200" y1="75" x2="200" y2="35" stroke-width="9" />
      <line x1="200" y1="325" x2="200" y2="365" stroke-width="9" />
      <line x1="75" y1="200" x2="35" y2="200" stroke-width="9" />
      <line x1="325" y1="200" x2="365" y2="200" stroke-width="9" />
      <line x1="110" y1="110" x2="80" y2="80" stroke-width="9" />
      <line x1="290" y1="110" x2="320" y2="80" stroke-width="9" />
      <line x1="110" y1="290" x2="80" y2="320" stroke-width="9" />
      <line x1="290" y1="290" x2="320" y2="320" stroke-width="9" />
    </svg>`
  },

  // 3. Mela
  {
    id: 3,
    name: "Mela Rossa Croccante",
    category: "Oggetti",
    word: "MELA",
    guide: {
      vocabolario: "Gnam gnam! Croccante, dolce, rossa o verde. 'Che buona la mela!'",
      motricita: "Colorare all'interno del grande contorno a cuore della mela.",
      domandaAccessibile: "Di che colore ti piace la mela? Rossa o verde?",
      consiglioGenitore: "Nomina la frutta durante i pasti per rafforzare l'associazione visiva."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M200 110 C150 60 70 90 70 190 C70 290 150 340 200 340 C250 340 330 290 330 190 C330 90 250 60 200 110 Z" fill="#fff" />
      <path d="M200 110 Q190 70 215 45" stroke-width="10" />
      <path d="M205 75 Q265 60 270 95 Q235 110 205 75 Z" fill="#fff" />
      <circle cx="150" cy="190" r="10" fill="#111827" />
      <circle cx="250" cy="190" r="10" fill="#111827" />
      <path d="M175 225 Q200 245 225 225" stroke-width="8" />
    </svg>`
  },

  // 4. Gelato
  {
    id: 4,
    name: "Gelato Goloso",
    category: "Oggetti",
    word: "GELATO",
    guide: {
      vocabolario: "Slurp! Freddo, cremoso, alla fragola o cioccolato.",
      motricita: "Tracciare linee oblique per colorare la cialda del cono.",
      domandaAccessibile: "Quale gusto preferisci? Facciamo finta di leccare il gelato!",
      consiglioGenitore: "L'onomatopea 'Slurp' e 'Brrr che freddo!' diverte molto i piccolini."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M125 180 L200 365 L275 180 Z" fill="#fff" />
      <line x1="145" y1="230" x2="235" y2="280" stroke-width="6" />
      <line x1="165" y1="280" x2="255" y2="230" stroke-width="6" />
      <circle cx="200" cy="140" r="75" fill="#fff" />
      <circle cx="200" cy="55" r="20" fill="#fff" />
      <path d="M200 35 Q220 20 230 40" stroke-width="6" />
      <circle cx="175" cy="130" r="8" fill="#111827" />
      <circle cx="225" cy="130" r="8" fill="#111827" />
      <path d="M185 155 Q200 170 215 155" stroke-width="7" />
    </svg>`
  },

  // 5. Farfalla
  {
    id: 5,
    name: "Farfalla Colorata",
    category: "Animali",
    word: "FARFALLA",
    guide: {
      vocabolario: "Vola vola! Ali grandi, leggere, colorate. 'Batti le ali!'",
      motricita: "Colorare i grandi cerchi concentrici all'interno delle ali.",
      domandaAccessibile: "Dove si posa la farfalla? Sul bel fiore profumato!",
      consiglioGenitore: "Invita il bambino a muovere le braccia aperte su e giù."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="188" y="110" width="24" height="180" rx="12" fill="#fff" />
      <circle cx="200" cy="95" r="22" fill="#fff" />
      <path d="M190 75 Q160 40 145 60" stroke-width="7" />
      <circle cx="145" cy="60" r="6" fill="#111827" />
      <path d="M210 75 Q240 40 255 60" stroke-width="7" />
      <circle cx="255" cy="60" r="6" fill="#111827" />
      <path d="M188 130 C100 80 50 150 70 210 C90 260 188 230 188 230" fill="#fff" />
      <path d="M212 130 C300 80 350 150 330 210 C310 260 212 230 212 230" fill="#fff" />
      <path d="M188 230 C120 230 90 290 120 330 C150 360 188 280 188 280" fill="#fff" />
      <path d="M212 230 C280 230 310 290 280 330 C250 360 212 280 212 280" fill="#fff" />
      <circle cx="120" cy="170" r="22" fill="#fff" />
      <circle cx="280" cy="170" r="22" fill="#fff" />
      <circle cx="150" cy="285" r="14" fill="#fff" />
      <circle cx="250" cy="285" r="14" fill="#fff" />
    </svg>`
  },

  // 6. Fiore
  {
    id: 6,
    name: "Margherita Profumata",
    category: "Natura",
    word: "FIORE",
    guide: {
      vocabolario: "Petali, gambo verde, foglia. 'Annusa il profumo del fiore!'",
      motricita: "Colorare ogni petalo con un colore diverso per sperimentare.",
      domandaAccessibile: "Chi va sul fiore? L'apetta che fa zzz-zzz!",
      consiglioGenitore: "Fare un bel respiro profondo insieme mimando il profumo rilassa il bimbo."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M200 240 L200 370" stroke-width="12" />
      <path d="M200 310 C250 280 270 320 270 320 C270 320 230 350 200 310 Z" fill="#fff" />
      <circle cx="200" cy="160" r="48" fill="#fff" />
      <circle cx="200" cy="70" r="35" fill="#fff" />
      <circle cx="200" cy="250" r="35" fill="#fff" />
      <circle cx="110" cy="160" r="35" fill="#fff" />
      <circle cx="290" cy="160" r="35" fill="#fff" />
      <circle cx="135" cy="95" r="35" fill="#fff" />
      <circle cx="265" cy="95" r="35" fill="#fff" />
      <circle cx="135" cy="225" r="35" fill="#fff" />
      <circle cx="265" cy="225" r="35" fill="#fff" />
      <ellipse cx="185" cy="150" rx="6" ry="8" fill="#111827" />
      <ellipse cx="215" cy="150" rx="6" ry="8" fill="#111827" />
      <path d="M190 170 Q200 180 210 170" stroke-width="6" />
    </svg>`
  },

  // 7. Auto
  {
    id: 7,
    name: "Macchinina Rossa",
    category: "Veicoli",
    word: "AUTO",
    guide: {
      vocabolario: "Brum brum! Beep beep! Ruote, volante, fari accesi.",
      motricita: "Spingere il pastello in orizzontale lungo la sagoma della macchina.",
      domandaAccessibile: "Dove va la macchinina? Al parco giochi!",
      consiglioGenitore: "Simula il suono del clacson schiacciando per finta il naso del bimbo!"
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M60 260 L60 210 A20 20 0 0 1 80 190 L120 190 L160 120 A20 20 0 0 1 180 110 L280 110 A20 20 0 0 1 300 120 L335 190 L345 190 A20 20 0 0 1 365 210 L365 260 Z" fill="#fff" />
      <path d="M175 130 L220 130 L220 185 L145 185 Z" fill="#fff" />
      <path d="M235 130 L285 130 L310 185 L235 185 Z" fill="#fff" />
      <circle cx="50" cy="220" r="10" fill="#fff" />
      <circle cx="130" cy="275" r="38" fill="#fff" />
      <circle cx="130" cy="275" r="16" fill="#111827" />
      <circle cx="295" cy="275" r="38" fill="#fff" />
      <circle cx="295" cy="275" r="16" fill="#111827" />
      <line x1="30" y1="320" x2="370" y2="320" stroke-width="9" />
    </svg>`
  },

  // 8. Pallone
  {
    id: 8,
    name: "Pallone da Gioco",
    category: "Oggetti",
    word: "PALLONE",
    guide: {
      vocabolario: "Boing boing! Salta, rotola, tondo, rimbalza in alto.",
      motricita: "Seguire le curve concentriche con il pastello per riempire gli spicchi.",
      domandaAccessibile: "Come salta la palla? Fai un salto anche tu!",
      consiglioGenitore: "Il cerchio perfetto aiuta a sviluppare la percezione delle forme geometriche."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="200" r="140" fill="#fff" stroke-width="10" />
      <circle cx="200" cy="200" r="45" fill="#fff" />
      <path d="M200 60 L200 155" />
      <path d="M200 245 L200 340" />
      <path d="M60 200 L155 200" />
      <path d="M245 200 L340 200" />
      <path d="M100 100 Q150 150 170 170" />
      <path d="M300 300 Q250 250 230 230" />
      <path d="M300 100 Q250 150 230 170" />
      <path d="M100 300 Q150 250 170 230" />
    </svg>`
  },

  // 9. Luna
  {
    id: 9,
    name: "Luna Buonanotte",
    category: "Natura",
    word: "LUNA",
    guide: {
      vocabolario: "Notte, cielo, ninna nanna, stelle, sogni d'oro.",
      motricita: "Tracciare la grande linea curva a mezzaluna.",
      domandaAccessibile: "La luna dorme nel cielo? Facciamo shhh...",
      consiglioGenitore: "Questa pagina è ottima per la routine serale prima di dormire."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M210 60 C120 60 70 140 70 230 C70 310 130 360 210 360 C140 330 120 230 150 150 C165 110 190 80 210 60 Z" fill="#fff" />
      <path d="M105 180 Q120 190 135 180" stroke-width="6" />
      <ellipse cx="120" cy="180" rx="8" ry="4" fill="#111827" />
      <path d="M115 210 Q130 225 140 210" stroke-width="6" />
      <polygon points="280,100 290,125 315,125 295,140 302,165 280,150 258,165 265,140 245,125 270,125" fill="#fff" stroke-width="7" />
      <polygon points="310,230 317,247 335,247 320,257 325,275 310,265 295,275 300,257 285,247 303,247" fill="#fff" stroke-width="6" />
    </svg>`
  },

  // 10. Barca
  {
    id: 10,
    name: "Barca a Vela",
    category: "Veicoli",
    word: "BARCA",
    guide: {
      vocabolario: "Mare, onde, vento, vela bianca. 'Sciacquettio dell'acqua!'",
      motricita: "Disegnare onde morbide sotto la chiglia della barca.",
      domandaAccessibile: "Chi guida la barchetta? Un coraggioso capitano!",
      consiglioGenitore: "Fai soffiare il bimbo per gonfiare le vele immaginarie."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <line x1="190" y1="50" x2="190" y2="240" stroke-width="10" />
      <path d="M200 65 L310 220 L200 220 Z" fill="#fff" />
      <path d="M180 90 L90 220 L180 220 Z" fill="#fff" />
      <polygon points="190,50 150,65 190,80" fill="#fff" />
      <path d="M70 240 L330 240 L285 300 L115 300 Z" fill="#fff" />
      <path d="M40 330 Q80 310 120 330 Q160 350 200 330 Q240 310 280 330 Q320 350 360 330" stroke-width="10" />
      <path d="M50 365 Q90 345 130 365 Q170 385 210 365 Q250 345 290 365 Q330 385 370 365" stroke-width="7" />
    </svg>`
  },

  // 11. Cane
  {
    id: 11,
    name: "Cagnolino Amico",
    category: "Animali",
    word: "CANE",
    guide: {
      vocabolario: "Bau bau! Coda scodinzolante, orecchie morbide, zampette.",
      motricita: "Stimola tocchi circolari sulla pancia e sulla testa.",
      domandaAccessibile: "Come fa le feste il cagnolino? Scodinzola!",
      consiglioGenitore: "L'empatia verso gli animali sviluppa il rispetto e la gentilezza."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="150" r="70" fill="#fff" />
      <path d="M135 120 C100 130 90 210 125 220 C145 220 150 180 140 145" fill="#fff" />
      <path d="M265 120 C300 130 310 210 275 220 C255 220 250 180 260 145" fill="#fff" />
      <circle cx="175" cy="140" r="10" fill="#111827" />
      <circle cx="225" cy="140" r="10" fill="#111827" />
      <ellipse cx="200" cy="170" rx="16" ry="12" fill="#111827" />
      <path d="M200 182 L200 195 M185 195 Q200 208 215 195" stroke-width="7" />
      <path d="M150 215 C130 250 120 320 130 350 L270 350 C280 320 270 250 250 215" fill="#fff" />
      <path d="M145 220 Q200 240 255 220" stroke-width="12" />
      <circle cx="200" cy="245" r="9" fill="#fff" />
      <rect x="175" y="270" width="50" height="80" rx="15" fill="#fff" />
      <line x1="190" y1="330" x2="190" y2="350" />
      <line x1="210" y1="330" x2="210" y2="350" />
      <path d="M270 280 Q320 260 320 220" stroke-width="10" />
    </svg>`
  },

  // 12. Gatto
  {
    id: 12,
    name: "Gattino con Baffi",
    category: "Animali",
    word: "GATTO",
    guide: {
      vocabolario: "Miao miao! Fusa dolci, baffi lunghi, orecchie a punta.",
      motricita: "Fai disegnare i lunghi baffi con tratti rapidi a destra e sinistra.",
      domandaAccessibile: "Come fa le fusa il gattino? Prrr prrr!",
      consiglioGenitore: "Stimola l'imitazione vocale: miao acuto e miao grave."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="160" r="75" fill="#fff" />
      <polygon points="135,115 130,50 185,95" fill="#fff" />
      <polygon points="265,115 270,50 215,95" fill="#fff" />
      <ellipse cx="170" cy="150" rx="10" ry="14" fill="#111827" />
      <ellipse cx="230" cy="150" rx="10" ry="14" fill="#111827" />
      <polygon points="190,175 210,175 200,185" fill="#111827" />
      <path d="M190 195 Q200 205 210 195" stroke-width="6" />
      <line x1="100" y1="165" x2="150" y2="175" stroke-width="7" />
      <line x1="100" y1="190" x2="150" y2="190" stroke-width="7" />
      <line x1="300" y1="165" x2="250" y2="175" stroke-width="7" />
      <line x1="300" y1="190" x2="250" y2="190" stroke-width="7" />
      <path d="M140 230 C125 270 120 330 135 360 L265 360 C280 330 275 270 260 230" fill="#fff" />
      <path d="M265 310 Q325 290 320 240 Q315 210 295 230" stroke-width="10" />
    </svg>`
  },

  // 13. Pesce
  {
    id: 13,
    name: "Pesciolino Marino",
    category: "Animali",
    word: "PESCE",
    guide: {
      vocabolario: "Glub glub! Nuota nell'acqua, bollicine, coda a ventaglio.",
      motricita: "Colorare le squame curve e i cerchietti delle bolle.",
      domandaAccessibile: "Come nuota il pesciolino? Con la codina veloce!",
      consiglioGenitore: "Fai aprire e chiudere la bocca come un pesciolino per la motricità labiale."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M90 200 C150 110 280 110 320 200 C280 290 150 290 90 200 Z" fill="#fff" />
      <polygon points="320,200 380,130 365,200 380,270" fill="#fff" />
      <circle cx="150" cy="180" r="14" fill="#111827" />
      <circle cx="155" cy="175" r="4" fill="#fff" />
      <path d="M90 200 Q70 190 85 180" stroke-width="8" />
      <path d="M210 145 C190 170 190 230 210 255" stroke-width="8" />
      <path d="M250 160 C235 180 235 220 250 240" stroke-width="7" />
      <circle cx="70" cy="140" r="16" fill="#fff" />
      <circle cx="50" cy="90" r="22" fill="#fff" />
    </svg>`
  },

  // 14. Funghetto (dallo screenshot!)
  {
    id: 14,
    name: "Funghetto del Bosco",
    category: "Natura",
    word: "FUNGHETTO",
    guide: {
      vocabolario: "Bosco, cappello a pois, gambo bianco, erbetta fresca.",
      motricita: "Colorare i grandi pois bianchi dentro il cappello rosso.",
      domandaAccessibile: "Chi abita sotto il funghetto? Forse un piccolo gnomo!",
      consiglioGenitore: "I cerchi chiari su sfondo scuro sono perfetti per la coordinazione oculo-manuale."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M60 210 C60 100 340 100 340 210 C340 230 60 230 60 210 Z" fill="#fff" />
      <circle cx="140" cy="150" r="24" fill="#fff" />
      <circle cx="210" cy="130" r="18" fill="#fff" />
      <circle cx="270" cy="165" r="22" fill="#fff" />
      <circle cx="100" cy="190" r="14" fill="#fff" />
      <path d="M150 230 C140 280 145 330 160 350 L240 350 C255 330 260 280 250 230" fill="#fff" />
      <ellipse cx="180" cy="275" rx="6" ry="10" fill="#111827" />
      <ellipse cx="220" cy="275" rx="6" ry="10" fill="#111827" />
      <path d="M190 305 Q200 315 210 305" stroke-width="6" />
      <path d="M110 350 L125 325 L140 350 L155 330 L170 350" stroke-width="7" />
      <path d="M230 350 L245 325 L260 350 L275 330 L290 350" stroke-width="7" />
    </svg>`
  },

  // 15. Aereo
  {
    id: 15,
    name: "Aeroplanino Volante",
    category: "Veicoli",
    word: "AEREO",
    guide: {
      vocabolario: "Fiuuu! Vola alto, ali forti, elica che gira veloce.",
      motricita: "Tracciare la scia dell'aereo tra le morbide nuvolette.",
      domandaAccessibile: "Cosa vede l'aereo dall'alto? Le case piccoline!",
      consiglioGenitore: "Fai allargare le braccia al bambino simulando il volo."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M90 200 C80 190 120 180 280 180 C320 180 340 190 340 205 C340 220 320 230 280 230 C120 230 80 220 90 200 Z" fill="#fff" />
      <path d="M200 180 L230 90 L270 90 L240 180 Z" fill="#fff" />
      <path d="M200 230 L230 320 L270 320 L240 230 Z" fill="#fff" />
      <path d="M90 200 L60 140 L90 140 L115 190 Z" fill="#fff" />
      <circle cx="280" cy="205" r="14" fill="#fff" />
      <circle cx="230" cy="205" r="12" fill="#fff" />
      <circle cx="180" cy="205" r="12" fill="#fff" />
      <ellipse cx="350" cy="205" rx="10" ry="35" fill="#fff" />
    </svg>`
  },

  // 16. Stella
  {
    id: 16,
    name: "Stella dei Desideri",
    category: "Natura",
    word: "STELLA",
    guide: {
      vocabolario: "Brilla brilla la stellina! Gialla, magica nel cielo blu.",
      motricita: "Puntare il pastello su ciascuna delle 5 punte della stella.",
      domandaAccessibile: "Quante punte ha la stella? Contiamole insieme: 1, 2, 3, 4, 5!",
      consiglioGenitore: "Cantate la canzoncina 'Stella stellina la notte si avvicina'."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <polygon points="200,45 245,145 355,155 270,230 295,340 200,285 105,340 130,230 45,155 155,145" fill="#fff" stroke-width="9" />
      <ellipse cx="170" cy="195" rx="8" ry="12" fill="#111827" />
      <ellipse cx="230" cy="195" rx="8" ry="12" fill="#111827" />
      <circle cx="173" cy="190" r="3" fill="#fff" />
      <circle cx="233" cy="190" r="3" fill="#fff" />
      <path d="M180 230 Q200 245 220 230" stroke-width="7" />
      <ellipse cx="150" cy="225" rx="8" ry="4" fill="#fff" />
      <ellipse cx="250" cy="225" rx="8" ry="4" fill="#fff" />
    </svg>`
  },

  // 17. Casa
  {
    id: 17,
    name: "Casetta Accogliente",
    category: "Oggetti",
    word: "CASA",
    guide: {
      vocabolario: "Tetto, porta, finestra, camino. 'A casa con mamma e papà!'",
      motricita: "Colorare i quattro vetri quadrati della finestra.",
      domandaAccessibile: "Chi bussa alla porta? Toc toc!",
      consiglioGenitore: "Bussate sul tavolo facendo 'Toc toc' per stimolare il gioco simbolico."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="90" y="180" width="220" height="170" fill="#fff" />
      <polygon points="200,60 50,180 350,180" fill="#fff" stroke-width="10" />
      <rect x="250" y="80" width="40" height="70" fill="#fff" />
      <path d="M270 65 Q260 45 275 30" stroke-width="6" />
      <rect x="115" y="210" width="60" height="60" rx="6" fill="#fff" />
      <line x1="145" y1="210" x2="145" y2="270" stroke-width="6" />
      <line x1="115" y1="240" x2="175" y2="240" stroke-width="6" />
      <rect x="215" y="230" width="65" height="120" rx="8" fill="#fff" />
      <circle cx="230" cy="290" r="6" fill="#111827" />
    </svg>`
  },

  // 18. Orsetto
  {
    id: 18,
    name: "Orsetto Peluche",
    category: "Oggetti",
    word: "ORSETTO",
    guide: {
      vocabolario: "Morbido, coccolone, orecchie rotonde, abbraccio caldo.",
      motricita: "Colorare la grande pancia tonda dell'orsetto.",
      domandaAccessibile: "Diamo un grande abbraccio all'orsetto?",
      consiglioGenitore: "Il peluche rappresenta l'oggetto transizionale che rassicura il bambino."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="140" r="65" fill="#fff" />
      <circle cx="140" cy="90" r="26" fill="#fff" />
      <circle cx="140" cy="90" r="14" fill="#fff" />
      <circle cx="260" cy="90" r="26" fill="#fff" />
      <circle cx="260" cy="90" r="14" fill="#fff" />
      <circle cx="175" cy="130" r="8" fill="#111827" />
      <circle cx="225" cy="130" r="8" fill="#111827" />
      <ellipse cx="200" cy="155" rx="22" ry="16" fill="#fff" />
      <ellipse cx="200" cy="148" rx="10" ry="7" fill="#111827" />
      <path d="M190 162 Q200 170 210 162" stroke-width="6" />
      <circle cx="200" cy="270" r="85" fill="#fff" />
      <circle cx="200" cy="275" r="50" fill="#fff" />
      <ellipse cx="105" cy="260" rx="22" ry="40" fill="#fff" />
      <ellipse cx="295" cy="260" rx="22" ry="40" fill="#fff" />
      <ellipse cx="150" cy="345" rx="30" ry="20" fill="#fff" />
      <ellipse cx="250" cy="345" rx="30" ry="20" fill="#fff" />
    </svg>`
  },

  // 19. Banana
  {
    id: 19,
    name: "Banana Dolce",
    category: "Oggetti",
    word: "BANANA",
    guide: {
      vocabolario: "Gialla, dolce, nutriente. 'Sbuccia la banana: zac!'",
      motricita: "Seguire l'arco della banana dall'alto al basso.",
      domandaAccessibile: "A chi piace la banana? Alle scimmiette matte!",
      consiglioGenitore: "Mima il gesto di sbucciare per allenare la coordinazione bilaterale."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M110 80 C80 180 110 300 280 320 C230 310 140 270 140 180 C140 120 160 80 170 65 Z" fill="#fff" stroke-width="10" />
      <rect x="155" y="45" width="22" height="25" rx="5" fill="#fff" />
      <path d="M125 150 Q160 220 220 260" stroke-width="6" />
      <circle cx="155" cy="180" r="7" fill="#111827" />
      <circle cx="185" cy="205" r="7" fill="#111827" />
      <path d="M160 215 Q175 225 185 215" stroke-width="6" />
    </svg>`
  },

  // 20. Razzo (dallo screenshot!)
  {
    id: 20,
    name: "Razzo Spaziale",
    category: "Veicoli",
    word: "RAZZO",
    guide: {
      vocabolario: "3, 2, 1... Partenza! Nello spazio verso le stelle lontane.",
      motricita: "Colorare le fiamme a zig-zag sotto il motore del razzo.",
      domandaAccessibile: "Cosa c'è nello spazio? La luna e i pianeti!",
      consiglioGenitore: "Fate il conto alla rovescia insieme '3, 2, 1... VIA!' saltando in piedi."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M200 40 C140 100 130 200 140 280 L260 280 C270 200 260 100 200 40 Z" fill="#fff" stroke-width="9" />
      <circle cx="200" cy="160" r="35" fill="#fff" />
      <circle cx="200" cy="160" r="22" fill="#fff" />
      <path d="M140 220 L90 280 L140 280 Z" fill="#fff" stroke-width="8" />
      <path d="M260 220 L310 280 L260 280 Z" fill="#fff" stroke-width="8" />
      <path d="M160 280 L180 340 L200 300 L220 340 L240 280" stroke-width="9" fill="#fff" />
      <line x1="200" y1="40" x2="200" y2="15" stroke-width="8" />
    </svg>`
  },

  // 21. Coniglio
  {
    id: 21,
    name: "Coniglietto Saltellante",
    category: "Animali",
    word: "CONIGLIO",
    guide: {
      vocabolario: "Hop hop! Orecchie lunghe, nasino rosa, salta sul prato.",
      motricita: "Colorare l'interno rosa delle grandi orecchie.",
      domandaAccessibile: "Cosa mangia il coniglietto? Una croccante carotina!",
      consiglioGenitore: "Fate muovere le dita sopra la testa come fossero orecchie di coniglio."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="200" r="75" fill="#fff" />
      <ellipse cx="160" cy="90" rx="22" ry="70" fill="#fff" />
      <ellipse cx="160" cy="90" rx="10" ry="45" fill="#fff" />
      <ellipse cx="240" cy="90" rx="22" ry="70" fill="#fff" />
      <ellipse cx="240" cy="90" rx="10" ry="45" fill="#fff" />
      <circle cx="170" cy="190" r="9" fill="#111827" />
      <circle cx="230" cy="190" r="9" fill="#111827" />
      <polygon points="190,210 210,210 200,220" fill="#111827" />
      <path d="M190 225 Q200 235 210 225" stroke-width="6" />
      <path d="M150 270 C140 310 135 360 145 375 L255 375 C265 360 260 310 250 270" fill="#fff" />
      <ellipse cx="150" cy="370" rx="25" ry="12" fill="#fff" />
      <ellipse cx="250" cy="370" rx="25" ry="12" fill="#fff" />
    </svg>`
  },

  // 22. Carota
  {
    id: 22,
    name: "Carota del Giardino",
    category: "Oggetti",
    word: "CAROTA",
    guide: {
      vocabolario: "Arancione, foglie verdi, fa bene agli occhi e ai dentini.",
      motricita: "Tracciare le piccole linee orizzontali sulla buccia.",
      domandaAccessibile: "Dove cresce la carota? Sotto la terra!",
      consiglioGenitore: "Coinvolgi il bambino nella preparazione delle verdure crude a tavola."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M140 110 C130 180 180 320 200 360 C220 320 270 180 260 110 C240 100 160 100 140 110 Z" fill="#fff" stroke-width="10" />
      <line x1="160" y1="160" x2="200" y2="160" stroke-width="7" />
      <line x1="190" y1="220" x2="235" y2="220" stroke-width="7" />
      <line x1="175" y1="280" x2="215" y2="280" stroke-width="7" />
      <path d="M200 105 C180 60 150 40 140 50 C150 75 180 95 195 105" fill="#fff" />
      <path d="M200 105 C200 40 205 30 215 30 C220 55 210 85 205 105" fill="#fff" />
      <path d="M205 105 C220 60 250 40 260 50 C250 75 220 95 205 105" fill="#fff" />
    </svg>`
  },

  // 23. Tartaruga
  {
    id: 23,
    name: "Tartaruga Calma",
    category: "Animali",
    word: "TARTARUGA",
    guide: {
      vocabolario: "Piano piano... Guscio duro come una casetta, zampette corte.",
      motricita: "Colorare i comparti del guscio con colori alternati.",
      domandaAccessibile: "Perché la tartaruga va piano? Perché si gode la passeggiata!",
      consiglioGenitore: "Insegna al bimbo il ritmo lento rispetto al ritmo veloce: correre vs camminare piano."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M90 240 C90 140 310 140 310 240 Z" fill="#fff" stroke-width="10" />
      <line x1="85" y1="240" x2="315" y2="240" stroke-width="10" />
      <circle cx="200" cy="190" r="28" fill="#fff" />
      <circle cx="140" cy="205" r="20" fill="#fff" />
      <circle cx="260" cy="205" r="20" fill="#fff" />
      <ellipse cx="60" cy="235" rx="30" ry="22" fill="#fff" />
      <circle cx="50" cy="230" r="5" fill="#111827" />
      <path d="M45 245 Q55 250 65 245" stroke-width="5" />
      <ellipse cx="120" cy="265" rx="22" ry="16" fill="#fff" />
      <ellipse cx="280" cy="265" rx="22" ry="16" fill="#fff" />
      <polygon points="310,235 340,240 310,245" fill="#fff" />
    </svg>`
  },

  // 24. Cupcake
  {
    id: 24,
    name: "Cupcake con Ciliegia",
    category: "Oggetti",
    word: "CUPCAKE",
    guide: {
      vocabolario: "Torta, glassa soffice, festa di compleanno, ciliegina.",
      motricita: "Colorare la crema ondulata sopra il pirottino.",
      domandaAccessibile: "Cosa c'è in cima? Una bella ciliegia rossa!",
      consiglioGenitore: "Simula di spegnere la candelina soffiando insieme."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M120 220 L150 350 L250 350 L280 220 Z" fill="#fff" />
      <line x1="160" y1="225" x2="180" y2="345" stroke-width="6" />
      <line x1="200" y1="225" x2="200" y2="345" stroke-width="6" />
      <line x1="240" y1="225" x2="220" y2="345" stroke-width="6" />
      <path d="M95 220 C80 180 130 140 160 160 C180 120 230 120 250 160 C280 140 320 180 305 220 Z" fill="#fff" stroke-width="9" />
      <circle cx="200" cy="100" r="24" fill="#fff" />
      <path d="M200 76 Q220 50 240 60" stroke-width="6" />
    </svg>`
  },

  // 25. Uccellino
  {
    id: 25,
    name: "Uccellino Canterino",
    category: "Animali",
    word: "UCCELLINO",
    guide: {
      vocabolario: "Cip cip! Piumette, becco, canta sul ramo all'albero.",
      motricita: "Ripetere il suono 'Cip cip' battendo le mani a ritmo.",
      domandaAccessibile: "Dove vola l'uccellino? Nel cielo azzurro!",
      consiglioGenitore: "L'ascolto dei suoni della natura affina la percezione acustica."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="160" cy="180" r="60" fill="#fff" />
      <path d="M160 240 C210 240 270 200 270 150 C270 120 200 120 160 140" fill="#fff" />
      <polygon points="105,175 60,185 105,195" fill="#fff" />
      <circle cx="140" cy="165" r="9" fill="#111827" />
      <circle cx="143" cy="162" r="3" fill="#fff" />
      <path d="M170 190 Q220 190 230 150" stroke-width="8" />
      <polygon points="260,140 330,120 300,165" fill="#fff" />
      <line x1="60" y1="280" x2="340" y2="280" stroke-width="12" />
      <line x1="170" y1="240" x2="170" y2="280" stroke-width="7" />
      <line x1="200" y1="240" x2="200" y2="280" stroke-width="7" />
    </svg>`
  },

  // 26. Tamburo
  {
    id: 26,
    name: "Tamburo Musicale",
    category: "Oggetti",
    word: "TAMBURO",
    guide: {
      vocabolario: "Bum bum ba-bum! Ritmo, musica, bacchette di legno.",
      motricita: "Battere con il palmo sul disegno prima di iniziare a colorare.",
      domandaAccessibile: "Come suona il tamburo? Forte forte: BUM BUM!",
      consiglioGenitore: "Il senso del ritmo è fondamentale per l'acquisizione del linguaggio."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="200" cy="130" rx="120" ry="40" fill="#fff" stroke-width="9" />
      <path d="M80 130 L80 270 C80 300 320 300 320 270 L320 130" fill="#fff" stroke-width="9" />
      <path d="M80 130 L140 280 L200 130 L260 280 L320 130" stroke-width="7" />
      <line x1="100" y1="60" x2="160" y2="120" stroke-width="9" />
      <circle cx="95" cy="55" r="12" fill="#fff" />
      <line x1="300" y1="60" x2="240" y2="120" stroke-width="9" />
      <circle cx="305" cy="55" r="12" fill="#fff" />
    </svg>`
  },

  // 27. Coccinella
  {
    id: 27,
    name: "Coccinella Portafortuna",
    category: "Animali",
    word: "COCCINELLA",
    guide: {
      vocabolario: "Puntini neri, ali rosse, porta fortuna! 'Vola in alto sul ditino!'",
      motricita: "Riempire con precisione ciascuno dei grandi puntini tondi.",
      domandaAccessibile: "Quanti pallini ha sulla schiena? Contiamoli!",
      consiglioGenitore: "Fate finta di far camminare la coccinella sul braccio con le dita (solletico)."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="200" cy="230" r="110" fill="#fff" stroke-width="10" />
      <line x1="200" y1="120" x2="200" y2="340" stroke-width="9" />
      <path d="M140 135 C140 85 260 85 260 135 Z" fill="#111827" />
      <line x1="170" y1="95" x2="140" y2="55" stroke-width="7" />
      <circle cx="140" cy="55" r="6" fill="#111827" />
      <line x1="230" y1="95" x2="260" y2="55" stroke-width="7" />
      <circle cx="260" cy="55" r="6" fill="#111827" />
      <circle cx="150" cy="180" r="18" fill="#111827" />
      <circle cx="250" cy="180" r="18" fill="#111827" />
      <circle cx="140" cy="250" r="22" fill="#111827" />
      <circle cx="260" cy="250" r="22" fill="#111827" />
      <circle cx="160" cy="305" r="15" fill="#111827" />
      <circle cx="240" cy="305" r="15" fill="#111827" />
    </svg>`
  },

  // 28. Balena
  {
    id: 28,
    name: "Balenottera Gigante",
    category: "Animali",
    word: "BALENA",
    guide: {
      vocabolario: "Grande, blu, spruzzo d'acqua in testa, regina del mare.",
      motricita: "Tracciare le gocce dello spruzzo d'acqua verso l'alto.",
      domandaAccessibile: "Cosa spruzza la balena? Una bella fontana d'acqua!",
      consiglioGenitore: "Fare il rumore dello spruzzo 'Pffff!' diverte tantissimo i bambini."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M70 240 C60 150 200 150 290 170 C330 180 350 210 320 250 C260 290 110 300 70 240 Z" fill="#fff" stroke-width="10" />
      <polygon points="320,225 380,180 365,235 385,275" fill="#fff" />
      <circle cx="120" cy="205" r="10" fill="#111827" />
      <path d="M100 240 Q130 260 160 245" stroke-width="7" />
      <path d="M190 160 Q170 90 140 100" stroke-width="7" />
      <path d="M200 160 Q200 80 200 70" stroke-width="7" />
      <path d="M210 160 Q230 90 260 100" stroke-width="7" />
      <path d="M40 310 Q80 290 120 310 Q160 330 200 310 Q240 290 280 310 Q320 330 360 310" stroke-width="9" />
    </svg>`
  },

  // 29. Foglia
  {
    id: 29,
    name: "Foglia d'Autunno",
    category: "Natura",
    word: "FOGLIA",
    guide: {
      vocabolario: "Albero, verde o gialla, cade dondolando nel vento.",
      motricita: "Seguire la nervatura centrale e poi i rami laterali.",
      domandaAccessibile: "Come cadono le foglie? Piano piano... frusssss!",
      consiglioGenitore: "Raccogliete foglie vere durante una passeggiata per confrontarle con il disegno."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M200 50 C110 100 80 240 200 330 C320 240 290 100 200 50 Z" fill="#fff" stroke-width="9" />
      <line x1="200" y1="50" x2="200" y2="380" stroke-width="9" />
      <path d="M200 130 L140 170" stroke-width="7" />
      <path d="M200 130 L260 170" stroke-width="7" />
      <path d="M200 200 L130 245" stroke-width="7" />
      <path d="M200 200 L270 245" stroke-width="7" />
      <path d="M200 270 L150 305" stroke-width="7" />
      <path d="M200 270 L250 305" stroke-width="7" />
    </svg>`
  },

  // 30. Regalo
  {
    id: 30,
    name: "Pacco Regalo",
    category: "Oggetti",
    word: "REGALO",
    guide: {
      vocabolario: "Sorpresa! Nastro, fiocco grande, carta colorata.",
      motricita: "Colorare i quattro scomparti divisi dal nastro a croce.",
      domandaAccessibile: "Cosa c'è dentro il pacco? Una bella sorpresa!",
      consiglioGenitore: "Il concetto di regalo stimola la gratitudine e la gioia della condivisione."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="90" y="160" width="220" height="190" rx="8" fill="#fff" stroke-width="10" />
      <rect x="75" y="140" width="250" height="40" rx="6" fill="#fff" stroke-width="9" />
      <rect x="180" y="140" width="40" height="210" fill="#fff" stroke-width="8" />
      <path d="M200 140 C170 90 100 70 120 125 C135 150 190 140 200 140 Z" fill="#fff" stroke-width="8" />
      <path d="M200 140 C230 90 300 70 280 125 C265 150 210 140 200 140 Z" fill="#fff" stroke-width="8" />
      <circle cx="200" cy="140" r="14" fill="#fff" />
    </svg>`
  },

  // 31. Elefante
  {
    id: 31,
    name: "Elefantino Gentile",
    category: "Animali",
    word: "ELEFANTE",
    guide: {
      vocabolario: "Barrito! Proboscide lunga, grandi orecchie a ventaglio.",
      motricita: "Seguire la curva della proboscide alzata in segno di festa.",
      domandaAccessibile: "Come fa l'elefante con la proboscide? Fa la doccia!",
      consiglioGenitore: "Mimate la proboscide con il braccio davanti al viso."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="170" cy="170" r="65" fill="#fff" />
      <circle cx="100" cy="165" r="45" fill="#fff" />
      <circle cx="150" cy="155" r="8" fill="#111827" />
      <path d="M190 200 Q240 200 240 130 Q240 90 220 100" stroke-width="12" />
      <path d="M130 225 C120 270 125 350 140 360 L280 360 C300 350 310 270 290 225" fill="#fff" />
      <rect x="150" y="270" width="35" height="90" fill="#fff" />
      <rect x="235" y="270" width="35" height="90" fill="#fff" />
      <path d="M290 260 Q325 280 320 310" stroke-width="7" />
    </svg>`
  },

  // 32. Moto
  {
    id: 32,
    name: "Vespa & Scooter",
    category: "Veicoli",
    word: "MOTO",
    guide: {
      vocabolario: "Vrum vrum! Due ruote veloci, sellino, specchietto tondo.",
      motricita: "Colorare i cerchi concentrici delle due ruote.",
      domandaAccessibile: "Mettiamo il casco protettivo? Clic!",
      consiglioGenitore: "Ricordare l'importanza del casco abitua fin da piccoli alla sicurezza."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="110" cy="290" r="45" fill="#fff" stroke-width="10" />
      <circle cx="110" cy="290" r="18" fill="#111827" />
      <circle cx="290" cy="290" r="45" fill="#fff" stroke-width="10" />
      <circle cx="290" cy="290" r="18" fill="#111827" />
      <path d="M110 290 L160 210 L230 210 L280 270" stroke-width="9" />
      <path d="M140 210 L180 130 L220 130" stroke-width="9" />
      <circle cx="225" cy="130" r="14" fill="#fff" />
      <path d="M150 190 Q220 180 240 210" stroke-width="14" stroke-linecap="round" />
      <line x1="40" y1="345" x2="360" y2="345" stroke-width="9" />
    </svg>`
  },

  // 33. Chitarra
  {
    id: 33,
    name: "Chitarra Acustica",
    category: "Oggetti",
    word: "CHITARRA",
    guide: {
      vocabolario: "Strimpella! Corde, cassa di risonanza, musica allegra.",
      motricita: "Sfiorare le corde con il dito come un vero musicista.",
      domandaAccessibile: "Suoniamo una canzone per cantare insieme?",
      consiglioGenitore: "Cantare ninne nanne o canzoncine ritmate favorisce l'espressione vocale."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="200" cy="275" rx="75" ry="60" fill="#fff" stroke-width="9" />
      <ellipse cx="200" cy="180" rx="55" ry="40" fill="#fff" stroke-width="9" />
      <circle cx="200" cy="225" r="22" fill="#fff" />
      <rect x="188" y="50" width="24" height="110" fill="#fff" stroke-width="8" />
      <rect x="182" y="35" width="36" height="30" rx="4" fill="#fff" />
      <line x1="195" y1="50" x2="195" y2="280" stroke-width="4" />
      <line x1="205" y1="50" x2="205" y2="280" stroke-width="4" />
    </svg>`
  },

  // 34. Pinguino
  {
    id: 34,
    name: "Pinguino del Polo",
    category: "Animali",
    word: "PINGUINO",
    guide: {
      vocabolario: "Ghiaccio, freddo, pancino bianco, cammina dondolando.",
      motricita: "Camminare a gambe dritte come un pinguino sul tappeto.",
      domandaAccessibile: "Come cammina il pinguino? Dondola a destra e sinistra!",
      consiglioGenitore: "Il contrasto bianco/nero stimola la discriminazione visiva."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="200" cy="220" rx="85" ry="120" fill="#fff" stroke-width="10" />
      <ellipse cx="200" cy="240" rx="55" ry="85" fill="#fff" stroke-width="8" />
      <circle cx="175" cy="150" r="8" fill="#111827" />
      <circle cx="225" cy="150" r="8" fill="#111827" />
      <polygon points="190,170 210,170 200,185" fill="#111827" />
      <path d="M115 190 Q90 230 110 270" stroke-width="9" />
      <path d="M285 190 Q310 230 290 270" stroke-width="9" />
      <ellipse cx="165" cy="345" rx="25" ry="12" fill="#fff" />
      <ellipse cx="235" cy="345" rx="25" ry="12" fill="#fff" />
      <polygon points="190,205 200,212 210,205 200,198" fill="#111827" />
    </svg>`
  },

  // 35. Formaggio
  {
    id: 35,
    name: "Formaggio Coi Buchi",
    category: "Oggetti",
    word: "FORMAGGIO",
    guide: {
      vocabolario: "Giallo, saporito, buchi tondi. 'Topolino affamato!'",
      motricita: "Colorare i cerchi dei buchi con una tonalità più scura.",
      domandaAccessibile: "Chi è goloso di formaggio? Un topolino birichino!",
      consiglioGenitore: "Fate lo squittio del topolino 'Squik squik' per farlo ridere."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <polygon points="90,270 320,270 260,130 90,270" fill="#fff" stroke-width="10" />
      <polygon points="260,130 160,100 90,270" fill="#fff" stroke-width="9" />
      <circle cx="170" cy="220" r="22" fill="#fff" />
      <circle cx="240" cy="230" r="16" fill="#fff" />
      <circle cx="220" cy="170" r="14" fill="#fff" />
      <circle cx="130" cy="180" r="12" fill="#fff" />
      <circle cx="130" cy="255" r="10" fill="#fff" />
    </svg>`
  },

  // 36. Corona
  {
    id: 36,
    name: "Corona Reale",
    category: "Oggetti",
    word: "CORONA",
    guide: {
      vocabolario: "Re, regina, principe, principessa, perle lucenti d'oro.",
      motricita: "Disegnare cerchietti decorativi sopra ogni punta della corona.",
      domandaAccessibile: "Chi è il principino o principessa di casa? Tu!",
      consiglioGenitore: "Il gioco della regalità accresce l'autostima e la consapevolezza del sé."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <polygon points="80,280 320,280 330,160 270,220 200,120 130,220 70,160" fill="#fff" stroke-width="10" />
      <circle cx="70" cy="150" r="14" fill="#fff" />
      <circle cx="200" cy="105" r="16" fill="#fff" />
      <circle cx="330" cy="150" r="14" fill="#fff" />
      <rect x="80" y="270" width="240" height="30" rx="6" fill="#fff" stroke-width="8" />
      <circle cx="120" cy="285" r="7" fill="#111827" />
      <circle cx="160" cy="285" r="7" fill="#111827" />
      <circle cx="200" cy="285" r="7" fill="#111827" />
      <circle cx="240" cy="285" r="7" fill="#111827" />
      <circle cx="280" cy="285" r="7" fill="#111827" />
    </svg>`
  },

  // 37. Pizza
  {
    id: 37,
    name: "Fetta di Pizza",
    category: "Oggetti",
    word: "PIZZA",
    guide: {
      vocabolario: "Calda, pomodoro, mozzarella che fila, crosta croccante.",
      motricita: "Colorare i cerchi del salamino o dei pomodorini.",
      domandaAccessibile: "Ti piace la pizza? Mmm che profumino delizioso!",
      consiglioGenitore: "Parlare di cibo preferito crea conversazioni entusiaste e spontanee."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <polygon points="200,340 100,120 300,120" fill="#fff" stroke-width="9" />
      <path d="M90 120 Q200 90 310 120" stroke-width="14" stroke-linecap="round" />
      <circle cx="170" cy="180" r="18" fill="#fff" stroke-width="7" />
      <circle cx="230" cy="190" r="16" fill="#fff" stroke-width="7" />
      <circle cx="195" cy="260" r="15" fill="#fff" stroke-width="7" />
      <circle cx="150" cy="230" r="8" fill="#111827" />
      <circle cx="240" cy="245" r="8" fill="#111827" />
    </svg>`
  },

  // 38. Rana
  {
    id: 38,
    name: "Rana Salterina",
    category: "Animali",
    word: "RANA",
    guide: {
      vocabolario: "Cra cra! Verde, salta nello stagno, lingua veloce.",
      motricita: "Saltare sul posto ogni volta che pronunciate 'Cra cra!'.",
      domandaAccessibile: "Dove nuota la ranocchia? Tra le ninfee dell'acqua!",
      consiglioGenitore: "Il suono 'Cra cra' stimola le consonanti gutturali e la coordinazione linguale."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="200" cy="220" rx="95" ry="70" fill="#fff" stroke-width="10" />
      <circle cx="145" cy="140" r="35" fill="#fff" stroke-width="8" />
      <circle cx="255" cy="140" r="35" fill="#fff" stroke-width="8" />
      <circle cx="145" cy="140" r="12" fill="#111827" />
      <circle cx="255" cy="140" r="12" fill="#111827" />
      <path d="M140 230 Q200 270 260 230" stroke-width="8" />
      <ellipse cx="145" cy="295" rx="35" ry="16" fill="#fff" />
      <ellipse cx="255" cy="295" rx="35" ry="16" fill="#fff" />
    </svg>`
  },

  // 39. Gufo
  {
    id: 39,
    name: "Gufetto Saggio",
    category: "Animali",
    word: "GUFO",
    guide: {
      vocabolario: "Uhuuu! Occhioni grandi, veglia di notte, piume calde.",
      motricita: "Disegnare grandi cerchi con gli occhi sgranati.",
      domandaAccessibile: "Chi fa Uhuuu nel bosco buio? Il caro gufo!",
      consiglioGenitore: "Il verso prolungato 'Uhuuu' allena il controllo del soffio ed espirazione."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="200" cy="220" rx="80" ry="105" fill="#fff" stroke-width="10" />
      <polygon points="140,120 120,60 170,110" fill="#fff" />
      <polygon points="260,120 280,60 230,110" fill="#fff" />
      <circle cx="160" cy="170" r="32" fill="#fff" stroke-width="7" />
      <circle cx="240" cy="170" r="32" fill="#fff" stroke-width="7" />
      <circle cx="160" cy="170" r="14" fill="#111827" />
      <circle cx="240" cy="170" r="14" fill="#111827" />
      <polygon points="190,195 210,195 200,215" fill="#111827" />
      <path d="M165 250 Q200 270 235 250" stroke-width="6" />
      <line x1="100" y1="330" x2="300" y2="330" stroke-width="12" />
    </svg>`
  },

  // 40. Monopattino
  {
    id: 40,
    name: "Monopattino Sportivo",
    category: "Veicoli",
    word: "MONOPATTINO",
    guide: {
      vocabolario: "Spingi con il piedino! Veloce, manubrio dritto, ruote agili.",
      motricita: "Simulare il movimento di spinta del piede sul pavimento.",
      domandaAccessibile: "Dove sfrecciamo oggi? Sul viale dei giardini!",
      consiglioGenitore: "Il monopattino allena l'equilibrio e la lateralizzazione (piede dominante)."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="90" cy="300" r="35" fill="#fff" stroke-width="9" />
      <circle cx="90" cy="300" r="14" fill="#111827" />
      <circle cx="310" cy="300" r="35" fill="#fff" stroke-width="9" />
      <circle cx="310" cy="300" r="14" fill="#111827" />
      <line x1="90" y1="300" x2="280" y2="300" stroke-width="12" />
      <line x1="280" y1="300" x2="260" y2="100" stroke-width="10" />
      <line x1="210" y1="100" x2="310" y2="100" stroke-width="12" stroke-linecap="round" />
      <circle cx="210" cy="100" r="8" fill="#111827" />
      <circle cx="310" cy="100" r="8" fill="#111827" />
      <line x1="30" y1="345" x2="370" y2="345" stroke-width="8" />
    </svg>`
  },

  // 41. Arcobaleno (dallo screenshot!)
  {
    id: 41,
    name: "Arcobaleno Magico",
    category: "Natura",
    word: "ARCOBALENO",
    guide: {
      vocabolario: "Rosso, arancione, giallo, verde, blu, viola! Dopo la pioggia esce il sole.",
      motricita: "Tracciare grandi archi concentrici dall'estrema sinistra a destra.",
      domandaAccessibile: "Cosa c'è alle due estremità dell'arcobaleno? Morbide nuvolette!",
      consiglioGenitore: "Insegna i colori primari seguendo le fasce dell'arcobaleno."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M70 270 A140 140 0 0 1 330 270" stroke-width="12" />
      <path d="M95 270 A115 115 0 0 1 305 270" stroke-width="12" />
      <path d="M120 270 A90 90 0 0 1 280 270" stroke-width="12" />
      <path d="M145 270 A65 65 0 0 1 255 270" stroke-width="12" />
      <!-- Nuvoletta sinistra -->
      <path d="M40 280 C30 260 50 240 70 245 C80 230 110 230 120 250 C135 250 145 270 135 290 C120 305 50 305 40 280 Z" fill="#fff" stroke-width="7" />
      <!-- Nuvoletta destra -->
      <path d="M260 280 C250 260 270 240 290 245 C300 230 330 230 340 250 C355 250 365 270 355 290 C340 305 270 305 260 280 Z" fill="#fff" stroke-width="7" />
    </svg>`
  },

  // 42. Dinosauro
  {
    id: 42,
    name: "Dinosauro Buono",
    category: "Animali",
    word: "DINOSAURO",
    guide: {
      vocabolario: "ROAAAR! Collo lungo, zampone forti, coda grande.",
      motricita: "Colorare i triangoli della cresta lungo la schiena.",
      domandaAccessibile: "Come ruggisce il dinosauro buono? Fa un ruggito dolce!",
      consiglioGenitore: "I dinosauri affascinano tutti i bimbi e stimolano l'immaginazione fantastica."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M80 120 C80 70 130 70 140 110 C150 150 170 220 220 220 C270 220 310 260 330 300 C350 340 260 330 200 320 L160 320" stroke-width="10" fill="#fff" />
      <polygon points="130,95 145,80 145,100" fill="#111827" />
      <polygon points="145,120 160,105 160,125" fill="#111827" />
      <polygon points="160,150 175,135 175,155" fill="#111827" />
      <polygon points="175,180 190,165 190,185" fill="#111827" />
      <circle cx="105" cy="95" r="7" fill="#111827" />
      <path d="M90 120 Q105 130 120 120" stroke-width="6" />
      <rect x="160" y="270" width="35" height="90" rx="8" fill="#fff" />
      <rect x="235" y="270" width="35" height="90" rx="8" fill="#fff" />
    </svg>`
  },

  // 43. Occhiali
  {
    id: 43,
    name: "Occhiali da Sole",
    category: "Oggetti",
    word: "OCCHIALI",
    guide: {
      vocabolario: "Sole estivo, lenti scure, stanghette, mare e spiaggia.",
      motricita: "Colorare le due grandi lenti tondeggianti.",
      domandaAccessibile: "Cosa vedi attraverso gli occhiali? Un mondo fantastico!",
      consiglioGenitore: "Fate finta di indossare occhiali magici per vedere solo cose belle."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="60" y="160" width="115" height="95" rx="35" fill="#fff" stroke-width="10" />
      <rect x="225" y="160" width="115" height="95" rx="35" fill="#fff" stroke-width="10" />
      <path d="M175 190 Q200 175 225 190" stroke-width="10" />
      <path d="M60 190 L30 175" stroke-width="8" />
      <path d="M340 190 L370 175" stroke-width="8" />
      <line x1="85" y1="180" x2="115" y2="235" stroke-width="6" />
      <line x1="250" y1="180" x2="280" y2="235" stroke-width="6" />
    </svg>`
  },

  // 44. Ciliegie
  {
    id: 44,
    name: "Coppia di Ciliegie",
    category: "Oggetti",
    word: "CILIEGIE",
    guide: {
      vocabolario: "Rosse rosse, una tira l'altra, picciolo verde, estate dolce.",
      motricita: "Colorare i due cerchi tondi delle ciliegie gemelle.",
      domandaAccessibile: "Mettiamo le ciliegie come orecchini finti sulle orecchie?",
      consiglioGenitore: "Il classico gioco delle ciliegie sulle orecchie crea risate e complicità."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <circle cx="140" cy="270" r="55" fill="#fff" stroke-width="9" />
      <circle cx="260" cy="250" r="55" fill="#fff" stroke-width="9" />
      <path d="M140 215 C140 140 180 80 200 70" stroke-width="8" />
      <path d="M260 195 C260 130 220 80 200 70" stroke-width="8" />
      <path d="M200 70 Q240 40 260 55 Q245 80 200 70 Z" fill="#fff" />
      <circle cx="120" cy="250" r="10" fill="#fff" />
      <circle cx="240" cy="230" r="10" fill="#fff" />
    </svg>`
  },

  // 45. Lecca-Lecca (dallo screenshot!)
  {
    id: 45,
    name: "Lecca-Lecca a Spirale",
    category: "Oggetti",
    word: "LECCA-LECCA",
    guide: {
      vocabolario: "Slurp! Spirale colorata, bastoncino, dolce e zuccherato.",
      motricita: "Seguire la spirale dal centro verso l'esterno con la punta del dito.",
      domandaAccessibile: "Di quanti colori lo facciamo? Un arcobaleno di gusti!",
      consiglioGenitore: "I movimenti a spirale sviluppano la flessibilità del polso per la scrittura."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <line x1="200" y1="260" x2="200" y2="380" stroke-width="12" stroke-linecap="round" />
      <circle cx="200" cy="160" r="95" fill="#fff" stroke-width="10" />
      <path d="M200 160 A20 20 0 0 1 220 160 A40 40 0 0 1 180 160 A60 60 0 0 1 260 160 A80 80 0 0 1 140 160" stroke-width="8" />
      <polygon points="175,260 200,270 225,260 200,250" fill="#fff" stroke-width="6" />
    </svg>`
  },

  // 46. Autobus
  {
    id: 46,
    name: "Grande Autobus Urbano",
    category: "Veicoli",
    word: "AUTOBUS",
    guide: {
      vocabolario: "Le ruote del bus che girano! Tanti passeggeri a bordo.",
      motricita: "Colorare i grandi finestrini quadrati uno per uno.",
      domandaAccessibile: "Chi guida il bus? L'autista simpatico!",
      consiglioGenitore: "Cantate la canzoncina 'Le ruote del bus che girano girano girano'."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="50" y="120" width="300" height="150" rx="20" fill="#fff" stroke-width="10" />
      <rect x="75" y="145" width="55" height="50" rx="8" fill="#fff" stroke-width="7" />
      <rect x="145" y="145" width="55" height="50" rx="8" fill="#fff" stroke-width="7" />
      <rect x="215" y="145" width="55" height="50" rx="8" fill="#fff" stroke-width="7" />
      <rect x="285" y="145" width="50" height="50" rx="8" fill="#fff" stroke-width="7" />
      <circle cx="115" cy="270" r="35" fill="#fff" stroke-width="9" />
      <circle cx="115" cy="270" r="14" fill="#111827" />
      <circle cx="285" cy="270" r="35" fill="#fff" stroke-width="9" />
      <circle cx="285" cy="270" r="14" fill="#111827" />
      <line x1="30" y1="315" x2="370" y2="315" stroke-width="8" />
    </svg>`
  },

  // 47. Tucano
  {
    id: 47,
    name: "Tucano Tropicale",
    category: "Animali",
    word: "TUCANO",
    guide: {
      vocabolario: "Giungla, becco gigante super colorato, piume nere e bianche.",
      motricita: "Colorare il grande becco a fasce con colori tropicali.",
      domandaAccessibile: "Quanto è lungo il becco del tucano? Più grande della testa!",
      consiglioGenitore: "Mostrate foto della foresta pluviale per ampliare le conoscenze geografiche."
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <ellipse cx="230" cy="220" rx="55" ry="90" fill="#fff" stroke-width="9" />
      <circle cx="220" cy="140" r="45" fill="#fff" stroke-width="9" />
      <path d="M195 120 C110 100 50 140 60 180 C110 180 170 170 195 160 Z" fill="#fff" stroke-width="9" />
      <path d="M110 120 L110 175" stroke-width="7" />
      <circle cx="205" cy="135" r="7" fill="#111827" />
      <line x1="120" y1="310" x2="330" y2="310" stroke-width="12" />
      <path d="M260 280 L290 360 L260 360" stroke-width="8" />
    </svg>`
  },

  // 48. Tavolozza
  {
    id: 48,
    name: "Tavolozza dell'Artista",
    category: "Forme",
    word: "TAVOLOZZA",
    guide: {
      vocabolario: "Pennello, colori a tempera, artista geniale, capolavoro!",
      motricita: "Mettere il dito nel foro della tavolozza come un vero pittore.",
      domandaAccessibile: "Cosa dipingiamo adesso? Un quadro per la nonna!",
      consiglioGenitore: "Festeggiate l'ultimo disegno del libro: il bambino è ora un vero artista diplomato!"
    },
    svg: `<svg viewBox="0 0 400 400" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" stroke="#111827" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M200 80 C90 80 60 160 80 250 C100 330 180 340 240 330 C270 325 290 300 280 270 C270 240 310 230 330 210 C360 170 310 80 200 80 Z" fill="#fff" stroke-width="10" />
      <circle cx="255" cy="275" r="16" fill="#fff" stroke-width="8" />
      <circle cx="130" cy="140" r="18" fill="#fff" stroke-width="7" />
      <circle cx="190" cy="120" r="18" fill="#fff" stroke-width="7" />
      <circle cx="255" cy="135" r="18" fill="#fff" stroke-width="7" />
      <circle cx="115" cy="210" r="18" fill="#fff" stroke-width="7" />
      <circle cx="140" cy="275" r="18" fill="#fff" stroke-width="7" />
      <path d="M70 330 L320 80" stroke-width="12" stroke-linecap="round" />
      <polygon points="65,335 50,355 80,350" fill="#111827" />
    </svg>`
  }
];
