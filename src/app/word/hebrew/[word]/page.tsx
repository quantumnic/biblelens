import WordProvenancePage from '@/components/WordProvenancePage';

export default function HebrewWordPage({ params }: { params: { word: string } }) {
  return <WordProvenancePage lemma={decodeURIComponent(params.word)} language="hebrew" />;
}
