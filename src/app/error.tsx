'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold font-serif text-red-400 mb-4">Something went wrong</h1>
        <p className="text-parchment-400 mb-2">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && (
          <p className="text-xs text-parchment-600 mb-6">Error ID: {error.digest}</p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gold-600 text-parchment-950 rounded-xl font-semibold hover:bg-gold-500 transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="px-6 py-3 bg-parchment-800 text-parchment-200 rounded-xl font-semibold hover:bg-parchment-700 transition-colors">
            ← Home
          </Link>
        </div>
      </div>
    </div>
  );
}
