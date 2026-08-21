import type { ReactNode } from "react";
import { MessageCircle, Truck, ShieldCheck, BadgeCheck, RefreshCcw } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const promises = [
  { icon: Truck, title: "Free Shipping", copy: "On orders above ₹1,499" },
  { icon: BadgeCheck, title: "100% Authentic", copy: "Batch-coded, house-filled" },
  { icon: ShieldCheck, title: "Secure Payments", copy: "UPI, cards & net banking" },
  { icon: RefreshCcw, title: "Easy Returns", copy: "7-day no-questions policy" },
];

export function PromoStrip() {
  return (
    <section className="border-y border-border bg-secondary/60" aria-label="Store promises">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 lg:grid-cols-4">
        {promises.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-5 w-5 shrink-0 text-gold" />
            <div>
              <div className="text-xs tracking-[0.18em] uppercase">{title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{copy}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919820041120"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Sarkar Perfumes on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 border border-gold/50 bg-card px-4 py-3 text-[0.65rem] tracking-[0.2em] text-gold shadow-luxe transition-colors hover:bg-gold hover:text-accent-foreground"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">WHATSAPP US</span>
    </a>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHeader({ title, blurb }: { title: string; blurb: string }) {
  return (
    <section className="border-b border-border surface-panel">
      <div className="mx-auto max-w-7xl px-5 py-16 text-center">
        <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">Sarkar Perfumes</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">{blurb}</p>
      </div>
    </section>
  );
}
