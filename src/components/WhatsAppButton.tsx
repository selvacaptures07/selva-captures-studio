import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/site-data";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-gold/60 bg-[#128C7E] px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white shadow-lg transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
