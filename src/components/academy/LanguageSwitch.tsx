import { Languages } from "lucide-react";
import { LOCALES, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5", className)}
      role="group"
      aria-label={t.nav.language}
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={cn(
            "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
            locale === l.code
              ? "bg-forge/15 text-forge"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
