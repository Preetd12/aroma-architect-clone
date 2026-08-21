import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
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
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden border border-border bg-secondary">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <img
            src={product.image}
            alt={`${product.name} perfume bottle by Sarkar Perfumes`}
            loading="lazy"
            width={800}
            height={1000}
            decoding="async"
            className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-3">
          <div className="flex flex-col gap-2">
            {off > 0 && (
              <span className="bg-gold px-2 py-1 text-[0.6rem] font-semibold tracking-[0.18em] text-accent-foreground">
                {off}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="border border-gold/60 bg-background/80 px-2 py-1 text-[0.6rem] tracking-[0.18em] text-gold">
                NEW
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              toggleWishlist(product.slug);
              toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
            }}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className="pointer-events-auto grid h-9 w-9 place-items-center border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0 focus-within:translate-y-0">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                addToCart(product, product.sizes[0]!.label, 1, product.price);
                toast.success(`${product.name} added to bag`);
              }}
              className="flex flex-1 items-center justify-center gap-2 bg-gold px-3 py-2.5 text-[0.65rem] tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> ADD TO BAG
            </button>
            <button
              type="button"
              onClick={() => setQuick(true)}
              aria-label={`Quick view ${product.name}`}
              className="grid h-auto w-11 place-items-center border border-border bg-background/90 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-1 text-gold">
          <Star className="h-3 w-3 fill-gold" />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-gold">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs tracking-wide text-muted-foreground">
          {product.families.join(" · ")}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </div>
      </div>

      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-4/5 w-full bg-secondary" />
      <div className="mt-4 h-3 w-20 bg-secondary" />
      <div className="mt-3 h-5 w-40 bg-secondary" />
      <div className="mt-3 h-3 w-28 bg-secondary" />
    </div>
  );
}
