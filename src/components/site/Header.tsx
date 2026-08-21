import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Men", to: "/collection/$slug" as const, slug: "men" },
  { label: "Women", to: "/collection/$slug" as const, slug: "women" },
  { label: "Unisex", to: "/collection/$slug" as const, slug: "unisex" },
  { label: "Attars", to: "/collection/$slug" as const, slug: "attars" },
  { label: "Gift Sets", to: "/collection/$slug" as const, slug: "gift-sets" },
  { label: "New Arrivals", to: "/collection/$slug" as const, slug: "new-arrivals" },
  { label: "About Us", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const { count, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = q.trim()
    ? products
        .filter((p) => (p.name + p.families.join(" ")).toLowerCase().includes(q.trim().toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="border-b border-border/60 bg-ink py-2 text-center text-[0.6rem] tracking-[0.28em] text-muted-foreground">
        FREE SHIPPING ACROSS INDIA ON ORDERS ABOVE ₹1,499
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <button
          type="button"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <nav className="hidden items-center gap-6 text-[0.65rem] tracking-[0.2em] lg:flex">
          {nav.map((item) =>
            item.slug ? (
              <Link
                key={item.label}
                to={item.to}
                params={{ slug: item.slug }}
                activeProps={{ className: "text-gold" }}
                className="text-muted-foreground uppercase transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="text-muted-foreground uppercase transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-muted-foreground transition-colors hover:text-gold"
          >
            <Search className="h-[1.05rem] w-[1.05rem]" />
          </button>
          <button
            type="button"
            aria-label="Account"
            onClick={() => toast("Accounts are coming soon to Sarkar Perfumes.")}
            className="hidden text-muted-foreground transition-colors hover:text-gold sm:block"
          >
            <User className="h-[1.05rem] w-[1.05rem]" />
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="relative text-muted-foreground transition-colors hover:text-gold"
          >
            <Heart className="h-[1.05rem] w-[1.05rem]" />
            {wishlist.length > 0 && <Dot value={wishlist.length} />}
          </Link>
          <Link
            to="/cart"
            aria-label={`Shopping bag, ${count} items`}
            className="relative text-muted-foreground transition-colors hover:text-gold"
          >
            <ShoppingBag className="h-[1.05rem] w-[1.05rem]" />
            {count > 0 && <Dot value={count} />}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card px-5 py-4">
          <div className="mx-auto max-w-3xl">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search oud, rose, leather…"
              aria-label="Search fragrances"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            {q.trim() && (
              <ul className="mt-3 divide-y divide-border border border-border">
                {results.length === 0 && (
                  <li className="px-4 py-4 text-sm text-muted-foreground">
                    No fragrances match “{q}”. Try “oud”, “musk” or “rose”.
                  </li>
                )}
                {results.map((p) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setQ("");
                        navigate({ to: "/product/$slug", params: { slug: p.slug } });
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary"
                    >
                      <img src={p.image} alt="" width={40} height={50} className="h-12 w-10 object-cover" />
                      <span className="text-sm">{p.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-sm surface-panel border-r border-border p-6">
            <div className="flex items-center justify-between">
              <Logo compact />
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col">
              {nav.map((item) =>
                item.slug ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    params={{ slug: item.slug }}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-4 text-sm tracking-[0.2em] uppercase hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-4 text-sm tracking-[0.2em] uppercase hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Dot({ value }: { value: number }) {
  return (
    <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-accent-foreground">
      {value}
    </span>
  );
}
