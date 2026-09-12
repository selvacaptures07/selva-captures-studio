import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GalleryImage, SitePackage, SiteSettings } from "@/lib/site-content";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  service: string | null;
  selected_package: string | null;
  message: string | null;
  created_at: string;
};

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Selva Captures" },
      { name: "description", content: "Manage Selva Captures enquiries and website details." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Selva Captures" },
      { property: "og:description", content: "Admin access only." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
    if (!isAdmin) throw redirect({ to: "/admin/login" });
    return { user: data.user };
  },
  component: Dashboard,
});

const field = "w-full rounded-sm border border-input bg-background/60 px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";
const label = "text-xs uppercase tracking-[0.15em] text-muted-foreground";

function Dashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [packages, setPackages] = useState<SitePackage[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [editing, setEditing] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    const [enquiriesResult, packagesResult, galleryResult, settingsResult] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("packages").select("*").order("display_order"),
      supabase.from("gallery_images").select("*").order("display_order"),
      supabase.from("site_settings").select("*").eq("id", "main").single(),
    ]);
    setLoading(false);
    if (enquiriesResult.error || packagesResult.error || galleryResult.error || settingsResult.error) {
      toast.error("Could not load dashboard details");
      return;
    }
    setRows(enquiriesResult.data ?? []);
    setPackages(packagesResult.data ?? []);
    setSettings(settingsResult.data);
    const resolved = await Promise.all(
      (galleryResult.data ?? []).map(async (image) => {
        if (!image.storage_path) return { ...image, resolved_url: image.image_url };
        const { data } = await supabase.storage.from("gallery").createSignedUrl(image.storage_path, 3600);
        return { ...image, resolved_url: data?.signedUrl ?? image.image_url };
      }),
    );
    setGallery(resolved);
  }

  useEffect(() => { void load(); }, []);

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    const digits = settings.whatsapp.replace(/\D/g, "");
    const phoneDigits = settings.phone.replace(/\D/g, "");
    const { error } = await supabase.from("site_settings").update({
      phone: settings.phone,
      phone_raw: `+${phoneDigits}`,
      whatsapp: digits,
      updated_at: new Date().toISOString(),
    }).eq("id", "main");
    if (error) {
      toast.error("Contact update failed");
      return;
    }
    setSettings({ ...settings, phone_raw: `+${phoneDigits}`, whatsapp: digits });
    toast.success("Contact details updated");
  }

  async function savePackage(item: SitePackage) {
    const { error } = await supabase.from("packages").update({
      name: item.name,
      price: item.price,
      original_price: item.original_price || null,
      updated_at: new Date().toISOString(),
    }).eq("id", item.id);
    if (error) {
      toast.error("Package update failed");
      return;
    }
    toast.success("Package updated");
  }

  async function uploadGallery(file: File, replace?: GalleryImage) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
    if (uploadError) {
      setUploading(false);
      toast.error("Image upload failed");
      return;
    }
    const payload = { image_url: path, storage_path: path, alt_text: replace?.alt_text ?? "Selva Captures wedding photography" };
    const result = replace
      ? await supabase.from("gallery_images").update(payload).eq("id", replace.id)
      : await supabase.from("gallery_images").insert({ ...payload, display_order: gallery.length + 1 });
    if (result.error) {
      await supabase.storage.from("gallery").remove([path]);
      setUploading(false);
      toast.error("Gallery update failed");
      return;
    }
    if (replace?.storage_path) await supabase.storage.from("gallery").remove([replace.storage_path]);
    setUploading(false);
    toast.success(replace ? "Gallery image replaced" : "Gallery image added");
    await load();
  }

  async function deleteGallery(image: GalleryImage) {
    if (!confirm("Remove this gallery image?")) return;
    const { error } = await supabase.from("gallery_images").delete().eq("id", image.id);
    if (error) {
      toast.error("Image could not be removed");
      return;
    }
    if (image.storage_path) await supabase.storage.from("gallery").remove([image.storage_path]);
    setGallery((items) => items.filter((item) => item.id !== image.id));
    toast.success("Gallery image removed");
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed");
      return;
    }
    setRows((items) => items.filter((item) => item.id !== id));
    toast.success("Enquiry deleted");
  }

  async function saveEnquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const { id, created_at: _created, ...updates } = editing;
    const { error } = await supabase.from("enquiries").update(updates).eq("id", id);
    if (error) {
      toast.error("Update failed");
      return;
    }
    setRows((items) => items.map((item) => item.id === id ? editing : item));
    setEditing(null);
    toast.success("Enquiry updated");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  if (loading) return <p className="py-24 text-center text-sm text-muted-foreground">Loading...</p>;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl text-gradient-gold">Admin Dashboard</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selva Captures</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline"><Link to="/">Website</Link></Button>
          <Button onClick={signOut}>Log out</Button>
        </div>
      </div>

      <Tabs defaultValue="enquiries" className="mt-8">
        <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-sm border border-border bg-card/50 p-1">
          {([["enquiries", "Enquiries"], ["contact", "Contact"], ["packages", "Packages"], ["gallery", "Gallery"]] as const).map(([value, text]) => (
            <TabsTrigger key={value} value={value} className="rounded-sm px-4 py-2 uppercase tracking-[0.12em] data-[state=active]:text-gold">{text}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="enquiries" className="mt-6 grid gap-4">
          {rows.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">No enquiries yet.</p> : rows.map((row) => (
            <article key={row.id} className="rounded-sm border border-border bg-card/50 p-6">
              {editing?.id === row.id ? (
                <form onSubmit={saveEnquiry} className="grid gap-3 sm:grid-cols-2">
                  {([['name','Name'],['phone','Phone'],['email','Email'],['event_type','Event Type'],['event_date','Event Date'],['event_location','Location'],['service','Service'],['selected_package','Selected Package']] as const).map(([key, text]) => (
                    <label key={key} className={label}>{text}<input className={`${field} mt-1`} value={editing[key] ?? ""} onChange={(e) => setEditing({ ...editing, [key]: e.target.value })} /></label>
                  ))}
                  <label className={`${label} sm:col-span-2`}>Message<textarea rows={3} className={`${field} mt-1`} value={editing.message ?? ""} onChange={(e) => setEditing({ ...editing, message: e.target.value })} /></label>
                  <div className="flex gap-3 sm:col-span-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
                </form>
              ) : (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-display text-xl text-gold">{row.name}</h2><span className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString()}</span></div>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <Row label="Phone" value={row.phone} /><Row label="Email" value={row.email} /><Row label="Event Date" value={row.event_date} /><Row label="Event Type" value={row.event_type} /><Row label="Selected Package" value={row.selected_package} /><Row label="Service" value={row.service} /><Row label="Location" value={row.event_location} />
                  </dl>
                  <Row label="Message" value={row.message} className="mt-4" />
                  <div className="mt-5 flex gap-3"><Button variant="outline" onClick={() => setEditing(row)}>Edit</Button><Button variant="destructive" onClick={() => deleteEnquiry(row.id)}>Delete</Button></div>
                </>
              )}
            </article>
          ))}
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          {settings && <form onSubmit={saveSettings} className="grid max-w-2xl gap-4 rounded-sm border border-border bg-card/50 p-6 sm:grid-cols-2">
            <label className={label}>Contact Number<input className={`${field} mt-1`} value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></label>
            <label className={label}>WhatsApp Number<input className={`${field} mt-1`} value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} /></label>
            <Button type="submit" className="sm:col-span-2"><Save /> Save Contact Details</Button>
          </form>}
        </TabsContent>

        <TabsContent value="packages" className="mt-6 grid gap-4 sm:grid-cols-2">
          {packages.map((item) => <article key={item.id} className="grid gap-3 rounded-sm border border-border bg-card/50 p-5">
            <label className={label}>Package Name<input className={`${field} mt-1`} value={item.name} onChange={(e) => setPackages((items) => items.map((x) => x.id === item.id ? { ...x, name: e.target.value } : x))} /></label>
            <div className="grid grid-cols-2 gap-3"><label className={label}>Price<input className={`${field} mt-1`} value={item.price} onChange={(e) => setPackages((items) => items.map((x) => x.id === item.id ? { ...x, price: e.target.value } : x))} /></label><label className={label}>Original Price<input className={`${field} mt-1`} value={item.original_price ?? ""} onChange={(e) => setPackages((items) => items.map((x) => x.id === item.id ? { ...x, original_price: e.target.value } : x))} /></label></div>
            <Button onClick={() => savePackage(item)}><Save /> Save Package</Button>
          </article>)}
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <ImagePlus className="h-4 w-4" /> {uploading ? "Uploading..." : "Add Gallery Image"}
            <input type="file" accept="image/*" disabled={uploading} className="sr-only" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadGallery(file); e.target.value = ""; }} />
          </label>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image) => <article key={image.id} className="overflow-hidden rounded-sm border border-border bg-card/50">
              <img src={image.resolved_url} alt={image.alt_text} className="h-56 w-full object-cover" />
              <div className="flex gap-2 p-3">
                <label className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-xs font-medium hover:bg-accent">Replace<input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadGallery(file, image); e.target.value = ""; }} /></label>
                <Button variant="destructive" size="icon" aria-label="Remove image" onClick={() => deleteGallery(image)}><Trash2 /></Button>
              </div>
            </article>)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Row({ label: text, value, className = "" }: { label: string; value: string | null; className?: string }) {
  return <div className={className}><dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{text}</dt><dd className="text-foreground">{value || "—"}</dd></div>;
}