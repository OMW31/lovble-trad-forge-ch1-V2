import { Link } from "@tanstack/react-router";
import { LogIn, UserRound } from "lucide-react";
import type { ChapterProfile } from "@/lib/academy/useChapterProgress";

/** Header account affordance: sign-in CTA for guests, identity chip for members. */
export function AcademyAccountButton({
  signedIn,
  profile,
}: {
  signedIn: boolean;
  profile: ChapterProfile | null;
}) {
  if (!signedIn) {
    return (
      <Link
        to="/auth"
        search={{ redirect: "/academy/analyse-fondamentale" }}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-forge/50 hover:bg-surface-2"
      >
        <LogIn className="h-4 w-4 text-forge" />
        <span className="hidden sm:inline">Se connecter</span>
      </Link>
    );
  }

  const label = profile?.display_name || profile?.username || profile?.email?.split("@")[0] || "Mon compte";
  const initial = label.charAt(0).toUpperCase();

  return (
    <Link
      to="/auth"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-data/50 hover:bg-surface-2"
      title={label}
    >
      {profile?.avatar_url ? (
        <img src={profile.avatar_url} alt={label} className="h-6 w-6 rounded-full object-cover" />
      ) : (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-forge text-[11px] font-bold text-forge-foreground">
          {initial || <UserRound className="h-3.5 w-3.5" />}
        </span>
      )}
      <span className="hidden max-w-[120px] truncate sm:inline">{label}</span>
    </Link>
  );
}
