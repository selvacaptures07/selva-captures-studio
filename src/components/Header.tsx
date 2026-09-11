import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
import { BRAND } from "@/lib/site-data";

const logo = logoAsset.url;

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:px-5 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Selva Captures logo"
            width={44}
            height={44}
            className="h-9 w-9 shrink-0 rounded-full sm:h-11 sm:w-11"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base tracking-[0.16em] text-gradient-gold uppercase sm:text-lg">
              {BRAND.name}
            </span>
            <span className="block truncate text-[9px] uppercase tracking-[0.35em] text-muted-foreground sm:text-[10px]">
              {BRAND.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" hash="enquiry" className="btn-gold rounded-sm px-5 py-2 text-xs uppercase tracking-[0.2em]">
            Enquire Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-gold lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-[0.18em] text-foreground/85"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            hash="enquiry"
            onClick={() => setOpen(false)}
            className="btn-gold mt-3 rounded-sm px-5 py-3 text-center text-xs uppercase tracking-[0.2em]"
          >
            Enquire Now
          </Link>
        </nav>
      )}
    </header>
  );
}
