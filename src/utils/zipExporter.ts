/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * In-browser Project ZIP Exporter
 * Bundles the entire clean source code into a zip file for local extraction.
 */

import JSZip from 'jszip';

// Import raw source files directly via Vite ?raw loader
import rawPackageJson from '../../package.json?raw';
import rawTsconfig from '../../tsconfig.json?raw';
import rawViteConfig from '../../vite.config.ts?raw';
import rawIndexHtml from '../../index.html?raw';
import rawReadme from '../../README.md?raw';
import rawLicense from '../../LICENSE?raw';
import rawGitignore from '../../.gitignore?raw';

import rawMainTsx from '../main.tsx?raw';
import rawIndexCss from '../index.css?raw';
import rawAppTsx from '../App.tsx?raw';
import rawBenfordEngine from './benfordEngine.ts?raw';

import rawHeader from '../components/Header.tsx?raw';
import rawBenfordChart from '../components/BenfordChart.tsx?raw';
import rawCanvasViewer from '../components/ForensicCanvasViewer.tsx?raw';
import rawPixelInspector from '../components/PixelInspector.tsx?raw';
import rawPresetSelector from '../components/PresetSelector.tsx?raw';
import rawEducationalGuide from '../components/EducationalGuide.tsx?raw';
import rawMethodsComparison from '../components/MethodsComparison.tsx?raw';
import rawFaqSection from '../components/FaqSection.tsx?raw';
import rawGitHubModal from '../components/GitHubModal.tsx?raw';

export async function exportProjectZip(onProgress?: (percent: number, status: string) => void): Promise<void> {
  const zip = new JSZip();

  onProgress?.(10, 'Aggiunta file di configurazione...');

  // Root configuration files
  zip.file('package.json', rawPackageJson);
  zip.file('tsconfig.json', rawTsconfig);
  zip.file('vite.config.ts', rawViteConfig);
  zip.file('index.html', rawIndexHtml);
  zip.file('README.md', rawReadme);
  zip.file('LICENSE', rawLicense);
  zip.file('.gitignore', rawGitignore);

  onProgress?.(30, 'Aggiunta codice sorgente React & TypeScript...');

  // src root
  const src = zip.folder('src');
  if (src) {
    src.file('main.tsx', rawMainTsx);
    src.file('index.css', rawIndexCss);
    src.file('App.tsx', rawAppTsx);

    // src/utils
    const utils = src.folder('utils');
    if (utils) {
      utils.file('benfordEngine.ts', rawBenfordEngine);
    }

    // src/components
    const components = src.folder('components');
    if (components) {
      components.file('Header.tsx', rawHeader);
      components.file('BenfordChart.tsx', rawBenfordChart);
      components.file('ForensicCanvasViewer.tsx', rawCanvasViewer);
      components.file('PixelInspector.tsx', rawPixelInspector);
      components.file('PresetSelector.tsx', rawPresetSelector);
      components.file('EducationalGuide.tsx', rawEducationalGuide);
      components.file('MethodsComparison.tsx', rawMethodsComparison);
      components.file('FaqSection.tsx', rawFaqSection);
      components.file('GitHubModal.tsx', rawGitHubModal);
    }
  }

  onProgress?.(60, 'Inclusione immagini di test ed asset...');

  // Helper to fetch image binary and add to zip
  const addImageToZip = async (url: string, zipPath: string) => {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const blob = await resp.blob();
        zip.file(zipPath, blob);
      }
    } catch (e) {
      console.warn('Could not fetch asset for zip:', url, e);
    }
  };

  await Promise.all([
    addImageToZip('/public/assets/aistudio/Infinity__Eroe_del_Workshop_Automotive_2d19a99b.png', 'public/assets/aistudio/Infinity__Eroe_del_Workshop_Automotive_2d19a99b.png'),
    addImageToZip('/src/assets/images/sample_authentic_photo_1793865616112.jpg', 'src/assets/images/sample_authentic_photo_1793865616112.jpg'),
    addImageToZip('/src/assets/images/sample_ai_generated_1793865615859.jpg', 'src/assets/images/sample_ai_generated_1793865615859.jpg'),
    addImageToZip('/src/assets/images/sample_manipulated_edit_1793865616070.jpg', 'src/assets/images/sample_manipulated_edit_1793865616070.jpg'),
  ]);

  onProgress?.(85, 'Generazione archivio ZIP compresso...');

  const content = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    if (onProgress) {
      onProgress(85 + Math.round(metadata.percent * 0.14), `Compressione: ${Math.round(metadata.percent)}%`);
    }
  });

  onProgress?.(100, 'Avvio del download nel browser...');

  // Trigger browser download
  const blobUrl = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = 'benford-forensics-source.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
