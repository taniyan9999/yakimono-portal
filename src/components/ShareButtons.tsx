"use client";

import { useState } from "react";

type Props = {
  title: string;
  variant?: "light" | "dark";
};

export default function ShareButtons({ title, variant = "light" }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const textColor =
    variant === "dark"
      ? "text-stone-light/50 hover:text-white/80"
      : "text-stone hover:text-foreground";
  const borderColor =
    variant === "dark" ? "border-stone-light/20" : "border-stone-light/30";

  const share = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const urls: Record<string, string> = {
      x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      hatena: `https://b.hatena.ne.jp/entry/panel/?url=${encodedUrl}&title=${encodedTitle}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs ${textColor}`}>共有</span>
      <button
        onClick={() => share("x")}
        className={`rounded-full border ${borderColor} p-2 ${textColor} transition-colors`}
        aria-label="Xで共有"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={() => share("facebook")}
        className={`rounded-full border ${borderColor} p-2 ${textColor} transition-colors`}
        aria-label="Facebookで共有"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        onClick={() => share("line")}
        className={`rounded-full border ${borderColor} p-2 ${textColor} transition-colors`}
        aria-label="LINEで共有"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      </button>
      <button
        onClick={() => share("hatena")}
        className={`rounded-full border ${borderColor} p-2 ${textColor} transition-colors`}
        aria-label="はてなブックマーク"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.47 21.18c-.45.45-1.08.67-1.9.67s-1.45-.22-1.9-.67c-.45-.45-.67-1.08-.67-1.9s.22-1.45.67-1.9c.45-.45 1.08-.67 1.9-.67s1.45.22 1.9.67c.45.45.67 1.08.67 1.9s-.22 1.45-.67 1.9zM17.08 3h3.47v12.27h-3.47V3zM3.32 18.35l1.37-2.76c.85.6 1.88.9 3.08.9.6 0 1.07-.1 1.4-.3.33-.2.5-.5.5-.88 0-.36-.18-.65-.55-.86-.36-.22-.97-.43-1.83-.64-.7-.17-1.3-.37-1.8-.6-.5-.23-.93-.54-1.27-.93-.34-.39-.51-.9-.51-1.53 0-.8.2-1.47.6-2 .4-.54.95-.94 1.63-1.2.68-.26 1.44-.4 2.27-.4 1.7 0 3.07.54 4.1 1.63l-1.5 2.47c-.75-.55-1.6-.82-2.56-.82-.5 0-.9.08-1.18.25-.28.17-.42.4-.42.7 0 .3.17.53.5.68.34.16.92.33 1.73.52.76.18 1.4.38 1.9.6.5.22.93.54 1.27.96.34.42.52.96.52 1.64 0 .82-.2 1.5-.6 2.07-.4.56-.96.98-1.66 1.24-.7.26-1.5.4-2.4.4-1.04 0-1.98-.17-2.82-.5-.84-.33-1.55-.8-2.14-1.4z" />
        </svg>
      </button>
      <button
        onClick={copyLink}
        className={`rounded-full border ${borderColor} p-2 ${textColor} transition-colors relative`}
        aria-label="リンクをコピー"
      >
        {copied ? (
          <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}
