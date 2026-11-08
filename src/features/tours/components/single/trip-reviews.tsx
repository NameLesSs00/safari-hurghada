import { Star } from "lucide-react";
import type { Review } from "@/src/features/tours/api/get-reviews";
import { AddReviewForm } from "./add-review-form";

interface TripReviewsProps {
  tripId: number;
  reviews: Review[];
}

export function TripReviews({ tripId, reviews }: TripReviewsProps) {
  const averageScore = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length
    : 0;

  const scoreCounts = [5, 4, 3, 2, 1].map((star) => {
    return reviews.filter((r) => r.rate === star).length;
  });

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Left side: Overall Score */}
        <div className="flex w-full shrink-0 flex-col items-start gap-4 lg:w-[320px]">
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-[#003A5A] sm:text-6xl">
              {averageScore.toFixed(1)}
            </span>
            <Star size={40} className="mb-2 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
          <div className="rounded-full bg-[#003A5A] px-4 py-1.5 text-sm font-semibold text-white">
            {reviews.length} reviews
          </div>

          <div className="mt-8 flex w-full flex-col gap-4">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = scoreCounts[index];
              const percentage = reviews.length
                ? (count / reviews.length) * 100
                : 0;

              return (
                <div key={star} className="flex items-center gap-4 text-sm font-medium text-[#4B5563]">
                  <span className="w-3 shrink-0 text-right">{star}</span>
                  <Star size={16} className="shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#F59E0B]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Reviews List */}
        <div className="flex-1 space-y-6">
          {reviews.slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-bold text-[#003A5A]">
                    {review.firstName} {review.lastName}
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rate
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                {review.comment}
              </p>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      <AddReviewForm tripId={tripId} />
    </div>
  );
}
