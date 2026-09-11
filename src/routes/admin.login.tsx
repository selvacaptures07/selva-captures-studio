import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Login — Selva Captures" },
      { name: "description", content: "Secure admin login for Selva Captures enquiry management." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login — Selva Captures" },
      { property: "og:description", content: "Admin access only." },
    ],
  }),
  component: AdminLogin,
});

const field =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function afterAuth() {
    // Grants the admin role to the very first account; afterwards it only checks.
    const { data: isAdmin } = await supabase.rpc("claim_admin");
    if (!isAdmin) {
      await supabase.auth.signOut();
      toast.error("This account does not have admin access.");
      return;
    }
    navigate({ to: "/admin/dashboard", replace: true });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await afterAuth();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-sm border border-border bg-card/50 p-8 text-center">
        <img src={logo} alt="Selva Captures logo" width={64} height={64} className="mx-auto h-16 w-16" />
        <h1 className="mt-5 font-display text-2xl text-gradient-gold">Admin Login</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selva Captures</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full rounded-sm px-6 py-3 text-xs uppercase tracking-[0.25em] disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "signin" ? "Login" : "Create Admin Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 text-xs uppercase tracking-[0.2em] text-gold hover:opacity-80"
        >
          {mode === "signin" ? "First time? Create admin account" : "Back to login"}
        </button>

        <div className="mt-6">
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
