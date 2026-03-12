'use client';

import { useState, useEffect } from 'react';
import { getBookById } from '@/lib/bible-books';

interface Paper {
  paperId: string;
  title: string;
  abstract?: string;
  year?: number;
  citationCount?: number;
  authors?: { name: string }[];
  url?: string;
}

interface PubMedResult {
  id: string;
  title: string;
  authors: string[];
  year: string;
  journal: string;
  url: string;
}

export default function ResearchPanel({ book, chapter, verse }: { book: number; chapter: number; verse: number }) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [pubmed, setPubmed] = useState<PubMedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'scholar' | 'pubmed' | 'resources'>('ai');

  const bookInfo = getBookById(book);
  const bookName = bookInfo?.name || '';
  const ref = `${bookName} ${chapter}:${verse}`;
  const searchQuery = `Bible ${bookName} chapter ${chapter} verse ${verse}`;

  const fetchScholar = async () => {
    if (papers.length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/research?q=${encodeURIComponent(searchQuery + ' biblical scholarship')}&source=semanticscholar&limit=8`);
      const data = await res.json();
      setPapers(data.data || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const fetchPubMed = async () => {
    if (pubmed.length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/research?q=${encodeURIComponent(searchQuery + ' archaeology')}&source=pubmed&limit=8`);
      const data = await res.json();
      setPubmed(data.results || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'scholar') fetchScholar();
    if (activeTab === 'pubmed') fetchPubMed();
  }, [activeTab]);

  // AI research queries
  const aiQueries = [
    { label: '🏛️ Archaeological evidence', query: `Find archaeological evidence and discoveries related to ${ref} in the Bible` },
    { label: '📚 Scholarly analysis', query: `What do biblical scholars say about ${ref}? Include different perspectives and interpretations` },
    { label: '🏺 Historical context', query: `What is the historical context of ${ref}? What was happening in the ancient Near East at this time?` },
    { label: '🔤 Linguistic analysis', query: `Linguistic analysis of key terms in ${ref} including original Hebrew or Greek meanings` },
    { label: '📜 Textual criticism', query: `What are the textual variants and manuscript differences for ${ref}?` },
    { label: '🗺️ Geography', query: `Where did the events of ${ref} take place? Describe the geographical and archaeological setting` },
    { label: '⛪ Patristic commentary', query: `What did early Church Fathers say about ${ref}? Include commentaries from Augustine, Chrysostom, Jerome, and others` },
    { label: '🔄 Intertextuality', query: `How does ${ref} connect to other passages in the Bible? Show thematic and literary connections` },
  ];

  const aiLinks = (query: string) => [
    { name: 'Perplexity', url: `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`, icon: '🔍' },
    { name: 'ChatGPT', url: `https://chat.openai.com/?q=${encodeURIComponent(query)}`, icon: '🤖' },
    { name: 'Claude', url: `https://claude.ai/new?q=${encodeURIComponent(query)}`, icon: '🧠' },
    { name: 'Google Scholar', url: `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`, icon: '🎓' },
    { name: 'JSTOR', url: `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(query)}`, icon: '📖' },
  ];

  // External resource links
  const resourceLinks = [
    { name: 'OpenAlex', url: `https://openalex.org/works?search=${encodeURIComponent(searchQuery + ' biblical')}`, icon: '📊', desc: 'Open scholarly metadata' },
    { name: 'CrossRef', url: `https://search.crossref.org/?q=${encodeURIComponent(searchQuery + ' biblical')}&from_ui=yes`, icon: '🔗', desc: 'DOI-linked articles' },
    { name: 'Bible Hub', url: `https://biblehub.com/${bookName?.toLowerCase().replace(/ /g, '_')}/${chapter}-${verse}.htm`, icon: '📖', desc: 'Commentaries & lexicon' },
    { name: 'Blue Letter Bible', url: `https://www.blueletterbible.org/search/search.cfm?Criteria=${encodeURIComponent(ref)}&t=KJV`, icon: '🔵', desc: 'Interlinear & word study' },
    { name: 'NET Bible', url: `https://netbible.org/bible/${bookName?.replace(/ /g, '+')}+${chapter}`, icon: '🌐', desc: 'Translation notes' },
    { name: 'STEP Bible', url: `https://www.stepbible.org/?q=reference=${encodeURIComponent(ref)}|version=ESV`, icon: '📚', desc: 'Multi-resource lookup' },
    { name: 'Mechon Mamre', url: 'https://www.mechon-mamre.org/', icon: '🕎', desc: 'Hebrew Bible (Tanakh)' },
    { name: 'Perseus Digital Library', url: `https://www.perseus.tufts.edu/hopper/searchresults?q=${encodeURIComponent(bookName || '')}`, icon: '🏛️', desc: 'Greek & Latin texts' },
    { name: 'INTF (NT Manuscripts)', url: 'https://ntvmr.uni-muenster.de/home', icon: '📜', desc: 'NT manuscript transcripts' },
    { name: 'Logeion', url: `https://logeion.uchicago.edu/`, icon: '📕', desc: 'Greek & Latin lexicon' },
  ];

  return (
    <div className="space-y-3">
      {/* Tab bar */}
      <div className="flex gap-1 bg-parchment-800 rounded-lg p-1">
        {([['ai', '🤖 AI'], ['scholar', '🎓 Scholar'], ['pubmed', '🏥 PubMed'], ['resources', '🔗 Links']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 text-xs py-1.5 rounded transition-colors ${activeTab === key ? 'bg-gold-600 text-parchment-950 font-semibold' : 'text-parchment-400 hover:text-parchment-200'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* AI Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-3">
          <p className="text-xs text-parchment-500">Ask AI about <strong className="text-gold-400">{ref}</strong>:</p>
          {aiQueries.map((q, i) => (
            <div key={i} className="bg-parchment-800 rounded-lg p-3">
              <p className="text-sm text-parchment-200 mb-2">{q.label}</p>
              <div className="flex flex-wrap gap-1">
                {aiLinks(q.query).map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded bg-parchment-700 text-parchment-300 hover:bg-gold-600 hover:text-parchment-950 transition-colors"
                  >
                    {link.icon} {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Semantic Scholar Tab */}
      {activeTab === 'scholar' && (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {loading && <div className="text-parchment-500 text-sm animate-pulse">Searching Semantic Scholar…</div>}
          {!loading && papers.length === 0 && <div className="text-parchment-500 text-sm">No papers found. Try a broader search.</div>}
          {papers.map((p, i) => (
            <a
              key={i}
              href={p.url || `https://www.semanticscholar.org/paper/${p.paperId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-parchment-800 hover:bg-parchment-700 transition-colors"
            >
              <h4 className="text-sm text-parchment-100 font-medium leading-tight">{p.title}</h4>
              <div className="flex gap-3 mt-1 text-xs text-parchment-500">
                {p.year && <span>📅 {p.year}</span>}
                {p.citationCount !== undefined && <span>📄 {p.citationCount} citations</span>}
              </div>
              {p.authors && p.authors.length > 0 && (
                <p className="text-xs text-parchment-500 mt-1">{p.authors.slice(0, 3).map(a => a.name).join(', ')}{p.authors.length > 3 ? ' et al.' : ''}</p>
              )}
              {p.abstract && (
                <p className="text-xs text-parchment-400 mt-2 line-clamp-3">{p.abstract}</p>
              )}
            </a>
          ))}
        </div>
      )}

      {/* PubMed Tab */}
      {activeTab === 'pubmed' && (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {loading && <div className="text-parchment-500 text-sm animate-pulse">Searching PubMed…</div>}
          {!loading && pubmed.length === 0 && <div className="text-parchment-500 text-sm">No PubMed results found.</div>}
          {pubmed.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-parchment-800 hover:bg-parchment-700 transition-colors"
            >
              <h4 className="text-sm text-parchment-100 font-medium leading-tight">{p.title}</h4>
              <div className="flex gap-3 mt-1 text-xs text-parchment-500">
                {p.year && <span>📅 {p.year}</span>}
                {p.journal && <span>📰 {p.journal}</span>}
              </div>
              {p.authors.length > 0 && (
                <p className="text-xs text-parchment-500 mt-1">{p.authors.slice(0, 3).join(', ')}{p.authors.length > 3 ? ' et al.' : ''}</p>
              )}
            </a>
          ))}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          <p className="text-xs text-parchment-500 mb-2">External resources for <strong className="text-gold-400">{ref}</strong></p>
          {resourceLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-parchment-800 hover:bg-parchment-700 transition-colors"
            >
              <span className="text-lg flex-shrink-0">{link.icon}</span>
              <div>
                <h4 className="text-sm text-parchment-200 font-medium">{link.name}</h4>
                <p className="text-xs text-parchment-500">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
