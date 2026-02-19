"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type CraftItem = {
  id: string;
  name: string;
  name_kana: string;
  prefecture: string;
  category: string;
};

export default function SearchBar({
  crafts,
  variant = "hero",
}: {
  crafts: CraftItem[];
  variant?: "hero" | "header";
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results =
    q.length >= 1
      ? crafts
          .filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.name_kana.toLowerCase().includes(q) ||
              c.prefecture.includes(q) ||
              c.category.includes(q)
          )
          .slice(0, 8)
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setFocused(false);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center gap-3 rounded-full border transition-all ${
            isHero
              ? "bg-white/10 border-white/20 backdrop-blur-md px-5 py-3 focus-within:bg-white/15 focus-within:border-white/40"
              : "bg-white border-stone-light/30 px-3 py-1.5 focus-within:border-indigo/40"
          }`}
        >
          <svg
            className={`shrink-0 ${isHero ? "w-5 h-5 text-white/40" : "w-4 h-4 text-stone"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="工芸品名・産地・カテゴリで検索..."
            className={`w-full bg-transparent outline-none ${
              isHero
                ? "text-sm text-white placeholder:text-white/30"
                : "text-xs text-foreground placeholder:text-stone"
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className={`shrink-0 ${isHero ? "text-white/40 hover:text-white/70" : "text-stone hover:text-foreground"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* サジェスト結果 */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-white shadow-xl border border-stone-light/20 overflow-hidden z-50">
          {results.map((craft) => (
            <button
              key={craft.id}
              onClick={() => {
                router.push(`/crafts/${craft.id}`);
                setFocused(false);
                setQuery("");
              }}
              className="w-full text-left px-4 py-3 hover:bg-cream transition-colors flex items-center justify-between gap-2 border-b border-stone-light/10 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{craft.name}</p>
                <p className="text-[11px] text-stone">{craft.prefecture} / {craft.category}</p>
              </div>
              <span className="text-xs text-stone-light/40">&rarr;</span>
            </button>
          ))}
          {q.length >= 1 && (
            <button
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(q)}`);
                setFocused(false);
              }}
              className="w-full text-center px-4 py-3 text-xs text-indigo hover:bg-cream transition-colors border-t border-stone-light/20"
            >
              「{query}」で全件検索
            </button>
          )}
        </div>
      )}
    </div>
  );
}
