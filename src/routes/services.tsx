import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";
import { SERVICE_IMAGES } from "@/lib/photos";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Selva Captures Photography" },
      {
        name: "description",
        content:
          "Wedding, candid, traditional, pre-wedding and event photography plus cinematic wedding films by Selva Captures.",
      },
      { property: "og:title", content: "Photography Services — Selva Captures" },
      {
        property: "og:description",
        content: "Wedding photography, candid coverage, videography and cinematic wedding films.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <section className="section-light">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-gold-deep">Our Services</p>
        <h1 className="mt-4 text-center font-display text-3xl text-gradient-gold-deep sm:text-5xl">
          Photography &amp; Films
        </h1>
        <div className="mx-auto my-8 h-px w-24 bg-gold-deep/50" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="card-light overflow-hidden rounded-sm">
              <img
                src={SERVICE_IMAGES[i]}
                alt={s.title}
                width={1000}
                height={1250}
                loading="lazy"
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="font-display text-lg text-gold-deep">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/packages" className="btn-outline-ink rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
