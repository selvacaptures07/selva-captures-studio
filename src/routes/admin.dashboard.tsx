import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  service: string | null;
  message: string | null;
  created_at: string;
};

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Selva Captures" },
      { name: "description", content: "Manage customer enquiries for Selva Captures." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Selva Captures" },
      { property: "og:description", content: "Admin access only." },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });
    if (!isAdmin) throw redirect({ to: "/admin/login" });
    return { user: data.user };
  },
  component: Dashboard,
});

const field =
  "w-full rounded-sm border border-input bg-background/60 px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";

function Dashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Enquiry | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Could not load enquiries");
      return;
    }
    setRows((data ?? []) as Enquiry[]);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed");
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Enquiry deleted");
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const { id, created_at: _created, ...rest } = editing;
    const { error } = await supabase.from("enquiries").update(rest).eq("id", id);
    if (error) {
      toast.error("Update failed");
      return;
    }
    setRows((r) => r.map((x) => (x.id === id ? editing : x)));
    setEditing(null);
    toast.success("Enquiry updated");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl text-gradient-gold">Customer Enquiries</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selva Captures Admin</p>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="btn-outline-gold rounded-sm px-5 py-2 text-xs uppercase tracking-[0.2em]">
            Website
          </Link>
          <button onClick={signOut} className="btn-gold rounded-sm px-5 py-2 text-xs uppercase tracking-[0.2em]">
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">No enquiries yet.</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {rows.map((r) => (
            <article key={r.id} className="rounded-sm border border-border bg-card/50 p-6">
              {editing?.id === r.id ? (
                <form onSubmit={onSave} className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["name", "Name"],
                      ["phone", "Phone"],
                      ["email", "Email"],
                      ["event_type", "Event Type"],
                      ["event_date", "Event Date"],
                      ["event_location", "Location"],
                      ["service", "Service"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {label}
                      <input
                        className={`${field} mt-1`}
                        value={editing[key] ?? ""}
                        onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      />
                    </label>
                  ))}
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground sm:col-span-2">
                    Message
                    <textarea
                      rows={3}
                      className={`${field} mt-1`}
                      value={editing.message ?? ""}
                      onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                    />
                  </label>
                  <div className="flex gap-3 sm:col-span-2">
                    <button type="submit" className="btn-gold rounded-sm px-6 py-2 text-xs uppercase tracking-[0.2em]">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="btn-outline-gold rounded-sm px-6 py-2 text-xs uppercase tracking-[0.2em]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-xl text-gold">{r.name}</h2>
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <Row label="Phone" value={r.phone} />
                    <Row label="Email" value={r.email} />
                    <Row label="Event Type" value={r.event_type} />
                    <Row label="Event Date" value={r.event_date} />
                    <Row label="Location" value={r.event_location} />
                    <Row label="Service" value={r.service} />
                  </dl>
                  {r.message && <p className="mt-4 text-sm text-muted-foreground">{r.message}</p>}
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setEditing(r)}
                      className="btn-outline-gold rounded-sm px-5 py-2 text-xs uppercase tracking-[0.2em]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="rounded-sm border border-destructive/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value || "—"}</dd>
    </div>
  );
}
