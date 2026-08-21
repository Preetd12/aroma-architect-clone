import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sarkar Perfumes — Support, Orders & Gifting" },
      {
        name: "description",
        content:
          "Reach the Sarkar Perfumes team for order help, fragrance advice or bulk gifting. Email, phone and WhatsApp support, Monday to Saturday.",
      },
      { property: "og:title", content: "Contact Sarkar Perfumes" },
      { property: "og:description", content: "Order support, fragrance advice and corporate gifting enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHeader title="Contact Us" blurb="Fragrance advice, order help and gifting enquiries." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "care@sarkarperfumes.in" },
            { icon: Phone, label: "Phone & WhatsApp", value: "+91 98200 41120" },
            { icon: MapPin, label: "Atelier", value: "14 Rampart Row, Fort, Mumbai 400001" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 border border-border p-6">
              <Icon className="h-5 w-5 shrink-0 text-gold" />
              <div>
                <div className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                  {label}
                </div>
                <div className="mt-1 text-sm">{value}</div>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Support hours: Monday to Saturday, 10:00 – 19:00 IST. We reply to every message within one
            business day.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 border border-border p-8"
        >
          <h2 className="font-display text-2xl">Send a message</h2>
          <Field label="Name" name="name" />
          <Field label="Email" name="email" type="email" />
          <Field label="Order number (optional)" name="order" required={false} />
          <label className="block">
            <span className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
              Message
            </span>
            <textarea
              required
              rows={5}
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-gold px-6 py-4 text-[0.65rem] tracking-[0.25em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            SEND MESSAGE
          </button>
          {sent && (
            <p role="status" className="text-xs text-gold">
              Thank you — your message is with our care team.
            </p>
          )}
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
