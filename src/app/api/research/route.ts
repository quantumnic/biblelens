import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const source = searchParams.get('source') || 'semanticscholar';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20);

  if (!query) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 });
  }

  if (source === 'semanticscholar') {
    try {
      const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=title,abstract,year,citationCount,authors,url,externalIds`;
      const res = await fetch(url, { 
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 } // Cache 1 hour
      });
      
      if (!res.ok) {
        return NextResponse.json({ error: 'Semantic Scholar API error', status: res.status }, { status: 502 });
      }
      
      const data = await res.json();
      return NextResponse.json({ source: 'semanticscholar', ...data });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Semantic Scholar', details: e.message }, { status: 500 });
    }
  }

  if (source === 'pubmed') {
    try {
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${limit}&retmode=json`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      const ids = searchData?.esearchresult?.idlist || [];
      
      if (ids.length === 0) {
        return NextResponse.json({ source: 'pubmed', results: [], total: 0 });
      }
      
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      const summaryRes = await fetch(summaryUrl);
      const summaryData = await summaryRes.json();
      
      const results = ids.map((id: string) => {
        const item = summaryData?.result?.[id];
        return {
          id,
          title: item?.title || '',
          authors: item?.authors?.map((a: any) => a.name) || [],
          year: item?.pubdate?.split(' ')[0] || '',
          journal: item?.fulljournalname || item?.source || '',
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        };
      });
      
      return NextResponse.json({ 
        source: 'pubmed', 
        results, 
        total: parseInt(searchData?.esearchresult?.count || '0') 
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query PubMed', details: e.message }, { status: 500 });
    }
  }

  if (source === 'openlibrary') {
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,first_publish_year,subject,isbn,number_of_pages_median,publisher`;
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (!res.ok) {
        return NextResponse.json({ error: 'OpenLibrary API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (data.docs || []).map((doc: any) => ({
        key: doc.key,
        title: doc.title,
        authors: doc.author_name || [],
        year: doc.first_publish_year,
        subjects: (doc.subject || []).slice(0, 5),
        isbn: doc.isbn?.[0] || null,
        pages: doc.number_of_pages_median || null,
        publisher: doc.publisher?.[0] || null,
        url: `https://openlibrary.org${doc.key}`,
      }));

      return NextResponse.json({
        source: 'openlibrary',
        results,
        total: data.numFound || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query OpenLibrary', details: e.message }, { status: 500 });
    }
  }

  if (source === 'crossref') {
    try {
      const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=${limit}&select=DOI,title,author,published-print,container-title,abstract,URL`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'BibleLens/1.0 (biblelens@research)' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'CrossRef API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const items = data.message?.items || [];
      const results = items.map((item: any) => ({
        doi: item.DOI,
        title: item.title?.[0] || '',
        authors: (item.author || []).map((a: any) => `${a.given || ''} ${a.family || ''}`.trim()),
        year: item['published-print']?.['date-parts']?.[0]?.[0] || null,
        journal: item['container-title']?.[0] || '',
        abstract: item.abstract?.replace(/<[^>]*>/g, '').slice(0, 300) || null,
        url: item.URL || `https://doi.org/${item.DOI}`,
      }));

      return NextResponse.json({
        source: 'crossref',
        results,
        total: data.message?.['total-results'] || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query CrossRef', details: e.message }, { status: 500 });
    }
  }

  if (source === 'openalex') {
    try {
      const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=${limit}&select=id,doi,title,authorships,publication_year,cited_by_count,primary_location,abstract_inverted_index`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'BibleLens/1.0 (biblelens@research)', 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'OpenAlex API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (data.results || []).map((item: any) => {
        // Reconstruct abstract from inverted index
        let abstract: string | null = null;
        if (item.abstract_inverted_index) {
          const words: [string, number][] = [];
          for (const [word, positions] of Object.entries(item.abstract_inverted_index as Record<string, number[]>)) {
            for (const pos of positions) {
              words.push([word, pos]);
            }
          }
          words.sort((a, b) => a[1] - b[1]);
          abstract = words.map(([w]) => w).join(' ').slice(0, 400);
        }

        return {
          id: item.id,
          doi: item.doi,
          title: item.title || '',
          authors: (item.authorships || []).slice(0, 5).map((a: any) => a.author?.display_name || ''),
          year: item.publication_year,
          citationCount: item.cited_by_count || 0,
          journal: item.primary_location?.source?.display_name || '',
          abstract,
          url: item.doi || item.id,
        };
      });

      return NextResponse.json({
        source: 'openalex',
        results,
        total: data.meta?.count || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query OpenAlex', details: e.message }, { status: 500 });
    }
  }

  if (source === 'doaj') {
    try {
      const url = `https://doaj.org/api/search/articles/${encodeURIComponent(query)}?page=1&pageSize=${limit}`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'DOAJ API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (data.results || []).map((item: any) => {
        const bib = item.bibjson || {};
        return {
          id: item.id,
          doi: bib.identifier?.find((i: any) => i.type === 'doi')?.id || null,
          title: bib.title || '',
          authors: (bib.author || []).map((a: any) => a.name || ''),
          year: bib.year || null,
          journal: bib.journal?.title || '',
          abstract: (bib.abstract || '').slice(0, 400) || null,
          url: bib.link?.find((l: any) => l.type === 'fulltext')?.url || `https://doaj.org/article/${item.id}`,
          keywords: bib.keywords || [],
        };
      });

      return NextResponse.json({
        source: 'doaj',
        results,
        total: data.total || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query DOAJ', details: e.message }, { status: 500 });
    }
  }

  if (source === 'internetarchive') {
    try {
      const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=date&fl[]=description&fl[]=mediatype&fl[]=subject&rows=${limit}&output=json`;
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (!res.ok) {
        return NextResponse.json({ error: 'Internet Archive API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const docs = data.response?.docs || [];
      const results = docs.map((doc: any) => ({
        id: doc.identifier,
        title: doc.title || '',
        authors: doc.creator ? (Array.isArray(doc.creator) ? doc.creator : [doc.creator]) : [],
        year: doc.date ? doc.date.slice(0, 4) : null,
        description: (doc.description || '').slice(0, 400),
        mediatype: doc.mediatype || '',
        subjects: doc.subject ? (Array.isArray(doc.subject) ? doc.subject.slice(0, 5) : [doc.subject]) : [],
        url: `https://archive.org/details/${doc.identifier}`,
      }));

      return NextResponse.json({
        source: 'internetarchive',
        results,
        total: data.response?.numFound || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Internet Archive', details: e.message }, { status: 500 });
    }
  }

  if (source === 'europepmc') {
    try {
      const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&pageSize=${limit}&resultType=core`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'Europe PMC API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const items = data.resultList?.result || [];
      const results = items.map((item: any) => ({
        id: item.id || item.pmid || '',
        doi: item.doi || null,
        title: item.title || '',
        authors: (item.authorList?.author || []).map((a: any) => a.fullName || `${a.firstName || ''} ${a.lastName || ''}`.trim()),
        year: item.pubYear || null,
        journal: item.journalTitle || '',
        abstract: (item.abstractText || '').slice(0, 400),
        url: item.doi ? `https://doi.org/${item.doi}` : `https://europepmc.org/article/${item.source}/${item.id}`,
        citationCount: item.citedByCount || 0,
      }));

      return NextResponse.json({
        source: 'europepmc',
        results,
        total: data.hitCount || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Europe PMC', details: e.message }, { status: 500 });
    }
  }

  if (source === 'googlebooks') {
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${limit}&printType=books&orderBy=relevance`;
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (!res.ok) {
        return NextResponse.json({ error: 'Google Books API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (data.items || []).map((item: any) => {
        const info = item.volumeInfo || {};
        return {
          id: item.id,
          title: info.title || '',
          authors: info.authors || [],
          year: info.publishedDate ? info.publishedDate.slice(0, 4) : null,
          description: (info.description || '').slice(0, 400),
          pages: info.pageCount || null,
          categories: (info.categories || []).slice(0, 5),
          isbn: info.industryIdentifiers?.find((i: any) => i.type === 'ISBN_13')?.identifier || info.industryIdentifiers?.[0]?.identifier || null,
          thumbnail: info.imageLinks?.thumbnail || null,
          url: info.infoLink || `https://books.google.com/books?id=${item.id}`,
          averageRating: info.averageRating || null,
        };
      });

      return NextResponse.json({
        source: 'googlebooks',
        results,
        total: data.totalItems || 0,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Google Books', details: e.message }, { status: 500 });
    }
  }

  if (source === 'philpapers') {
    try {
      const url = `https://philpapers.org/s/${encodeURIComponent(query)}.json?limit=${limit}`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'PhilPapers API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (Array.isArray(data) ? data : []).slice(0, limit).map((item: any) => ({
        title: item.title || '',
        authors: item.authors?.map((a: any) => a.name || a) || [],
        year: item.year || null,
        abstract: (item.abstract || '').slice(0, 400),
        url: item.url || `https://philpapers.org/rec/${item.id}`,
        journal: item.journal || null,
      }));

      return NextResponse.json({ source: 'philpapers', results, total: results.length });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query PhilPapers', details: e.message }, { status: 500 });
    }
  }

  if (source === 'jstor') {
    try {
      // JSTOR Data for Research (DfR) API
      const url = `https://www.jstor.org/api/search-lite?Query=${encodeURIComponent(query)}&pageSize=${limit}`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        // Fallback: try JSTOR's open search
        const fallbackUrl = `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(query)}&format=json`;
        const fallbackRes = await fetch(fallbackUrl, {
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 3600 },
        });

        if (!fallbackRes.ok) {
          return NextResponse.json({
            source: 'jstor',
            results: [],
            total: 0,
            note: 'JSTOR search API unavailable; try semanticscholar or crossref for academic papers.',
          });
        }

        const fallbackData = await fallbackRes.json();
        return NextResponse.json({ source: 'jstor', results: fallbackData.results || [], total: 0 });
      }

      const data = await res.json();
      const results = (data.results || data.items || []).slice(0, limit).map((item: any) => ({
        title: item.title || '',
        authors: item.authors || [],
        year: item.year || item.publicationYear || null,
        journal: item.journal || item.publicationTitle || null,
        url: item.url || (item.doi ? `https://doi.org/${item.doi}` : `https://www.jstor.org/stable/${item.id}`),
        doi: item.doi || null,
      }));

      return NextResponse.json({ source: 'jstor', results, total: data.totalResults || results.length });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query JSTOR', details: e.message }, { status: 500 });
    }
  }

  if (source === 'core') {
    try {
      const url = `https://api.core.ac.uk/v3/search/works/?q=${encodeURIComponent(query)}&limit=${limit}`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({
          source: 'core',
          results: [],
          total: 0,
          note: 'CORE API returned an error; try semanticscholar or crossref as alternatives.',
        });
      }

      const data = await res.json();
      const results = (data.results || []).slice(0, limit).map((item: any) => ({
        id: item.id || '',
        doi: item.doi || null,
        title: item.title || '',
        authors: (item.authors || []).map((a: any) => a.name || ''),
        year: item.yearPublished || null,
        abstract: (item.abstract || '').slice(0, 400),
        journal: item.publisher || item.journals?.[0]?.title || '',
        url: item.downloadUrl || item.sourceFulltextUrls?.[0] || (item.doi ? `https://doi.org/${item.doi}` : `https://core.ac.uk/works/${item.id}`),
        language: item.language?.code || null,
        citationCount: item.citationCount || null,
      }));

      return NextResponse.json({
        source: 'core',
        results,
        total: data.totalHits || results.length,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query CORE', details: e.message }, { status: 500 });
    }
  }

  if (source === 'wikipedia') {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&format=json&srprop=snippet|titlesnippet|timestamp|wordcount|size`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'BibleLens/1.0' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'Wikipedia API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const items = data.query?.search || [];
      const results = items.map((item: any) => ({
        title: item.title || '',
        snippet: (item.snippet || '').replace(/<[^>]*>/g, '').slice(0, 400),
        wordcount: item.wordcount || 0,
        timestamp: item.timestamp || null,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
      }));

      return NextResponse.json({
        source: 'wikipedia',
        results,
        total: data.query?.searchinfo?.totalhits || results.length,
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Wikipedia', details: e.message }, { status: 500 });
    }
  }

  if (source === 'perseus') {
    try {
      // Perseus Digital Library — search Greek/Latin texts and lexicon entries
      const url = `https://www.perseus.tufts.edu/hopper/searchresults?q=${encodeURIComponent(query)}&target=en&collections=Perseus:collection:Greco-Roman&collections=Perseus:collection:Arabic&collections=Perseus:collection:Germanic&collections=Perseus:collection:cwar&collections=Perseus:collection:Renaissance`;
      const res = await fetch(url, {
        headers: { 'Accept': 'text/html', 'User-Agent': 'BibleLens/1.0' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({
          source: 'perseus',
          results: [],
          total: 0,
          note: 'Perseus Digital Library search unavailable; try openlibrary or wikipedia.',
        });
      }

      // Since Perseus returns HTML, provide curated links for biblical Greek/Latin terms
      const greekLexiconUrl = `https://www.perseus.tufts.edu/hopper/resolveform?type=exact&lookup=${encodeURIComponent(query)}&lang=greek`;
      const latinLexiconUrl = `https://www.perseus.tufts.edu/hopper/resolveform?type=exact&lookup=${encodeURIComponent(query)}&lang=la`;

      const results = [
        {
          title: `Perseus Search: "${query}"`,
          type: 'search',
          url: `https://www.perseus.tufts.edu/hopper/searchresults?q=${encodeURIComponent(query)}`,
          description: 'Full-text search across the Perseus Digital Library collection.',
        },
        {
          title: `Greek Lexicon: "${query}"`,
          type: 'lexicon',
          url: greekLexiconUrl,
          description: 'Look up in the Liddell-Scott-Jones Greek-English Lexicon.',
        },
        {
          title: `Latin Lexicon: "${query}"`,
          type: 'lexicon',
          url: latinLexiconUrl,
          description: 'Look up in Lewis & Short Latin Dictionary.',
        },
      ];

      return NextResponse.json({
        source: 'perseus',
        results,
        total: results.length,
        note: 'Perseus Digital Library — primary sources in Greek and Latin with lexicon tools.',
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Perseus', details: e.message }, { status: 500 });
    }
  }

  if (source === 'wikidata') {
    try {
      // Search Wikidata for biblical entities
      const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&limit=${limit}&format=json`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'Wikidata API error', status: res.status }, { status: 502 });
      }

      const data = await res.json();
      const results = (data.search || []).map((item: any) => ({
        id: item.id,
        title: item.label,
        description: item.description || '',
        url: item.concepturi,
      }));

      return NextResponse.json({
        source: 'wikidata',
        results,
        total: results.length,
        note: 'Wikidata — structured knowledge base for biblical persons, places, and concepts.',
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Wikidata', details: e.message }, { status: 500 });
    }
  }

  if (source === 'sacredtexts') {
    try {
      // Internet Sacred Texts Archive — build curated search links
      const baseUrl = 'https://www.sacred-texts.com';
      const results = [
        {
          title: `Bible: "${query}"`,
          type: 'primary',
          url: `${baseUrl}/bib/kjv/index.htm`,
          description: 'King James Version at the Internet Sacred Text Archive.',
        },
        {
          title: `Apocrypha: "${query}"`,
          type: 'primary',
          url: `${baseUrl}/bib/apo/index.htm`,
          description: 'Deuterocanonical / Apocryphal texts — Wisdom of Solomon, Sirach, Maccabees, etc.',
        },
        {
          title: `Church Fathers: "${query}"`,
          type: 'secondary',
          url: `${baseUrl}/chr/index.htm`,
          description: 'Early Christian writings — patristic texts, creeds, and church history.',
        },
        {
          title: `Jewish Texts: "${query}"`,
          type: 'secondary',
          url: `${baseUrl}/jud/index.htm`,
          description: 'Jewish sacred texts — Talmud, Midrash, Kabbalah, and more.',
        },
      ];

      return NextResponse.json({
        source: 'sacredtexts',
        results,
        total: results.length,
        note: 'Internet Sacred Text Archive — encyclopedic collection of public-domain religious texts.',
      });
    } catch (e: any) {
      return NextResponse.json({ error: 'Failed to query Sacred Texts', details: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Unknown source. Use: semanticscholar, pubmed, openlibrary, crossref, openalex, doaj, internetarchive, europepmc, googlebooks, philpapers, jstor, core, wikipedia, perseus, wikidata, sacredtexts' }, { status: 400 });
  } catch (error) {
    return handleApiError(error);
  }
}
