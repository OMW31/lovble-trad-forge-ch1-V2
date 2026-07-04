import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function VisualLightbox({
  src,
  alt,
  label,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
}) {
  const title = label ?? alt;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn("group relative block w-full overflow-hidden rounded-xl border bg-surface text-left premium-hover", className)}
          aria-label={`Agrandir ${title}`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={cn("aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", imageClassName)}
          />
          <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-background/75 text-foreground backdrop-blur-md">
            <Maximize2 className="h-4 w-4" />
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent px-3 pb-3 pt-10 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-hidden border-border bg-background p-0">
        <DialogHeader className="border-b border-border px-5 py-4 text-left">
          <DialogTitle className="font-display text-lg text-foreground">{title}</DialogTitle>
          <DialogDescription>Visualisation agrandie du chapitre.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[78vh] overflow-auto bg-gradient-surface p-3 sm:p-5">
          <img src={src} alt={alt} className="mx-auto h-auto max-h-[72vh] w-auto max-w-full rounded-xl border border-border object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
