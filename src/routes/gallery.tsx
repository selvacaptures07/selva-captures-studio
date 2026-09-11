import { createFileRoute } from "@tanstack/react-router";
import { PHOTOS } from "@/lib/photos";

const ALTS = [
  "Bride under a veil at a white floral wedding stage",
  "Bride and groom forehead-to-forehead couple portrait",
  "Black and white couple portrait in wedding attire",
  "Traditional garland exchange ceremony couple portrait",
  "Bride and groom kissing over the bouquet",
  "Couple in traditional attire embracing outdoors",
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Selva Captures Photography" },
      {
        name: "description",
        content: "A gallery of wedding, candid and pre-wedding photography by Selva Captures.",
      },
      { property: "og:title", content: "Gallery — Selva Captures" },
      { property: "og:description", content: "Wedding photography gallery by Selva Captures." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-center text-xs uppercase tracking-[0.4em] text-gold">Gallery</p>
      <h1 className="mt-4 text-center font-display text-4xl text-gradient-gold sm:text-5xl">Moments We Framed</h1>
      <div className="mx-auto my-8 h-px w-24 bg-gold/60" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={ALTS[i] ?? "Wedding photography by Selva Captures"}
            width={1000}
            height={1250}
            loading="lazy"
            className="h-80 w-full rounded-sm border border-border object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ))}
      </div>
    </section>
  );
}
