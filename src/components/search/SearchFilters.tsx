"use client";

import React, { useState, useEffect } from "react";

export default function SearchFilters({ onSearch }: { onSearch: (q: string, filters: any) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(query, { category, difficulty });
    }, 300);
    return () => clearTimeout(t);
  }, [query, category, difficulty]);

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, topics, tags..." className="flex-1 p-3 rounded-2xl border" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 rounded-2xl border">
        <option value="">All</option>
        <option value="ml">Machine Learning</option>
        <option value="nlp">NLP</option>
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-3 rounded-2xl border">
        <option value="">Any</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
}
