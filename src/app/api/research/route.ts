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

  return NextResponse.json({ error: 'Unknown source. Use: semanticscholar, pubmed' }, { status: 400 });
  } catch (error) {
    return handleApiError(error);
  }
}
