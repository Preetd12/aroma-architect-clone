import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell } from "@/components/site/Layout";
import { formatINR } from "@/lib/products";
import { lineProduct, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Sarkar Perfumes" },
      {
        name: "description",
        content: "Complete your Sarkar Perfumes order with secure UPI, card or net-banking payment.",
      },
      { property: "og:title", content: "Secure Checkout — Sarkar Perfumes" },
      { property: "og:description", content: "Complete your order securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cart, subtotal, discount, clearCart, hydrated } = useStore();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal - discount >= 1499 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discount + shipping;

  if (placed) {
    return (
      <PageShell>
        <div className="mx-auto max-w-xl px-5 py-32 text-center">
          <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">Order Confirmed</p>
          <h1 className="mt-4 font-display text-4xl">Thank you for your order</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            A confirmation has been sent to your email. Your crest box is packed and dispatched within
            24 hours.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
          >
            BACK TO HOME
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader title="Checkout" blurb="Delivery details and payment. Nothing is stored on this demo." />
      <div className="mx-auto max-w-7xl px-5 py-16">
        {!hydrated ? null : cart.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center">
            <h2 className="font-display text-2xl">There's nothing to check out</h2>
            <Link
              to="/collection/$slug"
              params={{ slug: "unisex" }}
              className="mt-6 inline-block bg-gold px-6 py-3 text-[0.65rem] tracking-[0.22em] text-accent-foreground"
            >
              SHOP THE HOUSE
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                clearCart();
                setPlaced(true);
              }}
              className="space-y-8"
            >
              <fieldset className="space-y-4 border border-border p-8">
                <legend className="px-2 font-display text-2xl">Contact</legend>
                <Field label="Full name" />
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
              </fieldset>

              <fieldset className="space-y-4 border border-border p-8">
                <legend className="px-2 font-display text-2xl">Delivery address</legend>
                <Field label="Address line 1" />
                <Field label="Address line 2" required={false} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" />
                  <Field label="State" />
                  <Field label="PIN code" />
                </div>
              </fieldset>

              <fieldset className="space-y-3 border border-border p-8">
                <legend className="px-2 font-display text-2xl">Payment</legend>
                {["UPI", "Credit / Debit card", "Net banking", "Cash on delivery"].map((m, i) => (
                  <label key={m} className="flex items-center gap-3 text-sm">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="accent-[var(--gold)]" />
                    {m}
                  </label>
                ))}
              </fieldset>

              <button
                type="submit"
                className="w-full bg-gold px-6 py-4 text-[0.65rem] tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                PLACE ORDER · {formatINR(total)}
              </button>
            </form>

            <aside className="h-fit border border-border p-8">
              <h2 className="font-display text-2xl">Order Summary</h2>
              <ul className="mt-6 space-y-4 border-b border-border pb-6">
                {cart.map((l) => {
                  const p = lineProduct(l.slug);
                  return (
                    <li key={`${l.slug}-${l.size}`} className="flex gap-4 text-sm">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={120}
                        height={150}
                        className="h-20 w-16 border border-border object-cover"
                      />
                      <div className="flex-1">
                        <div>{p.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {l.size} × {l.qty}
                        </div>
                      </div>
                      <div>{formatINR(l.price * l.qty)}</div>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatINR(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Discount</dt>
                    <dd className="text-gold">- {formatINR(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-4 font-display text-2xl">
                  <dt>Total</dt>
                  <dd>{formatINR(total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Field({ label, type = "text", required = true }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">{label}</span>
      <input
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
