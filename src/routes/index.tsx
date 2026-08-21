import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-sarkar.jpg";
import storyImg from "@/assets/story.jpg";
import giftImg from "@/assets/gift-set.jpg";
import { PageShell, PromoStrip } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, FAMILIES, products, testimonials } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarkar Perfumes — Luxury Oud, Attars & Parfums | Crafted for Presence" },
      {
        name: "description",
        content:
          "Shop Sarkar Perfumes: long-lasting oud, amber, musk and leather parfums plus alcohol-free attars and gift sets. Free shipping in India above ₹1,499.",
      },
      { property: "og:title", content: "Sarkar Perfumes — A Scent That Leaves a Mark" },
      {
        property: "og:description",
        content: "Luxury Indian parfums, attars and gift sets. Crafted for Presence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchPriority: "high" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.bestseller);
  const arrivals = products.filter((p) => p.isNew);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={heroImg}
          alt="Matte black Sarkar perfume bottle with gold cap in golden smoke"
          width={1600}
          height={1104}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-40">
          <div className="max-w-xl fade-up">
            <p className="text-[0.6rem] tracking-[0.45em] text-gold uppercase">Crafted for Presence</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-cream md:text-7xl">
              A Scent That
              <br />
              Leaves a Mark
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              High-concentration parfums and alcohol-free attars, composed in India and filled in
              matte-black crest bottles. Built to last through heat, distance and long evenings.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/collection/$slug"
                params={{ slug: "unisex" }}
                className="bg-gold px-8 py-4 text-[0.65rem] tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                SHOP NOW
              </Link>
              <Link
                to="/collection/$slug"
                params={{ slug: "new-arrivals" }}
                className="border border-gold/50 px-8 py-4 text-[0.65rem] tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-accent-foreground"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PromoStrip />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead eyebrow="Browse" title="Shop by Category" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden border border-border"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                width={800}
                height={1000}
                className="h-64 w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-cream">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.copy}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.6rem] tracking-[0.25em] text-gold">
                  DISCOVER <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHead eyebrow="Featured Collection" title="Best Sellers" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Fragrance families */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead eyebrow="Fragrance Families" title="Find Your Accord" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FAMILIES.map((f) => (
            <Link
              key={f}
              to="/collection/$slug"
              params={{ slug: "unisex" }}
              search={{ family: f }}
              className="border border-border px-6 py-3 text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:border-gold hover:text-gold"
            >
              {f}
            </Link>
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="border-y border-border surface-panel">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2">
          <img
            src={storyImg}
            alt="Brass attar vials and a copper still in the Sarkar atelier"
            loading="lazy"
            width={1400}
            height={1000}
            className="w-full object-cover shadow-luxe"
          />
          <div>
            <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">Our Story</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Indian perfumery,
              <br />
              refined for today
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              India has worn perfume oil for centuries — attar pressed into the wrist, oud smoked
              through fabric, rose distilled at dawn. Sarkar takes that inheritance and composes it
              with modern precision: higher oil load, cleaner drydowns, and no shortcuts on raw
              material.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every batch is macerated for a minimum of six weeks before filling, which is why our
              parfums open softer and stay far longer than the market average.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["30%", "Oil concentration"],
                ["12 hrs", "Average longevity"],
                ["6 wks", "Minimum maceration"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-gold">{n}</div>
                  <div className="mt-1 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead eyebrow="Just Landed" title="New Arrivals" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {arrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Gift sets */}
      <section className="relative overflow-hidden border-y border-border bg-ink">
        <img
          src={giftImg}
          alt="Sarkar gift set with matte black crest box, corded bag and two parfums"
          loading="lazy"
          width={1408}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-lg">
            <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">Gifting</p>
            <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
              Wrapped in the crest box
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Matte-black rigid boxes with gold-foil SARKAR lettering, a cream information card and a
              corded carry bag. Add a handwritten note at checkout — we never include a price slip.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "gift-sets" }}
              className="mt-8 inline-block bg-gold px-8 py-4 text-[0.65rem] tracking-[0.25em] text-accent-foreground"
            >
              SHOP GIFT SETS
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead eyebrow="Reviews" title="What Our Clients Say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-border bg-card p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 text-[0.65rem] tracking-[0.2em] uppercase">
                {t.name} <span className="text-muted-foreground">· {t.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram gallery */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionHead eyebrow="@sarkarperfumes" title="From the Atelier" />
          <div className="mt-10 grid grid-cols-3 gap-3 lg:grid-cols-6">
            {products.slice(0, 6).map((p) => (
              <a
                key={p.slug}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-border"
              >
                <img
                  src={p.image}
                  alt={`${p.name} on the Sarkar Perfumes Instagram`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="aspect-square w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl md:text-5xl">{title}</h2>
      <div className="rule-gold mx-auto mt-6 w-20" />
    </div>
  );
}
