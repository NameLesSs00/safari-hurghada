"use client";

import { useState } from "react";
import { Star } from "lucide-react";
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
    phone: "",
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
    
    // Basic frontend validation for phone format (optional depending on API, but safe to check roughly)
    const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ type: "error", text: "The phone number format is incorrect. Please enter a valid number." });
      return;
    }

    mutation.mutate({
      ...formData,
      tripId,
      rate: rating,
    }, {
      onSuccess: () => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
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
    <div className="mt-12 rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] lg:p-8">
      <h3 className="mb-2 text-xl font-bold text-[#111827]">Add Review</h3>
      <p className="mb-6 text-sm text-[#6B7280]">
        Your email address will not be published. Required fields are marked{" "}
        <span className="text-[#EF4444]">*</span>
      </p>

      {message && (
        <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${
          message.type === "error" 
            ? "bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]" 
            : "bg-[#F0FDF4] text-[#16A34A] border border-[#86EFAC]"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Rating Select */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[#374151]">
            Review <span className="text-[#EF4444]">*</span>
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#374151]">
              First Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A5A]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#374151]">
              Last Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A5A]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#374151]">
              Email <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A5A]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#374151]">
              Phone <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A5A]"
            />
          </div>
        </div>

        {/* Comment textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#374151]">
            Comment <span className="text-[#EF4444]">*</span>
          </label>
          <textarea
            required
            placeholder="Text..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A5A]"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 w-full max-w-[200px] rounded-full border border-[#003A5A] px-6 py-3 font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
