import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateKdpRoyalty,
  calculateCoverDimensions,
  validateKdpListing,
} from './kdpCalculations';

test('calculateKdpRoyalty computes correct print cost and net profit for 102 pages at 7.99 €', () => {
  const result = calculateKdpRoyalty(7.99, 102, false);
  // Fixed cost: 0.60 + 102 * 0.012 = 1.824 -> 1.82 €
  assert.equal(result.fixedCostEur, 0.6);
  assert.equal(result.totalPrintCostEur, 1.82);
  // 60% gross royalty of 7.99 = 4.794 -> 4.79 €
  assert.equal(result.grossRoyaltyEur, 4.79);
  // Net profit = 4.79 - 1.82 = 2.97 €
  assert.equal(result.netProfitEur, 2.97);
  // Ensure margin is healthy (> 30%)
  assert.ok(result.profitMarginPercent > 35);
  // Minimum list price must be lower than 7.99 €
  assert.ok(result.minimumListPriceEur < 7.99);
});

test('calculateKdpRoyalty works at 6.99 € target price', () => {
  const result = calculateKdpRoyalty(6.99, 102, false);
  assert.equal(result.totalPrintCostEur, 1.82);
  // 60% of 6.99 = 4.194 -> 4.19 €
  assert.equal(result.grossRoyaltyEur, 4.19);
  // Net profit = 4.19 - 1.82 = 2.37 €
  assert.equal(result.netProfitEur, 2.37);
  assert.ok(result.netProfitEur > 2.0);
});

test('calculateCoverDimensions gives exact spine width matching Amazon KDP ~0.58cm for 102 pages', () => {
  const specs = calculateCoverDimensions(102, 8.5, 11.0, 'white');
  // 102 * 0.002252 = ~0.23 inches (~5.8 mm, i.e. 0.58 cm)
  assert.ok(specs.spineWidthMm >= 5.5 && specs.spineWidthMm <= 6.0);
  assert.ok(specs.spineWidthInches >= 0.22 && specs.spineWidthInches <= 0.24);
  // Full cover width = 8.5 * 2 + 0.25 (bleed) + 0.23 = ~17.48"
  assert.ok(specs.totalCoverWidthInches > 17.4 && specs.totalCoverWidthInches < 17.6);
  // Full cover height = 11.0 + 0.25 = 11.25"
  assert.equal(specs.totalCoverHeightInches, 11.25);
});

test('validateKdpListing enforces Amazon KDP title and keyword limits', () => {
  const valid = validateKdpListing(
    'Il Mio Grande Libro da Colorare per Bambini',
    '100 Divertenti disegni con immagini facili da colorare',
    'Questo è un fantastico libro da colorare con linee spesse per bambini da 1 a 4 anni. '.repeat(10),
    ['libro da colorare bambini', 'linee spesse 1 anno', 'primi disegni']
  );
  assert.equal(valid.isValid, true);
  assert.equal(valid.errors.length, 0);

  const invalid = validateKdpListing(
    '', // empty title
    '',
    '', // empty description
    ['1', '2', '3', '4', '5', '6', '7', '8'] // 8 keywords (> 7)
  );
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.length >= 3);
});

test('buildCompleteBook generates exactly 102 pages with single-sided illustration layout', async () => {
  const { buildCompleteBook } = await import('../data/bookContent');
  const pages = buildCompleteBook();
  assert.equal(pages.length, 102);
  assert.equal(pages[0].pageNumber, 1);
  assert.equal(pages[101].pageNumber, 102);

  // Check that front matter and back matter exist
  assert.equal(pages[0].type, 'half-title');
  assert.equal(pages[1].type, 'title');
  assert.equal(pages[2].type, 'belongs-to');
  assert.equal(pages[3].type, 'guide-intro');
  assert.equal(pages[100].type, 'certificate');
  assert.equal(pages[101].type, 'author-note');

  // Verify odd pages are illustrations and even pages are blank-back
  const firstDrawing = pages[4]; // page 5
  assert.equal(firstDrawing.type, 'illustration');
  assert.ok(firstDrawing.practicalGuide !== undefined);

  const firstBack = pages[5]; // page 6
  assert.equal(firstBack.type, 'blank-back');
});

test('buildCompleteBook has 48 strictly unique illustrations with zero repetition', async () => {
  const { buildCompleteBook } = await import('../data/bookContent');
  const pages = buildCompleteBook();
  const illustrations = pages.filter((p) => p.type === 'illustration');
  assert.equal(illustrations.length, 48);

  const uniqueWords = new Set(illustrations.map((p) => p.wordLabel));
  const uniqueNames = new Set(illustrations.map((p) => p.title));
  const uniqueSvgs = new Set(illustrations.map((p) => p.svgData));

  // Verify all 48 are completely distinct
  assert.equal(uniqueWords.size, 48, 'All 48 word labels must be completely unique');
  assert.equal(uniqueNames.size, 48, 'All 48 titles must be completely unique');
  assert.equal(uniqueSvgs.size, 48, 'All 48 SVGs must be completely unique');
});

