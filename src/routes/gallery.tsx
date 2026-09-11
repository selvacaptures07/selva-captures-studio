import { createFileRoute } from "@tanstack/react-router";
import { GALLERY } from "@/lib/photos";

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
      <h1 className="mt-4 text-center font-display text-3xl text-gradient-gold sm:text-5xl">Moments We Framed</h1>
      <div className="mx-auto my-8 h-px w-24 bg-gold/60" />

      <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {GALLERY.map((p) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={1000}
            height={1250}
            loading="lazy"
            className="w-full break-inside-avoid rounded-sm border border-border object-cover transition-transform duration-500 hover:scale-[1.01]"
          />
        ))}
      </div>
    </section>
  );
}
