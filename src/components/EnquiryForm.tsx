import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/lib/site-data";
import { usePackages } from "@/lib/site-content";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  event_type: z.string().trim().max(100),
  event_date: z.string().trim().max(20),
  event_location: z.string().trim().max(150),
  service: z.string().trim().max(100),
  selected_package: z.string().trim().max(100),
  message: z.string().trim().max(1000),
});

const field =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

export function EnquiryForm({ defaultService = "" }: { defaultService?: string }) {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(defaultService);
  const [selectedPackage, setSelectedPackage] = useState("");
  const { data: packages } = usePackages();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      event_type: String(fd.get("event_type") ?? ""),
      event_date: String(fd.get("event_date") ?? ""),
      event_location: String(fd.get("event_location") ?? ""),
      service: String(fd.get("service") ?? ""),
      selected_package: String(fd.get("selected_package") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setLoading(true);
    const v = parsed.data;
    const { error } = await supabase.from("enquiries").insert({
      name: v.name,
      phone: v.phone,
      email: v.email || null,
      event_type: v.event_type || null,
      event_date: v.event_date || null,
      event_location: v.event_location || null,
      service: v.service || null,
      selected_package: v.selected_package || null,
      message: v.message || null,
    });
    setLoading(false);

    if (error) {
      toast.error("Sorry, we couldn't send your enquiry. Please try again.");
      return;
    }
    toast.success("Thank you! We will contact you soon.");
    form.reset();
    setService("");
    setSelectedPackage("");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input name="name" required placeholder="Name" className={field} />
      <input name="phone" required placeholder="Phone Number" className={field} />
      <input name="email" type="email" placeholder="Email" className={field} />
      <input name="event_type" placeholder="Event Type (Wedding, Reception...)" className={field} />
      <input name="event_date" type="date" placeholder="Event Date" className={field} />
      <input name="event_location" placeholder="Event Location" className={field} />
      <select
        name="service"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className={`${field} sm:col-span-2`}
      >
        <option value="">Select a Service</option>
        {SERVICES.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title}
          </option>
        ))}
      </select>
      <select
        name="selected_package"
        value={selectedPackage}
        onChange={(e) => setSelectedPackage(e.target.value)}
        className={`${field} sm:col-span-2`}
      >
        <option value="">Select a Package</option>
        {packages.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name} — {item.price}
          </option>
        ))}
      </select>
      <textarea name="message" rows={4} placeholder="Message" className={`${field} sm:col-span-2`} />
      <button
        type="submit"
        disabled={loading}
        className="btn-gold rounded-sm px-8 py-3 text-xs uppercase tracking-[0.25em] disabled:opacity-60 sm:col-span-2"
      >
        {loading ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
