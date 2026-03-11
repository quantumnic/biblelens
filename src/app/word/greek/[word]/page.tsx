import WordProvenancePage from '@/components/WordProvenancePage';

export default function GreekWordPage({ params }: { params: { word: string } }) {
  return <WordProvenancePage lemma={decodeURIComponent(params.word)} language="greek" />;
}
