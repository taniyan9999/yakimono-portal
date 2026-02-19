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
          ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
          : "bg-white/80 text-stone hover:bg-white hover:text-rose-400"
      }`}
      aria-label={active ? "お気に入りから削除" : "お気に入りに追加"}
      title={active ? "お気に入りから削除" : "お気に入りに追加"}
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
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
}
