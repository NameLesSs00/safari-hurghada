export default function TripDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Visible Loading Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#F36F21] border-t-transparent" />
            <span>Loading tour details...</span>
          </div>
        </div>

        {/* Gallery Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="h-[300px] animate-pulse rounded-3xl bg-gray-200 md:col-span-2 md:h-[420px]" />
          <div className="hidden grid-rows-2 gap-3 md:grid">
            <div className="animate-pulse rounded-3xl bg-gray-200" />
            <div className="animate-pulse rounded-3xl bg-gray-200" />
          </div>
        </div>

        {/* 2-Column Content Skeleton */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex flex-1 flex-col gap-6">
            <div className="h-9 w-3/4 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-5 w-1/3 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-48 w-full animate-pulse rounded-2xl bg-gray-200" />
          </div>
          <div className="h-[360px] w-full shrink-0 animate-pulse rounded-3xl bg-gray-200 lg:w-[380px] xl:w-[420px]" />
        </div>
      </div>
    </div>
  );
}
