import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Sarkar Perfumes" },
      { name: "description", content: "Fragrances you've saved from the Sarkar Perfumes house." },
      { property: "og:title", content: "Your Wishlist — Sarkar Perfumes" },
      { property: "og:description", content: "Saved parfums, attars and gift sets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, hydrated } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <PageShell>
      <PageHeader title="Wishlist" blurb="The bottles you've set aside for later." />
      <div className="mx-auto max-w-7xl px-5 py-16">
        {!hydrated ? null : items.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center">
            <h2 className="font-display text-2xl">Your wishlist is empty</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the heart on any fragrance to keep it here.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "unisex" }}
              className="mt-6 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
