import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut, UserRound, User, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ChapterProfile } from "@/lib/academy/useChapterProgress";
import { useT } from "@/lib/i18n";

/** Header account affordance: sign-in CTA for guests, identity menu (with logout) for members. */
export function AcademyAccountButton({
  signedIn,
  profile,
  onOpenDashboard,
}: {
  signedIn: boolean;
  profile: ChapterProfile | null;
  onOpenDashboard?: () => void;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const t = useT();

  if (!signedIn) {
    return (
      <Link
        to="/auth"
        search={{ redirect: "/academy/analyse-fondamentale" }}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-forge/50 hover:bg-surface-2"
      >
        <LogIn className="h-4 w-4 text-forge" />
        <span className="hidden sm:inline">{t.account.signIn}</span>
      </Link>
    );
  }

  const label = profile?.display_name || profile?.username || profile?.email?.split("@")[0] || t.account.defaultLabel;
  const initial = label.charAt(0).toUpperCase();

  // Sign-out hygiene: cancel in-flight → clear cache → sign out → replace-navigate.
  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: "/academy/analyse-fondamentale" }, replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm font-medium text-foreground outline-none transition-colors hover:border-data/50 hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ring"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-foreground">{label}</span>
          {profile?.email && <span className="truncate text-xs font-normal text-muted-foreground">{profile.email}</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onOpenDashboard && (
          <DropdownMenuItem onSelect={() => onOpenDashboard()}>
            <BarChart3 className="h-4 w-4" />
            {t.account.myProgress}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/auth" search={{ redirect: "/academy/analyse-fondamentale" }}>
            <User className="h-4 w-4" />
            {t.account.myAccount}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void handleSignOut()} className="text-bear focus:text-bear">
          <LogOut className="h-4 w-4" />
          {t.account.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
