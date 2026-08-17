"use client";

import React, { useState } from "react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

export default function ReviewForm({ courseId, onSubmitted }: { courseId: string; onSubmitted?: () => void }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/courses/${courseId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submit failed");
      alert("Review submitted");
      setText("");
      setRating(5);
      onSubmitted?.();
    } catch (err: any) {
      alert(err.message || "Review submit failed. Backend integration required.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl">
      <div className="mb-2">Your rating</div>
      <StarRating value={rating} onChange={(n) => setRating(n)} />
      <textarea className="w-full mt-3 p-2 border rounded" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a helpful review..." />
      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmit} disabled={submitting || rating <= 0}>Submit Review</Button>
      </div>
    </div>
  );
}
