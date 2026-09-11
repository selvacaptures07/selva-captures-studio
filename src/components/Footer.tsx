import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import { BRAND } from "@/lib/site-data";

const logo = logoAsset.url;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2">
        <div>
          <img
            src={logo}
            alt="Selva Captures logo"
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 rounded-full"
          />
          <h3 className="mt-4 text-2xl uppercase tracking-[0.2em] text-gradient-gold">{BRAND.name}</h3>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{BRAND.tagline}</p>
          <p className="mt-4 font-display text-lg text-foreground/90">"{BRAND.line}"</p>
        </div>

        <div className="space-y-3 text-sm sm:text-right">
          <p>
            <a href={`tel:${BRAND.phoneRaw}`} className="transition-colors hover:text-gold">
              {BRAND.phone}
            </a>
          </p>
          <p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
            >
              @{BRAND.instagram}
            </a>
          </p>
          <p>
            <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-gold">
              {BRAND.email}
            </a>
          </p>
          <p className="pt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.{" "}
            <Link to="/admin/login" className="hover:text-gold">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
