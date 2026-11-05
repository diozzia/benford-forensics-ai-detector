import React, { useState } from 'react';
import { BookPage } from '../data/bookContent';
import { Search, Eye, Palette } from 'lucide-react';

interface PageGridProps {
  pages: BookPage[];
  onSelectPage: (pageNumber: number) => void;
  onColorPage: (page: BookPage) => void;
}

export const PageGrid: React.FC<PageGridProps> = ({
  pages,
  onSelectPage,
  onColorPage,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPages = pages.filter((page) => {
    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'Editoriale' && page.type !== 'illustration') ||
      page.category === filterCategory;

    const matchesSearch =
      searchQuery === '' ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.wordLabel && page.wordLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (page.notes && page.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-4">
      {/* Search and Filters Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca disegno, parola o tipo pagina..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: `Tutte le ${pages.length} Pagine` },
            { id: 'Animali', label: 'Animali' },
            { id: 'Veicoli', label: 'Veicoli' },
            { id: 'Natura', label: 'Natura' },
            { id: 'Oggetti', label: 'Oggetti' },
            { id: 'Editoriale', label: 'Guide & Extra' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            {/* Top Badge: Page Number */}
            <div className="flex items-center justify-between p-2 text-[10px] border-b border-slate-100 bg-slate-50">
              <span className="font-mono font-bold text-slate-700">p. {page.pageNumber}</span>
              <span className="text-slate-400 font-medium truncate max-w-[80px]">
                {page.category || page.type}
              </span>
            </div>

            {/* Thumbnail Canvas */}
            <div
              onClick={() => onSelectPage(page.pageNumber)}
              className="p-3 aspect-[8.5/11] flex items-center justify-center cursor-pointer bg-slate-50/30 group-hover:bg-amber-50/10 transition-colors"
            >
              {page.type === 'illustration' ? (
                <div
                  className="w-full h-full max-h-[120px] flex items-center justify-center pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: page.svgData || '' }}
                />
              ) : page.type === 'blank-back' ? (
                <div className="text-center p-2 text-[10px] text-slate-400 italic">
                  Retro Protettivo
                </div>
              ) : page.type === 'certificate' ? (
                <div className="text-center p-2 text-[10px] font-bold text-amber-700 border-2 border-dashed border-amber-300 rounded-lg">
                  🏆 Attestato Finale
                </div>
              ) : page.type === 'guide-intro' ? (
                <div className="text-center p-2 text-[10px] font-bold text-emerald-800 bg-emerald-50 rounded-lg">
                  📘 Guida Pratica Genitori
                </div>
              ) : (
                <div className="text-center p-2 text-[10px] font-semibold text-slate-600">
                  {page.title}
                </div>
              )}
            </div>

            {/* Bottom details */}
            <div className="p-2 border-t border-slate-100 bg-white">
              <div className="text-[11px] font-bold text-slate-800 truncate mb-1">
                {page.wordLabel || page.title}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectPage(page.pageNumber)}
                  className="flex-1 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  Vedi
                </button>
                {page.type === 'illustration' && (
                  <button
                    onClick={() => onColorPage(page)}
                    title="Colora questa pagina"
                    className="p-1 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition-colors"
                  >
                    <Palette className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          Nessuna pagina trovata per i criteri cercati.
        </div>
      )}
    </div>
  );
};
