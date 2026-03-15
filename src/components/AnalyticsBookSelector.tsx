'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-books';

export default function AnalyticsBookSelector({ bookId }: { bookId: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('book', e.target.value);
    router.push(`/analytics?${params.toString()}`);
  };

  return (
    <select
      value={bookId}
      onChange={handleChange}
      className="bg-parchment-800 text-parchment-200 rounded-lg px-3 py-2 text-sm border border-parchment-700"
    >
      <option value="0">All Books</option>
      {BIBLE_BOOKS.map(b => (
        <option key={b.id} value={b.id}>{b.name}</option>
      ))}
    </select>
  );
}
