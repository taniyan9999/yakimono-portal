type Step = {
  step: number;
  name: string;
  description: string;
};

export default function ManufacturingSteps({ steps }: { steps: Step[] }) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
          <div className="mb-10 md:mb-0">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              Process
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              制作工程
            </h2>
            <p className="mt-3 text-sm text-warm-gray">
              全{steps.length}工程
            </p>
          </div>

          <div className="relative">
            {/* 縦のコネクトライン */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-stone-light/30 hidden md:block" />

            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li key={s.step} className="relative flex gap-5 group">
                  {/* ステップ番号 */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-light/30 bg-white text-sm font-bold text-indigo transition-colors group-hover:bg-indigo group-hover:text-white group-hover:border-indigo">
                    {s.step}
                  </div>

                  {/* コンテンツ */}
                  <div className="pt-1.5 pb-2 min-w-0">
                    <h3 className="text-base font-bold text-foreground leading-snug mb-1.5">
                      {s.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-warm-gray">
                      {s.description}
                    </p>
                  </div>

                  {/* 区切り矢印（モバイル） */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-5 -bottom-3 flex items-center justify-center md:hidden">
                      <svg
                        className="h-3 w-3 text-stone-light/40"
                        fill="none"
                        viewBox="0 0 12 12"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M6 2v8M3 7l3 3 3-3" />
                      </svg>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
