import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, PageShell, PromoStrip } from "@/components/site/Layout";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { categoryMeta, FAMILIES, productsByCategory, type Family } from "@/lib/products";

type Search = { family?: string };

export const Route = createFileRoute("/collection/$slug")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["family"] === "string" ? { family: search["family"] } : {},
  head: ({ params }) => {
    const meta = categoryMeta[params.slug] ?? { title: "Collection", blurb: "" };
    return {
      meta: [
        { title: `${meta.title} — Sarkar Perfumes` },
        { name: "description", content: `${meta.blurb} Shop ${meta.title.toLowerCase()} from Sarkar Perfumes with free shipping above ₹1,499.` },
        { property: "og:title", content: `${meta.title} — Sarkar Perfumes` },
        { property: "og:description", content: meta.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Collection,
});

function Collection() {
  const { slug } = Route.useParams();
  const { family } = Route.useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [slug, family]);

  const meta = categoryMeta[slug] ?? { title: "Collection", blurb: "Explore the Sarkar house." };
  let items = productsByCategory(slug);
  if (family) items = items.filter((p) => p.families.includes(family as Family));
  items = [...items].sort((a, b) =>
    sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0,
  );

  return (
    <PageShell>
      <PageHeader title={meta.title} blurb={meta.blurb} />

      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!family}
              onClick={() => navigate({ to: "/collection/$slug", params: { slug }, search: {} })}
            >
              All
            </FilterChip>
            {FAMILIES.map((f) => (
              <FilterChip
                key={f}
                active={family === f}
                onClick={() =>
                  navigate({ to: "/collection/$slug", params: { slug }, search: { family: f } })
                }
              >
                {f}
              </FilterChip>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tracking-[0.2em] uppercase">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-border bg-background px-3 py-2 text-xs outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-16 border border-dashed border-border p-16 text-center">
            <h2 className="font-display text-2xl">Nothing in this accord yet</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We haven't released a {family ?? "matching"} fragrance in this category. Try another
              family or browse the full house.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "unisex" }}
              className="mt-6 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
            >
              BROWSE ALL
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>

      <PromoStrip />
    </PageShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2 text-[0.62rem] tracking-[0.2em] uppercase transition-colors ${
        active ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/50"
      }`}
    >
      {children}
    </button>
  );
}
