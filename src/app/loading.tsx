export default function Loading() {
  return (
    <div className="flex-1 p-4 lg:p-8 flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-parchment-400 text-sm">Loading…</p>
      </div>
    </div>
  );
}
