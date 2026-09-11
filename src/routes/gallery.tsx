import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";

const IMAGES = [
  { src: g1, alt: "Candid wedding ceremony moment with flower petals" },
  { src: g4, alt: "Traditional garland exchange ceremony" },
  { src: g2, alt: "Bridal jewellery detail" },
  { src: g3, alt: "Pre-wedding couple silhouette at sunset" },
  { src: g5, alt: "Wedding reception decor with golden lights" },
  { src: g6, alt: "Couple portrait in warm evening light" },
  { src: hero, alt: "Wedding couple portrait at golden hour" },
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
        {IMAGES.map((img) => (
          <img
            key={img.alt}
            src={img.src}
            alt={img.alt}
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
