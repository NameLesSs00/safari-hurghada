"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { useCreateReviewMutation } from "@/src/features/tours/api/create-review";

interface AddReviewFormProps { 
  tripId: number;
}

export function AddReviewForm({ tripId }: AddReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
  });

  const mutation = useCreateReviewMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (rating === 0) {
      setMessage({ type: "error", text: "Please select a star rating before submitting." });
      return;
    }

    mutation.mutate({
      ...formData,
      phone: "+201000000000", // dummy phone to satisfy API without requiring or showing phone
      tripId,
      rate: rating,
    }, {
      onSuccess: () => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          comment: "",
        });
        setRating(0);
        setMessage({ type: "success", text: "Thank you! Your review has been submitted successfully." });
      },
      onError: (error) => {
        setMessage({ type: "error", text: error.message || "Failed to submit review. Please check your information." });
      }
    });
  };

  return (
    <div className="rounded-2xl bg-slate-50/60 p-6 sm:p-7 border border-slate-100">
      <h3 className="text-lg font-bold text-[#1E232A]">Share Your Experience</h3>
      <p className="mt-1 mb-6 text-xs sm:text-sm text-slate-500">
        Your feedback helps fellow travelers find the best excursions. Required fields are marked{" "}
        <span className="text-[#EF4444] font-bold">*</span>
      </p>

      {message && (
        <div className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
          message.type === "error" 
            ? "bg-rose-50 text-rose-600 border border-rose-200" 
            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Rating Select */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Overall Rating <span className="text-[#EF4444]">*</span>
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={26}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-slate-200 text-slate-200"
                  } transition-colors`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-3 text-xs font-bold text-[#1E232A]">
                {rating === 5 ? "Excellent (5/5)" : rating === 4 ? "Very Good (4/5)" : `${rating}/5`}
              </span>
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              First Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20"
              placeholder="e.g. John"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Last Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20"
              placeholder="e.g. Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-600">
              Email Address <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20"
              placeholder="e.g. john@example.com"
            />
          </div>
        </div>

        {/* Comment textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">
            Your Review <span className="text-[#EF4444]">*</span>
          </label>
          <textarea
            required
            placeholder="Write about what you enjoyed the most, the guide, boat trip, or transfer experience..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F36F21] px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#d95c12] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            <Send size={15} />
            <span>{mutation.isPending ? "Submitting Review..." : "Submit Review"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
