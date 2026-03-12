import Sidebar from '@/components/Sidebar';

export default function ReaderLoading() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="mb-6">
          <div className="h-4 w-48 bg-parchment-800 rounded animate-pulse mb-4" />
          <div className="h-8 w-64 bg-parchment-800 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 py-3 px-4">
              <div className="w-6 h-4 bg-parchment-800 rounded animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-parchment-800 rounded animate-pulse" />
                <div className="h-4 bg-parchment-800 rounded animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
