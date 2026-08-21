import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatINR, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToCart } = useStore();
  const [size, setSize] = useState(product.sizes[0]!.label);
  const multiplier = product.sizes.find((s) => s.label === size)?.multiplier ?? 1;
  const price = product.price * multiplier;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card p-0">
        <div className="grid gap-0 md:grid-cols-2">
          <img
            src={product.image}
            alt={`${product.name} perfume bottle`}
            loading="lazy"
            width={800}
            height={1000}
            className="hidden h-full w-full object-cover md:block"
          />
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-left font-display text-3xl">{product.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {product.subtitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSize(s.label)}
                  className={`border px-3 py-2 text-xs tracking-[0.15em] transition-colors ${
                    size === s.label
                      ? "border-gold text-gold"
                      : "border-border text-muted-foreground hover:border-gold/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-5 text-lg font-semibold">{formatINR(price)}</div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product, size, 1, price);
                  toast.success(`${product.name} (${size}) added to bag`);
                  onOpenChange(false);
                }}
                className="bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
              >
                ADD TO BAG
              </button>
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                onClick={() => onOpenChange(false)}
                className="border border-border px-6 py-3 text-[0.65rem] tracking-[0.22em] text-foreground hover:border-gold hover:text-gold"
              >
                FULL DETAILS
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
