import { Star, MessageSquare } from "lucide-react";
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
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
          <MessageSquare size={18} />
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
            Customer Reviews
          </h2>
          <span className="text-sm font-semibold text-slate-400">
            ({reviews.length})
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        {/* Left side: Overall Scorecard */}
        <div className="flex w-full shrink-0 flex-col gap-5 rounded-2xl bg-slate-50/70 p-6 sm:p-7 border border-slate-100 lg:w-[300px]">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-[#1E232A]">
              {reviews.length > 0 ? averageScore.toFixed(1) : "5.0"}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-1">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2.5 pt-2 border-t border-slate-200/60">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = scoreCounts[index];
              const percentage = reviews.length
                ? (count / reviews.length) * 100
                : 0;

              return (
                <div key={star} className="flex items-center gap-3 text-xs font-medium text-slate-600">
                  <span className="w-3 shrink-0 text-right font-bold">{star}</span>
                  <Star size={13} className="shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#F36F21] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-slate-400 font-mono">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Reviews List */}
        <div className="flex-1 space-y-4">
          {reviews.slice(0, 6).map((review) => {
            const initials = `${review.firstName?.[0] || ""}${review.lastName?.[0] || ""}`.toUpperCase() || "U";
            return (
              <div
                key={review.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs transition-all hover:border-slate-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100/70 font-bold text-[#F36F21]">
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E232A]">
                        {review.firstName} {review.lastName}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < review.rate
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "fill-slate-200 text-slate-200"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
                  {review.comment}
                </p>
              </div>
            );
          })}

          {reviews.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center text-slate-500">
              <p className="font-medium">No reviews yet for this tour.</p>
              <p className="text-xs text-slate-400 mt-1">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-slate-100 pt-8">
        <AddReviewForm tripId={tripId} />
      </div>
    </section>
  );
}
