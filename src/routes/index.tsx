import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroBottle from "@/assets/hero-bottle.jpg";
import heritageImg from "@/assets/heritage.jpg";
import pOud from "@/assets/p-oud.jpg";
import pRose from "@/assets/p-rose.jpg";
import pMusk from "@/assets/p-musk.jpg";
import pJannat from "@/assets/p-jannat.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarkar Perfumes — Handcrafted Indian Attars & Oud" },
      {
        name: "description",
        content:
          "Sarkar Perfumes crafts alcohol-free attars, oud and mukhallats using traditional Kannauj deg-bhapka distillation. Shop long-lasting Indian fragrances.",
      },
      { property: "og:title", content: "Sarkar Perfumes — Handcrafted Indian Attars & Oud" },
      {
        property: "og:description",
        content:
          "Alcohol-free attars, royal oud and mukhallats distilled the traditional way in Kannauj.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Royal Oud", notes: "Agarwood · Saffron · Amber", price: "₹2,450", img: pOud, tag: "Bestseller" },
  { name: "Gulab Kannauj", notes: "Rose Damask · Honey · Sandal", price: "₹1,890", img: pRose, tag: "" },
  { name: "White Musk", notes: "Musk · Vanilla · Iris", price: "₹1,250", img: pMusk, tag: "" },
  { name: "Jannat-ul-Firdaus", notes: "Herbs · Spice · Vetiver", price: "₹2,100", img: pJannat, tag: "New" },
];

const collections = [
  { title: "Attars", copy: "Alcohol-free oils, aged in sandalwood base." },
  { title: "Oud & Mukhallat", copy: "Deep, resinous blends for the evening." },
  { title: "Ruh & Florals", copy: "Single-flower distillations of the season." },
];

function Index() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-2xl tracking-[0.3em] uppercase">
            Sarkar
          </a>
          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
            {["Attars", "Oud", "Gifting", "Heritage"].map((l) => (
              <a key={l} href="#shop" className="text-muted-foreground transition-colors hover:text-accent">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#shop"
            className="border border-accent px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-accent"
          >
            Shop
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <p className="eyebrow text-gold-soft">Since 1932 · Kannauj, India</p>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
                The scent of a<br />
                <span className="text-gilded italic">thousand roses</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
                Attars distilled in copper deg and bhapka, aged in sandalwood oil, and bottled by
                hand. No alcohol. No shortcuts. Only the raw perfume of the field.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#shop"
                  className="bg-gold px-8 py-3 text-[0.7rem] uppercase tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Explore the house
                </a>
                <a href="#heritage" className="text-[0.7rem] uppercase tracking-[0.25em] text-gold-soft">
                  Our craft →
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroBottle}
                alt="Sarkar Royal Oud attar bottle on emerald silk with oud wood and roses"
                width={1408}
                height={1200}
                className="w-full object-cover shadow-luxe"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-14 gap-y-3 px-6 py-5 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            <span>Alcohol free</span>
            <span>Hand distilled</span>
            <span>12+ hour longevity</span>
            <span>Free shipping over ₹999</span>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="eyebrow">The Collection</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Signature Attars</h2>
            <div className="rule-gold mx-auto mt-6 w-24" />
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article key={p.name} className="group">
                <div className="relative overflow-hidden bg-secondary">
                  <img
                    src={p.img}
                    alt={`${p.name} attar bottle by Sarkar Perfumes`}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="absolute left-0 top-4 bg-primary px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground">
                      {p.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">{p.notes}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm">{p.price}</span>
                  <button className="text-[0.65rem] uppercase tracking-[0.2em] text-accent-foreground underline decoration-accent underline-offset-4">
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="heritage" className="bg-secondary">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2">
            <img
              src={heritageImg}
              alt="Artisans distilling rose attar in copper deg and bhapka vessels in Kannauj"
              loading="lazy"
              width={1200}
              height={912}
              className="w-full object-cover shadow-luxe"
            />
            <div>
              <p className="eyebrow">Heritage</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Four generations of <span className="italic">deg &amp; bhapka</span>
              </h2>
              <div className="rule-gold mt-6 w-20" />
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Every Sarkar attar begins before sunrise, when petals are still cool with dew. They
                are loaded into copper degs, sealed with clay, and coaxed over a wood fire for hours
                until the vapour condenses into sandalwood oil.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The oil is then aged in leather kuppis — sometimes for years — until it settles into
                the scent our family has carried since 1932.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["90+", "Years of craft"],
                  ["40k", "Petals per tola"],
                  ["100%", "Alcohol free"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-3xl text-accent-foreground">{n}</div>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {collections.map((c) => (
              <a
                key={c.title}
                href="#shop"
                className="group border border-border p-10 transition-colors hover:border-accent"
              >
                <h3 className="font-display text-3xl">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.copy}</p>
                <span className="mt-8 inline-block text-[0.65rem] uppercase tracking-[0.25em] text-accent-foreground">
                  Discover →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="eyebrow text-gold-soft">The Perfumer's Letter</p>
            <h2 className="mt-4 font-display text-4xl">Notes from Kannauj</h2>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Seasonal harvests, new distillations and private-batch releases.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="flex-1 border border-primary-foreground/25 bg-transparent px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gold px-7 py-3 text-[0.7rem] uppercase tracking-[0.25em] text-accent-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
          <span className="font-display text-xl uppercase tracking-[0.35em]">Sarkar</span>
          <p className="text-xs text-muted-foreground">
            Perfumers of Kannauj, Uttar Pradesh · hello@sarkarperfumes.com
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Sarkar Perfumes
          </p>
        </div>
      </footer>
    </div>
  );
}
