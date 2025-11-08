export default function Loading() {
  return (
    <div className="px-6 md:px-20 py-12">
      <div className="h-8 w-64 bg-gray-100 rounded-md" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl border bg-white p-6 animate-pulse" />
        ))}
      </div>
    </div>
  );
}


