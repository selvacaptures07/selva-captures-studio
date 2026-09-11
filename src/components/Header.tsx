import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { BRAND } from "@/lib/site-data";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Selva Captures logo" width={44} height={44} className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-[0.18em] text-gradient-gold uppercase">
              {BRAND.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
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
