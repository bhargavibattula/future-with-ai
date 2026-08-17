"use client";

import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function ReviewList({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/courses/${courseId}/reviews`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        if (!json || !Array.isArray(json.reviews)) throw new Error("Invalid response");
        setReviews(json.reviews);
      } catch (err: any) {
        console.warn("Fetch reviews failed:", err);
        setError("Reviews backend not available.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [courseId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-xs text-red-600">{error}</div>;

  if (reviews.length === 0) return <div className="text-sm text-muted">No reviews yet.</div>;

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="p-3 border rounded-2xl">
          <div className="flex items-center justify-between mb-1">
            <div className="font-bold">{r.user?.name || "Anonymous"}</div>
            <StarRating value={r.rating || 0} readOnly />
          </div>
          <div className="text-xs text-[#6B6785]">{r.text}</div>
        </div>
      ))}
    </div>
  );
}
