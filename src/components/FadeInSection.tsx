"use client";

import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
};

export default function FadeInSection({
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useScrollFadeIn<HTMLElement>();

  return (
    <Tag ref={ref as React.Ref<never>} className={`fade-in-up ${className}`}>
      {children}
    </Tag>
  );
}
