"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();

  const navLinks = [
    { href: "/philosophy", label: "PHILOSOPHY / 哲学" },
    { href: "/#category", label: "CATEGORY / 工芸品目" },
    { href: "/#area", label: "AREA / 産地" },
    { href: "/stories", label: "STORIES / 物語" },
    { href: "/events", label: "EVENTS / 行事" },
  ];

  return (
    <header className="border-b border-stone-light/40 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-wide text-foreground"
        >
          <span className="text-indigo">KOGEI</span>{" "}
          <span className="text-warm-gray font-normal text-sm">PORTAL</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs text-warm-gray tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/favorites"
            className="relative flex items-center gap-1.5 hover:text-amber-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-1.5 hover:text-indigo transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            SEARCH
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/favorites" className="relative text-warm-gray hover:text-amber-600 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link href="/search" className="text-warm-gray hover:text-indigo transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="メニュー"
            aria-expanded={isOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-stone-light/40 bg-white">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm text-warm-gray">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 hover:text-indigo transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
