# BenfordForensics 🔬🔍
### Analisi Forense di Immagini Digitali & Rilevamento Sintesi AI con la Legge di Benford

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)

**BenfordForensics** è un'applicazione scientifica open source interattiva per l'analisi forense delle immagini digitali (*Digital Image Forensics*). Permette di verificare l'autenticità di fotografie ottiche e smascherare manipolazioni digitali, fotomontaggi (splicing) e immagini sintetizzate da modelli di intelligenza artificiale generativa (Midjourney, DALL-E, Stable Diffusion, Flux) attraverso l'applicazione rigorosa della **Legge di Benford** (*First-Digit Law*).

---

## 📖 Indice
- [Il Principio Scientifico: La Legge di Benford](#-il-principio-scientifico-la-legge-di-benford)
- [Perché i Pixel RGB Grezzi (0-255) non funzionano?](#-perché-i-pixel-rgb-grezzi-0-255-non-funzionano)
- [Metodi Matematici Implementati](#-metodi-matematici-implementati)
- [Come l'AI Generativa Viola la Legge di Benford](#-come-lai-generativa-viola-la-legge-di-benford)
- [Caratteristiche Principali](#-caratteristiche-principali)
- [Guida all'Installazione ed Esecuzione Locale](#-guida-allinstallazione-ed-esecuzione-locale)
- [Come Pubblicare su GitHub](#-come-pubblicare-su-github)
- [Deploy Gratuito (GitHub Pages / Vercel / Netlify)](#-deploy-gratuito)
- [Riferimenti Bibliografici](#-riferimenti-bibliografici)
- [Licenza](#-licenza)

---

## 🔬 Il Principio Scientifico: La Legge di Benford

La **Legge di Benford** stabilisce che in collezioni naturali di dati non vincolati la probabilità che un numero inizi con una specifica cifra $d \in \{1, 2, \dots, 9\}$ segue la curva logaritmica:

$$P(d) = \log_{10}\left(1 + \frac{1}{d}\right)$$

| Cifra ($d$) | Probabilità Teorica ($P(d)$) |
|:-----------:|:----------------------------:|
| **1**       | **30.10%**                   |
| **2**       | **17.61%**                   |
| **3**       | **12.49%**                   |
| **4**       | **9.69%**                    |
| **5**       | **7.92%**                    |
| **6**       | **6.69%**                    |
| **7**       | **5.80%**                    |
| **8**       | **5.12%**                    |
| **9**       | **4.58%**                    |

---

## 🚫 Perché i Pixel RGB Grezzi (0-255) non funzionano?

Se si prova a estrarre la prima cifra dai numeri interi di colore $R, G, B \in [0, 255]$:
1. **Distorsione del dominio a 8-bit**: i numeri che iniziano per **1** sono $1, 10\dots19, 100\dots199$ (ben **111 su 256, pari al 43.3%**). Quelli che iniziano per **9** sono solo $9, 90\dots99$ (solo **11 su 256, pari al 4.3%**).
2. **Mancanza di invarianza di scala**: la legge di Benford richiede che i dati spazino su più ordini di grandezza (es. da $0.001$ a $1000$) con distribuzioni a coda pesante (*heavy-tailed*).

---

## 📐 Metodi Matematici Implementati

BenfordForensics trasforma le proprietà dei pixel tramite operatori differenziali e di frequenza continui prima di estrarne la prima cifra significativa:

1. **Crominanza $C_b$ e $C_r$ (Anti-AI Specialized)**:
   $$C_b = -0.1687 R - 0.3313 G + 0.5 B$$
   Nei modelli di diffusione (Midjourney / DALL-E), il colore decodificato dallo spazio latente compresso mostra un'omogeneità microscopica artificiale che distrugge la statistica naturale, portando il MAD a valori critici (> 5.0%).
2. **Magnitudo del Gradiente Spaziale ($|\nabla I|$)**:
   Differenze finite di luminosità tra pixel contigui (Sobel). Nelle foto reali riflette le statistiche di scene naturali (NSS).
3. **Residuo ad Alta Frequenza / Filtro Laplaciano ($\nabla^2 I$)**:
   Estrae il rumore termico e fotoelettronico (*shot noise* di Poisson e PRNU) del sensore fisico CMOS/CCD.
4. **Coefficienti AC della Trasformata Coseno Discreta (DCT 8×8)**:
   Lo standard scientifico per la verifica di compressione e manomissione JPEG (*Fu et al., 2007*).
5. **Deviazione Standard della Tessitura Locale ($\sigma_{3\times3}$)**:
   Misura l'entropia della texture microscopica su finestre mobili.
6. **Mappa delle Anomalie a Blocchi 48×48 (Grid MAD)**:
   Analizza localmente ogni patch di $48\times 48$ pixel per evidenziare selettivamente le aree generate da AI o incollate rispetto allo sfondo.

### Metriche di Valutazione Forense
- **MAD (Mean Absolute Deviation)**:
  $$\text{MAD} = \frac{1}{9}\sum_{d=1}^9 |f_d - P(d)| \times 100\%$$
  - $\text{MAD} < 0.65\%$: **Autentica** (alta conformità ottica naturale)
  - $0.65\% \le \text{MAD} < 1.25\%$: **Conforme** (compatibile con foto reale)
  - $1.25\% \le \text{MAD} < 1.80\%$: **Sospetta** (possibile post-produzione / ritocco)
  - $\text{MAD} \ge 1.80\%$: **Non Conforme** (probabile AI o manipolazione digitale)
- **Test del Chi-Quadro ($\chi^2$)** con 8 gradi di libertà e relativo p-value.
- **Indice Composito di Sintesi AI (0–100%)**: fusione multi-fattoriale con rilevatore di inquinamento da layout tipografico.

---

## 🛠️ Guida all'Installazione ed Esecuzione Locale

### Prerequisiti
- **Node.js** versione 18 o superiore
- **npm** (incluso in Node.js) o **bun** / **pnpm**

### 1. Clona il repository o scarica i file
```bash
git clone https://github.com/TUO-USERNAME/benford-forensics-ai-detector.git
cd benford-forensics-ai-detector
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Avvia il server di sviluppo
```bash
npm run dev
```
Apri il browser su `http://localhost:3000` (o la porta indicata nel terminale).

### 4. Compila per la produzione
```bash
npm run build
```
La cartella `dist/` conterrà la versione ottimizzata pronta per qualsiasi hosting statico.

---

## 🚀 Come Pubblicare su GitHub

Segui questi passaggi per pubblicare il software sul tuo profilo GitHub:

1. **Crea un nuovo repository su GitHub**:
   - Vai su [github.com/new](https://github.com/new)
   - Nome repository: `benford-forensics-ai-detector` (o quello che preferisci)
   - Descrizione: *Laboratorio scientifico di analisi forense per immagini e rilevamento AI basato sulla Legge di Benford*
   - Imposta come **Public**
   - **Non** spuntare "Add README" o "Add .gitignore" (sono già presenti nel progetto!)
   - Clicca **Create repository**

2. **Inizializza e carica il codice dal terminale**:
   Nella cartella del tuo progetto:
   ```bash
   # Inizializza il repository git locale
   git init

   # Aggiungi tutti i file
   git add .

   # Crea il commit iniziale
   git commit -m "feat: initial open source release of BenfordForensics"

   # Rinomina il branch in main
   git branch -M main

   # Collega il repository remoto di GitHub (sostituisci col tuo link)
   git remote add origin https://github.com/TUO-USERNAME/benford-forensics-ai-detector.git

   # Esegui il push
   git push -u origin main
   ```

---

## 🌐 Deploy Gratuito

Puoi pubblicare l'applicazione online gratuitamente in 2 minuti:

### Opzione A: Vercel (Consigliato - 1 Click)
1. Vai su [vercel.com](https://vercel.com) e accedi con GitHub.
2. Clicca **Add New Project** e seleziona il tuo repository `benford-forensics-ai-detector`.
3. Vercel riconosce automaticamente Vite: clicca **Deploy**. Fatto!

### Opzione B: GitHub Pages
1. Installa `gh-pages`:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Aggiungi in `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Nel file `vite.config.ts`, aggiungi `base: '/benford-forensics-ai-detector/'`.
4. Esegui:
   ```bash
   npm run deploy
   ```

---

## 📚 Riferimenti Bibliografici

1. **Fu, D., Shi, Y. Q., & Su, W. (2007)**. *A generalized Benford's law for JPEG coefficients and its applications in image forensics*. SPIE Security, Steganography, and Watermarking of Multimedia Contents IX.
2. **Pevný, T., & Fridrich, J. (2008)**). *Detection of double-compression in JPEG images for applications in steganography*. IEEE Transactions on Information Forensics and Security.
3. **Nigrini, M. J. (2012)**. *Benford's Law: Applications for Forensic Accounting, Auditing, and Fraud Detection*. John Wiley & Sons.
4. **Corvi, R., Cozzolino, D., Zingarini, G., Poggi, G., Nagano, K., & Verdoliva, L. (2023)**. *On the detection of synthetic images generated by diffusion models*. IEEE ICASSP.

---

## 📄 Licenza

Distribuito sotto licenza **MIT**. Consulta il file [LICENSE](LICENSE) per ulteriori dettagli.
Creato con passione per l'integrità scientifica dell'informazione visiva.
