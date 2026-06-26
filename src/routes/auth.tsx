import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Mail, LockKeyhole, UserRound, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/academy/analyse-fondamentale",
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      throw redirect({ to: search.redirect as "/academy/analyse-fondamentale" | "/academy" | "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Connexion — TradForge" },
      {
        name: "description",
        content: "Connectez-vous à TradForge pour sauvegarder votre progression, vos évaluations et reprendre exactement là où vous vous êtes arrêté.",
      },
      { property: "og:title", content: "Connexion — TradForge" },
      {
        property: "og:description",
        content: "Connexion sécurisée pour activer progression, reprise exacte et évaluations persistées.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<"signin" | "signup" | "google" | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) {
        navigate({ to: search.redirect, replace: true });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [navigate, search.redirect]);

  const signIn = async () => {
    setLoading("signin");
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });
    setLoading(null);
    if (error) {
      setMessage(error.message);
      return;
    }
    navigate({ to: search.redirect, replace: true });
  };

  const signUp = async () => {
    setLoading("signup");
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          display_name: displayName,
        },
      },
    });
    setLoading(null);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Compte créé. Connectez-vous pour activer la progression synchronisée.");
  };

  const signInWithGoogle = async () => {
    setLoading("google");
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setLoading(null);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (!result.redirected) {
      navigate({ to: search.redirect, replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-hero opacity-80" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />

      <div className="relative mx-auto flex min-h-screen max-w-[1240px] flex-col px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-12">
        <section className="pb-10 lg:pb-0">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Flame className="h-5 w-5 text-forge" />
            TradForge
          </Link>

          <div className="mt-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forge/30 bg-forge/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-forge">
              <Sparkles className="h-3.5 w-3.5" />
              Lovable Cloud Sync
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Reprenez exactement <span className="text-gradient-forge">où vous vous êtes arrêté</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              La connexion active les profils, la progression persistée, les évaluations Standard / High / Premium et la synchronisation de ton état d’analyse sur le chapitre.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Profil", "display name, username, préférences"],
                ["Progression", "section, scénario, score, déblocages"],
                ["Reprise exacte", "dernier ancrage, widget, niveau"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-xl border bg-card/80 p-4 shadow-elegant backdrop-blur">
                  <div className="font-display text-base font-semibold text-foreground">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Card className="border-border/80 bg-card/95 shadow-glow backdrop-blur">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-foreground">Accès sécurisé</CardTitle>
            <CardDescription>
              Email / mot de passe et connexion Google sont prêts pour le prochain prototype.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Button onClick={signInWithGoogle} disabled={loading !== null} className="w-full bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
              <ArrowRight className="h-4 w-4" />
              {loading === "google" ? "Connexion Google..." : "Continuer avec Google"}
            </Button>

            <Tabs defaultValue="signin">
              <TabsList className="grid h-auto w-full grid-cols-2 bg-surface p-1">
                <TabsTrigger value="signin">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Créer un compte</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" type="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="analyste@tradforge.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Mot de passe</label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="••••••••" />
                  </div>
                </div>
                <Button onClick={signIn} disabled={loading !== null} className="w-full">
                  {loading === "signin" ? "Connexion..." : "Se connecter"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom affiché</label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Alex Mercer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" type="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="analyste@tradforge.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Mot de passe</label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Minimum 8 caractères" />
                  </div>
                </div>
                <Button onClick={signUp} disabled={loading !== null} className="w-full">
                  {loading === "signup" ? "Création..." : "Créer mon compte"}
                </Button>
              </TabsContent>
            </Tabs>

            {message && <div className="rounded-lg border border-border bg-surface p-3 text-sm text-muted-foreground">{message}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
