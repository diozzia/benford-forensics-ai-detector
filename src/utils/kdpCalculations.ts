/**
 * KDP Calculations and Validation Utilities
 * Reference: Amazon KDP Print On Demand Specifications
 */

export interface KdpPricingResult {
  listPrice: number;
  pageCount: number;
  fixedCostEur: number;
  perPageCostEur: number;
  totalPrintCostEur: number;
  royaltyRate: number; // 0.60 (60%)
  grossRoyaltyEur: number;
  netProfitEur: number;
  profitMarginPercent: number;
  minimumListPriceEur: number;
}

export interface KdpCoverSpecs {
  pageCount: number;
  trimWidthInches: number; // e.g. 8.5
  trimHeightInches: number; // e.g. 11.0
  bleedInches: number; // 0.125
  spineWidthInches: number;
  spineWidthMm: number;
  totalCoverWidthInches: number;
  totalCoverHeightInches: number;
  totalCoverWidthMm: number;
  totalCoverHeightMm: number;
  safetyMarginInches: number;
}

export interface KdpValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Calculates Amazon KDP Paperback printing cost and net author royalty
 * for Amazon.it / EU marketplace (standard black & white interior on white paper)
 */
export function calculateKdpRoyalty(
  listPriceEur: number,
  pageCount: number,
  isColor: boolean = false
): KdpPricingResult {
  const safePages = Math.max(24, Math.round(pageCount));
  const royaltyRate = 0.6; // 60% standard KDP distribution

  // Standard KDP EU (Amazon.it / Amazon.de / Amazon.fr) B&W rates:
  // Base fixed cost = 0.60 €; per page = 0.012 € for B&W regular trim
  // Color interior is fixed 0.60 € + 0.038 € / page (standard color) or 0.065 € (premium)
  const fixedCostEur = 0.6;
  const perPageCostEur = isColor ? 0.045 : 0.012;

  const totalPrintCostEur = Number(
    (fixedCostEur + safePages * perPageCostEur).toFixed(2)
  );

  // Minimum list price = Print cost / 0.60
  const minimumListPriceEur = Number((totalPrintCostEur / 0.6).toFixed(2));

  const grossRoyaltyEur = Number((listPriceEur * royaltyRate).toFixed(2));
  const netProfitEur = Number(
    Math.max(0, grossRoyaltyEur - totalPrintCostEur).toFixed(2)
  );
  const profitMarginPercent =
    listPriceEur > 0
      ? Number(((netProfitEur / listPriceEur) * 100).toFixed(1))
      : 0;

  return {
    listPrice: listPriceEur,
    pageCount: safePages,
    fixedCostEur,
    perPageCostEur,
    totalPrintCostEur,
    royaltyRate,
    grossRoyaltyEur,
    netProfitEur,
    profitMarginPercent,
    minimumListPriceEur,
  };
}

/**
 * Calculates KDP Full Wrap Cover dimensions including spine and 0.125" bleed
 * Standard white paper thickness is ~0.002252 inches (0.0572 mm) per page.
 */
export function calculateCoverDimensions(
  pageCount: number,
  trimWidthInches: number = 8.5,
  trimHeightInches: number = 11.0,
  paperType: 'white' | 'cream' = 'white'
): KdpCoverSpecs {
  const safePages = Math.max(24, Math.round(pageCount));
  const pageThicknessInches = paperType === 'white' ? 0.002252 : 0.0025;
  const bleedInches = 0.125;
  const safetyMarginInches = 0.25;

  const spineWidthInches = Number(
    (safePages * pageThicknessInches).toFixed(4)
  );
  const spineWidthMm = Number((spineWidthInches * 25.4).toFixed(2));

  // Full Cover Width = Bleed + Back Cover + Spine + Front Cover + Bleed
  const totalCoverWidthInches = Number(
    (bleedInches + trimWidthInches + spineWidthInches + trimWidthInches + bleedInches).toFixed(3)
  );
  // Full Cover Height = Bleed + Height + Bleed
  const totalCoverHeightInches = Number(
    (bleedInches + trimHeightInches + bleedInches).toFixed(3)
  );

  const totalCoverWidthMm = Number((totalCoverWidthInches * 25.4).toFixed(1));
  const totalCoverHeightMm = Number((totalCoverHeightInches * 25.4).toFixed(1));

  return {
    pageCount: safePages,
    trimWidthInches,
    trimHeightInches,
    bleedInches,
    spineWidthInches,
    spineWidthMm,
    totalCoverWidthInches,
    totalCoverHeightInches,
    totalCoverWidthMm,
    totalCoverHeightMm,
    safetyMarginInches,
  };
}

/**
 * Validates metadata according to Amazon KDP rules
 */
export function validateKdpListing(
  title: string,
  subtitle: string,
  description: string,
  keywords: string[]
): KdpValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!title.trim()) {
    errors.push('Il titolo principale è obbligatorio.');
  } else if (title.length > 200) {
    errors.push('Il titolo non può superare 200 caratteri (KDP limit).');
  }

  if (subtitle.length > 200) {
    errors.push('Il sottotitolo non può superare 200 caratteri.');
  }

  if (!description.trim()) {
    errors.push('La descrizione del libro è obbligatoria.');
  } else if (description.length > 4000) {
    errors.push('La descrizione supera il limite di 4000 caratteri KDP.');
  } else if (description.length < 300) {
    warnings.push('Una descrizione troppo corta (<300 caratteri) riduce le conversioni di vendita.');
  }

  if (keywords.length > 7) {
    errors.push('Amazon KDP consente al massimo 7 parole chiave di ricerca.');
  }

  keywords.forEach((kw, index) => {
    const byteLength = new TextEncoder().encode(kw).length;
    if (byteLength > 50) {
      warnings.push(`La parola chiave #${index + 1} supera i 50 byte consigliati da Amazon.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
