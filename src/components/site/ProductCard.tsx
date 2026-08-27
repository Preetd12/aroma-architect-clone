import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatINR, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { QuickView } from "./QuickView";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const saved = wishlist.includes(product.slug);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-transform duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_20%,oklch(0.32_0.03_75),transparent_50%),linear-gradient(145deg,oklch(0.19_0.01_80),oklch(0.11_0.005_80))]">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <img
            src={product.image}
            alt={`${product.name} perfume bottle`}
            loading="lazy"
            width={768}
            height={960}
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="flex gap-2">
            {product.isNew && <span className="rounded-full border border-gold/50 bg-ink/70 px-3 py-1 text-[0.58rem] tracking-[0.2em] text-gold backdrop-blur">NEW</span>}
            {off > 0 && <span className="rounded-full bg-gold px-3 py-1 text-[0.58rem] font-semibold tracking-[0.16em] text-ink">{off}% OFF</span>}
          </div>
          <button
            type="button"
            onClick={() => {
              toggleWishlist(product.slug);
              toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
            }}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 bg-ink/55 text-cream backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-ink via-ink/75 to-transparent">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                addToCart(product, product.sizes[0]!.label, 1, product.price);
                toast.success(`${product.name} added to bag`);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-[0.6rem] font-semibold tracking-[0.18em] text-ink transition-transform hover:scale-[1.02]"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> ADD
            </button>
            <button
              type="button"
              onClick={() => setQuick(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 bg-ink/35 px-4 py-3 text-[0.6rem] tracking-[0.18em] text-cream backdrop-blur hover:border-gold hover:text-gold"
            >
              <Sparkles className="h-3.5 w-3.5" /> VIEW
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.58rem] tracking-[0.18em] text-gold uppercase">{product.subtitle}</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-none">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-gold">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-1 text-xs tracking-wide text-muted-foreground">{product.families.join(" · ")}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <span className="block text-[0.56rem] tracking-[0.16em] text-muted-foreground uppercase">From</span>
            <span className="mt-1 block text-base font-semibold text-cream">{formatINR(product.price)}</span>
          </div>
          <div className="flex gap-1.5">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size.label} className="rounded-full border border-border px-2 py-1 text-[0.55rem] text-muted-foreground">{size.label.replace(" ", "")}</span>
            ))}
          </div>
        </div>
      </div>

      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[4/5] animate-pulse bg-secondary" />
      <div className="space-y-3 p-5"><div className="h-3 w-24 animate-pulse bg-secondary" /><div className="h-7 w-40 animate-pulse bg-secondary" /></div>
    </div>
  );
}
