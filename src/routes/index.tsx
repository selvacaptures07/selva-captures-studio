import { createFileRoute, Link } from "@tanstack/react-router";
import { HERO, GALLERY, SERVICE_IMAGES } from "@/lib/photos";
import { BRAND, SERVICES } from "@/lib/site-data";

const hero = HERO;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Selva Captures — Wedding Photography & Cinematic Films" },
      {
        name: "description",
        content:
          "Selva Captures is a premium wedding photography studio capturing candid, traditional and cinematic wedding stories.",
      },
      { property: "og:title", content: "Selva Captures — Wedding Photography" },
      {
        property: "og:description",
        content: "Capturing Moments, Creating Memories. Wedding photography and cinematic wedding films.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="relative min-h-[80vh] overflow-hidden">
        <img
          src={hero}
          alt="Wedding couple portrait at golden hour by Selva Captures"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center fade-up">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold sm:text-xs">{BRAND.name}</p>
          <h1 className="mt-5 font-display text-3xl leading-tight sm:text-6xl">
            <span className="text-gradient-gold">Capturing Moments,</span>
            <br />
            Creating Memories
          </h1>
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-base">
            Wedding Photography &amp; Cinematic Stories
          </p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/services" className="btn-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
              View Services
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl text-gradient-gold-deep sm:text-4xl">A Studio Built on Emotion</h2>
          <div className="mx-auto my-6 h-px w-24 bg-gold-deep/50" />
          <p className="text-base leading-relaxed text-ink">
            Selva Captures is a professional photography studio dedicated to capturing genuine emotions, beautiful
            celebrations and unforgettable wedding moments.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-gold-deep hover:opacity-80"
          >
            More About Us
          </Link>
        </div>
      </section>

      <section className="section-light border-t border-gold-deep/20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center font-display text-3xl text-gradient-gold-deep sm:text-4xl">What We Offer</h2>
          <div className="mx-auto my-6 h-px w-24 bg-gold-deep/50" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s, i) => (
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
                  <h3 className="font-display text-lg text-gold-deep">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-outline-ink rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center font-display text-3xl text-gradient-gold sm:text-4xl">Recent Work</h2>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3">
          {GALLERY.slice(0, 6).map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={1000}
              height={1250}
              loading="lazy"
              className="h-52 w-full rounded-sm border border-border object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-80"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-gold inline-block rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
            View Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
