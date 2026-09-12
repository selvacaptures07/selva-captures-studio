import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/lib/site-content";

export function WhatsAppButton() {
  const { data: settings } = useSiteSettings();
  return (
    <a
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-gold/45 bg-card/95 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-gold shadow-lg backdrop-blur transition-colors hover:bg-accent"
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
