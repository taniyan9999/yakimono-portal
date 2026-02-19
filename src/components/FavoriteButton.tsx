"use client";

import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  craftId: string;
  size?: "sm" | "md";
};

export default function FavoriteButton({ craftId, size = "md" }: Props) {
  const { toggle, isFavorite } = useFavorites();
  const active = isFavorite(craftId);

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const padding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(craftId);
      }}
      className={`${padding} rounded-full transition-colors ${
        active
          ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
          : "bg-white/80 text-stone hover:bg-white hover:text-amber-500"
      }`}
      aria-label={active ? "栞を外す" : "栞を挟む"}
      title={active ? "栞を外す" : "栞を挟む"}
    >
      <svg
        className={iconSize}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
