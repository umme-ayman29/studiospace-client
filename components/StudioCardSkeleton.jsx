export default function StudioCardSkeleton() {
  return (
    <div className="card h-full overflow-hidden border border-base-300 bg-base-100">
      <div className="skeleton h-52 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex items-center justify-between pt-4">
          <div className="skeleton h-6 w-20" />
          <div className="skeleton h-8 w-28" />
        </div>
      </div>
    </div>
  );
}