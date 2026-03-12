import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-4xl">
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold font-serif text-gold-400 mb-4">404</h1>
          <h2 className="text-2xl font-serif text-parchment-200 mb-4">Page Not Found</h2>
          <p className="text-parchment-400 mb-8">
            The passage you&apos;re looking for doesn&apos;t exist. Perhaps try searching for it?
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-gold-600 text-parchment-950 rounded-xl font-semibold hover:bg-gold-500 transition-colors">
              ← Home
            </Link>
            <Link href="/search" className="px-6 py-3 bg-parchment-800 text-parchment-200 rounded-xl font-semibold hover:bg-parchment-700 transition-colors">
              🔍 Search
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
