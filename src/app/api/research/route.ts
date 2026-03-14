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

  return NextResponse.json({ error: 'Unknown source. Use: semanticscholar, pubmed, openlibrary, crossref, openalex, doaj, internetarchive, europepmc, googlebooks' }, { status: 400 });
  } catch (error) {
    return handleApiError(error);
  }
}
