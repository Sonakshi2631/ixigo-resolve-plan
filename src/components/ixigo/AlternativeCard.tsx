import { Bus, Plane, ShieldCheck, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "./pills";
import { HonestyNote } from "./HonestyNote";
import { inr, totalOf, type Alternative } from "@/lib/ixigo-data";
import { cn } from "@/lib/utils";

const modeIcon = { train: TrainFront, bus: Bus, plane: Plane } as const;

export function AlternativeCard({
  alt,
  index,
  onSelect,
}: {
  alt: Alternative;
  index: number;
  onSelect: (alt: Alternative) => void;
}) {
  return (
    <article
      className={cn(
        "card-surface rise-in overflow-hidden border border-border/70",
        index === 1 && "stagger-1",
        index === 2 && "stagger-2",
      )}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <Pill tone={alt.certainty === "guaranteed" ? "success" : "info"}>
            {alt.certainty === "guaranteed" ? (
              <>
                <ShieldCheck className="size-3.5" /> 100% Guaranteed
              </>
            ) : (
              <>
                <ShieldCheck className="size-3.5" /> ixigo Assured
              </>
            )}
          </Pill>
          <h3 className="mt-2 text-base font-bold leading-tight">
            Option {String.fromCharCode(65 + index)} · {alt.kind}
          </h3>
          <p className="text-sm font-semibold text-foreground/90">{alt.title}</p>
          <p className="text-xs text-muted-foreground">{alt.subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-extrabold">{inr(totalOf(alt))}</p>
          {alt.extraFee ? (
            <p className="text-[11px] leading-tight text-muted-foreground">
              {inr(alt.price)} + {inr(alt.extraFee.amount)} protection
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground">all-in fare</p>
          )}
        </div>
      </div>

      <ol className="mt-3 space-y-3 px-4">
        {alt.legs.map((leg) => {
          const Icon = modeIcon[leg.mode];
          return (
            <li key={leg.title} className="flex gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{leg.title}</p>
                <p className="text-xs text-muted-foreground">{leg.detail}</p>
                <p className="mt-1 text-[11px] font-bold tracking-wide text-success-foreground">
                  {leg.status}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap gap-1.5 px-4">
        {alt.tradeoffs.map((t) => (
          <Pill key={t.label} tone={t.tone}>
            {t.label}
          </Pill>
        ))}
      </div>

      <p className="mt-3 px-4 text-xs leading-relaxed text-muted-foreground">{alt.valueNote}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 px-4 py-3">
        {alt.certainty === "protected" ? (
          <HonestyNote label="Prediction basis" />
        ) : (
          <span className="text-xs text-muted-foreground">Arrives {alt.arrival}</span>
        )}
        <Button size="lg" className="rounded-xl shadow-cta" onClick={() => onSelect(alt)}>
          {alt.cta}
        </Button>
      </div>
    </article>
  );
}
