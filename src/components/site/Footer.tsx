import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";

const shopLinks = [
  { label: "Men", slug: "men" },
  { label: "Women", slug: "women" },
  { label: "Unisex", slug: "unisex" },
  { label: "Attars", slug: "attars" },
  { label: "Gift Sets", slug: "gift-sets" },
  { label: "Travel Sprays", slug: "travel-sprays" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sarkar Perfumes composes long-wearing parfums and alcohol-free attars in India, using
              oil concentrations built for warm climates.
            </p>
            <div className="mt-6 flex gap-4 text-muted-foreground">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gold">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="hover:text-gold">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">Shop</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {shopLinks.map((l) => (
                <li key={l.slug}>
                  <Link to="/collection/$slug" params={{ slug: l.slug }} className="hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">House</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-gold">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/collection/$slug" params={{ slug: "new-arrivals" }} className="hover:text-gold">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-gold">
                  Wishlist
                </Link>
              </li>
            </ul>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" /> +91 98200 41120
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" /> care@sarkarperfumes.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-gold" /> Atelier No. 4, Fort, Mumbai 400001
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">The Sarkar Letter</h2>
            <p className="mt-5 text-sm text-muted-foreground">
              New releases, private batches and ₹300 off your first order.
            </p>
            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
                toast.success("You're on the list. Check your inbox for the welcome code.");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold px-6 py-3 text-[0.65rem] tracking-[0.24em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-[0.65rem] tracking-[0.2em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} SARKAR PERFUMES</span>
          <span className="uppercase">Crafted for Presence</span>
        </div>
      </div>
    </footer>
  );
}
