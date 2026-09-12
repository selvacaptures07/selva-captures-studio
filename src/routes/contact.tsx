import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Instagram, Mail } from "lucide-react";
import { BRAND } from "@/lib/site-data";
import { EnquiryForm } from "@/components/EnquiryForm";
import { useSiteSettings } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Enquiry — Selva Captures" },
      {
        name: "description",
        content: "Call, WhatsApp or email Selva Captures, or send a wedding photography enquiry online.",
      },
      { property: "og:title", content: "Contact Selva Captures" },
      { property: "og:description", content: "Get in touch for wedding photography and cinematic films." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { data: settings } = useSiteSettings();
  const whatsappDisplay = settings.whatsapp === "919344160526" ? "+91 9344160526" : `+${settings.whatsapp}`;
  const actions = [
    { label: "Call Now", href: `tel:${settings.phone_raw}`, Icon: Phone },
    { label: "WhatsApp", href: `https://wa.me/${settings.whatsapp}`, Icon: MessageCircle },
    { label: "Instagram", href: BRAND.instagramUrl, Icon: Instagram },
    { label: "Email Us", href: `mailto:${BRAND.email}`, Icon: Mail },
  ];
  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <p className="text-center text-xs uppercase tracking-[0.4em] text-gold">Contact</p>
      <h1 className="mt-4 text-center font-display text-4xl text-gradient-gold sm:text-5xl">Let's Talk</h1>
      <div className="mx-auto my-8 h-px w-24 bg-gold/60" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="btn-outline-gold flex items-center justify-center gap-2 rounded-sm px-5 py-4 text-xs uppercase tracking-[0.2em]"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>

      <div className="mt-12 grid gap-3 rounded-sm border border-border bg-card/40 p-8 text-sm">
        <p>
          <span className="text-gold">Phone: </span>
          <a href={`tel:${settings.phone_raw}`} className="hover:text-gold">
            {settings.phone}
          </a>
        </p>
        <p>
          <span className="text-gold">WhatsApp: </span>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-gold">
            {whatsappDisplay}
          </a>
        </p>
        <p>
          <span className="text-gold">Instagram: </span>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
            @{BRAND.instagram}
          </a>
        </p>
        <p>
          <span className="text-gold">Email: </span>
          <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
            {BRAND.email}
          </a>
        </p>
      </div>

      <div id="enquiry" className="mt-20 scroll-mt-24">
        <h2 className="text-center font-display text-3xl text-gradient-gold sm:text-4xl">Send an Enquiry</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Share your event details and we will get back to you shortly.
        </p>
        <div className="mt-10 rounded-sm border border-border bg-card/40 p-6 sm:p-9">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
