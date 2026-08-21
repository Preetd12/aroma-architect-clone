import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { PageShell, PromoStrip } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { formatINR, getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Fragrance not found — Sarkar Perfumes" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — ${p.subtitle} | Sarkar Perfumes` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — Sarkar Perfumes` },
        { property: "og:description", content: p.description.slice(0, 155) },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductMissing,
});

function ProductMissing() {
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">We can't find that fragrance</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          It may have been retired or the link is incorrect.
        </p>
        <Link
          to="/collection/$slug"
          params={{ slug: "unisex" }}
          className="mt-8 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
        >
          BROWSE THE HOUSE
        </Link>
      </div>
    </PageShell>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [sizeIdx, setSizeIdx] = useState(1 < product.sizes.length ? 1 : 0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes[sizeIdx]!;
  const price = Math.round(product.price * size.multiplier);
  const mrp = Math.round(product.mrp * size.multiplier);
  const off = Math.round(((mrp - price) / mrp) * 100);
  const saved = wishlist.includes(product.slug);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const fbt = related.slice(0, 2);
  const bundleTotal = price + fbt.reduce((s, p) => s + p.price, 0);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 py-12">
        <nav className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>{" "}
          / <span className="text-cream">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={`${product.name} ${product.subtitle} bottle by Sarkar Perfumes`}
              width={1000}
              height={1250}
              className="w-full border border-border object-cover shadow-luxe"
            />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[product, ...related.slice(0, 3)].map((p) => (
                <img
                  key={p.slug}
                  src={p.image}
                  alt={`${p.name} detail view`}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="aspect-square w-full border border-border object-cover opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.6rem] tracking-[0.35em] text-gold uppercase">{product.subtitle}</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold" : ""}`}
                  />
                ))}
              </span>
              {product.rating} · {product.reviewCount} reviews
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl text-cream">{formatINR(price)}</span>
              <span className="text-sm text-muted-foreground line-through">{formatINR(mrp)}</span>
              <span className="bg-gold px-2 py-1 text-[0.6rem] tracking-[0.15em] text-accent-foreground">
                {off}% OFF
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <span className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                Size
              </span>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSizeIdx(i)}
                    aria-pressed={i === sizeIdx}
                    className={`border px-5 py-3 text-xs transition-colors ${
                      i === sizeIdx
                        ? "border-gold text-gold"
                        : "border-border text-muted-foreground hover:border-gold/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-muted-foreground hover:text-gold"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-muted-foreground hover:text-gold"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, size.label, qty, price);
                  setAdded(true);
                }}
                className="flex-1 bg-gold px-8 py-4 text-[0.65rem] tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                ADD TO BAG
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.slug)}
                aria-label="Toggle wishlist"
                className="border border-border p-4 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} />
              </button>
            </div>
            {added && (
              <p role="status" className="mt-3 text-xs text-gold">
                Added to your bag —{" "}
                <Link to="/cart" className="underline underline-offset-4">
                  view bag
                </Link>
              </p>
            )}

            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 text-xs">
              <div>
                <dt className="text-muted-foreground">Concentration</dt>
                <dd className="mt-1">{product.concentration}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Longevity</dt>
                <dd className="mt-1">{product.longevity}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:grid-cols-3">
              {[
                [Truck, "Dispatched in 24 hrs"],
                [ShieldCheck, "Secure payments"],
                [RefreshCcw, "7-day returns"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Truck;
                return (
                  <div key={label as string} className="flex items-center gap-2">
                    <I className="h-4 w-4 text-gold" />
                    {label as string}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notes */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-3xl">Fragrance Notes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(
              [
                ["Top", product.notes.top],
                ["Heart", product.notes.heart],
                ["Base", product.notes.base],
              ] as const
            ).map(([label, list]) => (
              <div key={label} className="border border-border p-8">
                <div className="text-[0.6rem] tracking-[0.3em] text-gold uppercase">{label}</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {list.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently bought together */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-3xl">Frequently Bought Together</h2>
          <div className="mt-8 flex flex-wrap items-center gap-6 border border-border p-8">
            {[product, ...fbt].map((p) => (
              <img
                key={p.slug}
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={160}
                height={200}
                className="h-32 w-28 border border-border object-cover"
              />
            ))}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {[product, ...fbt].map((p) => p.name).join(" + ")}
              </p>
              <p className="mt-2 font-display text-2xl text-cream">{formatINR(bundleTotal)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(product, size.label, 1, price);
                fbt.forEach((p) => addToCart(p, p.sizes[0]!.label, 1, Math.round(p.price * p.sizes[0]!.multiplier)));
              }}
              className="bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
            >
              ADD ALL THREE
            </button>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-3xl">Reviews</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {product.reviews.map((r) => (
              <figure key={r.name} className="border border-border p-8">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 text-[0.65rem] tracking-[0.2em] uppercase">
                  {r.name} <span className="text-muted-foreground">· {r.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-3xl">You May Also Like</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>

      <PromoStrip />
    </PageShell>
  );
}
