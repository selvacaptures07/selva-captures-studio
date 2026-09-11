import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";
import g1 from "@/assets/g1.jpg";
import g3 from "@/assets/g3.jpg";
import g5 from "@/assets/g5.jpg";
import { BRAND, SERVICES } from "@/lib/site-data";

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
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={hero}
          alt="Wedding couple portrait at golden hour by Selva Captures"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center fade-up">
          <img src={logo} alt="Selva Captures logo" width={96} height={96} className="h-20 w-20 sm:h-24 sm:w-24" />
          <p className="mt-6 text-xs uppercase tracking-[0.5em] text-gold">{BRAND.name}</p>
          <h1 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">
            <span className="text-gradient-gold">Capturing Moments,</span>
            <br />
            Creating Memories
          </h1>
          <p className="mt-5 text-sm uppercase tracking-[0.28em] text-muted-foreground sm:text-base">
            Wedding Photography &amp; Cinematic Stories
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
              View Services
            </Link>
            <Link to="/contact" className="btn-outline-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="font-display text-3xl text-gradient-gold sm:text-4xl">A Studio Built on Emotion</h2>
        <div className="mx-auto my-6 h-px w-24 bg-gold/60" />
        <p className="text-base leading-relaxed text-foreground/85">
          Selva Captures is a professional photography studio dedicated to capturing genuine emotions, beautiful
          celebrations and unforgettable wedding moments.
        </p>
        <Link
          to="/about"
          className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-gold hover:opacity-80"
        >
          More About Us
        </Link>
      </section>

      <section className="border-y border-border bg-card/30 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl text-gradient-gold sm:text-4xl">What We Offer</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s) => (
              <div key={s.title} className="rounded-sm border border-border bg-background/60 p-6">
                <h3 className="text-lg text-gold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-outline-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center font-display text-3xl text-gradient-gold sm:text-4xl">Recent Work</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[g1, g3, g5].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Wedding photography by Selva Captures"
              width={1000}
              height={1250}
              loading="lazy"
              className="h-80 w-full rounded-sm border border-border object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em]">
            View Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
