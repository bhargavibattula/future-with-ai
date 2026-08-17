"use client";

import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, readOnly = false, onChange }: { value?: number; readOnly?: boolean; onChange?: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        return (
          <button key={idx} type="button" disabled={readOnly} onClick={() => !readOnly && onChange?.(idx)} className="p-1">
            <Star className={`w-4 h-4 ${idx <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          </button>
        );
      })}
    </div>
  );
}
