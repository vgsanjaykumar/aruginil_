export default function LoadingState({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-black/8 rounded-lf-card overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-black/5" />
          <div className="p-4">
            <div className="h-4 w-2/3 bg-black/10 rounded" />
            <div className="h-3 w-1/2 bg-black/5 rounded mt-2.5" />
            <div className="h-3 w-full bg-black/5 rounded mt-3" />
            <div className="flex gap-2 mt-4">
              <div className="h-9 w-24 bg-black/5 rounded-lg" />
              <div className="h-9 w-24 bg-black/10 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
