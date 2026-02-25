import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="パンくずリスト"
      className="mx-auto max-w-5xl px-6 py-4 text-xs text-warm-gray"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-stone-light/40 mx-1" aria-hidden="true">
                /
              </span>
            )}
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-indigo transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground/70">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
