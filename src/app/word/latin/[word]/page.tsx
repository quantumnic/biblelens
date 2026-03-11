import { redirect } from 'next/navigation';

// Redirect /word/latin/[word] to /latin/[word]
export default function LatinWordRedirect({ params }: { params: { word: string } }) {
  redirect(`/latin/${params.word}`);
}
