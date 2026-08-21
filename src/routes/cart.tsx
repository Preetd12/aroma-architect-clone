import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { formatINR } from "@/lib/products";
import { lineProduct, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Shopping Bag — Sarkar Perfumes" },
      {
        name: "description",
        content: "Review your Sarkar Perfumes bag, apply a coupon and continue to secure checkout.",
      },
      { property: "og:title", content: "Your Shopping Bag — Sarkar Perfumes" },
      { property: "og:description", content: "Review your bag and continue to checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeLine, subtotal, discount, coupon, applyCoupon, removeCoupon, hydrated } =
    useStore();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  const shipping = subtotal === 0 || subtotal - discount >= 1499 ? 0 : 99;
  const total = subtotal - discount + shipping;

  return (
    <PageShell>
      <PageHeader title="Shopping Bag" blurb="Everything you've selected from the house." />
      <div className="mx-auto max-w-7xl px-5 py-16">
        {!hydrated ? null : cart.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center">
            <h2 className="font-display text-2xl">Your bag is empty</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing here yet — start with a best seller or the travel quintet.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "unisex" }}
              className="mt-6 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
            >
              SHOP THE HOUSE
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div className="divide-y divide-border border-y border-border">
              {cart.map((line) => {
                const p = lineProduct(line.slug);
                return (
                  <div key={`${line.slug}-${line.size}`} className="flex gap-5 py-6">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={200}
                      height={250}
                      className="h-32 w-24 border border-border object-cover"
                    />
                    <div className="flex-1">
                      <Link
                        to="/product/$slug"
                        params={{ slug: p.slug }}
                        className="font-display text-xl hover:text-gold"
                      >
                        {p.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {line.size} · {p.subtitle}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                            className="px-3 py-2 text-muted-foreground hover:text-gold"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                            className="px-3 py-2 text-muted-foreground hover:text-gold"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.slug, line.size)}
                          className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase hover:text-gold"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-sm">{formatINR(line.price * line.qty)}</div>
                  </div>
                );
              })}
            </div>

            <aside className="h-fit border border-border p-8">
              <h2 className="font-display text-2xl">Order Summary</h2>

              <div className="mt-6">
                {coupon ? (
                  <div className="flex items-center justify-between border border-gold/40 px-4 py-3 text-xs">
                    <span className="text-gold">{coupon} applied</span>
                    <button
                      type="button"
                      onClick={() => {
                        removeCoupon();
                        setMsg(null);
                      }}
                      className="text-muted-foreground uppercase hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMsg(applyCoupon(code));
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code"
                      aria-label="Coupon code"
                      className="flex-1 border border-border bg-background px-4 py-3 text-xs outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="border border-gold px-4 text-[0.6rem] tracking-[0.2em] text-gold"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {msg && (
                  <p className={`mt-2 text-xs ${msg.ok ? "text-gold" : "text-destructive"}`}>
                    {msg.message}
                  </p>
                )}
                <p className="mt-2 text-[0.65rem] text-muted-foreground">Try SARKAR10 or PRESENCE15.</p>
              </div>

              <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                {discount > 0 && <Row label="Discount" value={`- ${formatINR(discount)}`} gold />}
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
                <div className="flex justify-between border-t border-border pt-4 font-display text-2xl">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </dl>

              <Link
                to="/checkout"
                className="mt-8 block bg-gold px-6 py-4 text-center text-[0.65rem] tracking-[0.25em] text-accent-foreground"
              >
                PROCEED TO CHECKOUT
              </Link>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Row({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={gold ? "text-gold" : ""}>{value}</dd>
    </div>
  );
}
