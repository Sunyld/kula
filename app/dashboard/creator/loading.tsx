export default function Loading() {
  return (
    <div className="p-4 md:p-8">
      <div className="h-7 w-72 bg-gray-100 rounded-md" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border bg-white animate-pulse" />
        ))}
      </div>
    </div>
  );
}


