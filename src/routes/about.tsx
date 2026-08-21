import { createFileRoute } from "@tanstack/react-router";
import storyImg from "@/assets/story.jpg";
import { PageHeader, PageShell, PromoStrip } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sarkar Perfumes — Indian Perfumery, Refined" },
      {
        name: "description",
        content:
          "Sarkar Perfumes composes high-concentration parfums and alcohol-free attars in India, macerated six weeks and filled by hand in matte-black crest bottles.",
      },
      { property: "og:title", content: "About Sarkar Perfumes" },
      { property: "og:description", content: "Indian perfumery, refined for today. Crafted for Presence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHeader
        title="About Sarkar"
        blurb="A house built on perfume oil, patience and the belief that a scent should announce you before you speak."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:grid-cols-2">
        <img
          src={storyImg}
          alt="Brass attar vials and copper distillation equipment in the Sarkar atelier"
          loading="lazy"
          width={1400}
          height={1000}
          className="w-full object-cover shadow-luxe"
        />
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Sarkar began with a small cabinet of attars and a stubborn objection: most perfume sold in
            India is thin. It opens loudly, flatters for an hour and disappears. We wanted the
            opposite — a composition that starts quietly and refuses to leave.
          </p>
          <p>
            So we build around oil. Our extraits carry up to 30% concentration, macerated for a
            minimum of six weeks before a single bottle is filled. Raw materials are sourced where
            they are best: agarwood from Assam, rose from Kannauj, sandalwood from Mysore stock,
            vetiver from Tamil Nadu.
          </p>
          <p>
            Nothing is mass-filled. Every bottle is batch-coded, hand-capped and packed in a
            matte-black rigid box with gold-foil crest and a cream information card that tells you
            exactly what is inside.
          </p>
          <p className="text-cream">Crafted for Presence — and we mean it literally.</p>
        </div>
      </section>
      <PromoStrip />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Sourcing", "Direct relationships with distillers in Kannauj, Assam and Mysore — no broker chains."],
            ["Composition", "Every accord is built in-house and revised across at least nine trial batches."],
            ["Filling", "Hand-capped, batch-coded and quality-checked in small runs of 300 bottles."],
          ].map(([t, c]) => (
            <div key={t} className="border border-border p-8">
              <h2 className="font-display text-2xl">{t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
