import * as React from "react";
import { products, type Product } from "./products";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
  price: number;
}

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  hydrated: boolean;
  addToCart: (product: Product, size: string, qty: number, price: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  removeLine: (slug: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  subtotal: number;
  count: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
}

const StoreContext = React.createContext<StoreValue | null>(null);

const COUPONS: Record<string, { pct: number; label: string }> = {
  SARKAR10: { pct: 10, label: "10% off your order" },
  PRESENCE15: { pct: 15, label: "15% off — welcome offer" },
};

const CART_KEY = "sarkar.cart";
const WISH_KEY = "sarkar.wishlist";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [coupon, setCoupon] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  React.useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value: StoreValue = React.useMemo(() => {
    const subtotal = cart.reduce((sum, l) => sum + l.price * l.qty, 0);
    const pct = coupon ? (COUPONS[coupon]?.pct ?? 0) : 0;
    return {
      cart,
      wishlist,
      hydrated,
      subtotal,
      count: cart.reduce((n, l) => n + l.qty, 0),
      coupon,
      discount: Math.round((subtotal * pct) / 100),
      addToCart: (product, size, qty, price) =>
        setCart((prev) => {
          const i = prev.findIndex((l) => l.slug === product.slug && l.size === size);
          if (i === -1) return [...prev, { slug: product.slug, size, qty, price }];
          const next = [...prev];
          const existing = next[i]!;
          next[i] = { ...existing, qty: existing.qty + qty };
          return next;
        }),
      setQty: (slug, size, qty) =>
        setCart((prev) =>
          prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      removeLine: (slug, size) =>
        setCart((prev) => prev.filter((l) => !(l.slug === slug && l.size === size))),
      clearCart: () => {
        setCart([]);
        setCoupon(null);
      },
      toggleWishlist: (slug) =>
        setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      applyCoupon: (code) => {
        const key = code.trim().toUpperCase();
        if (!COUPONS[key]) return { ok: false, message: "That code isn't valid." };
        setCoupon(key);
        return { ok: true, message: COUPONS[key].label };
      },
      removeCoupon: () => setCoupon(null),
    };
  }, [cart, wishlist, coupon, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function lineProduct(slug: string) {
  return products.find((p) => p.slug === slug)!;
}
