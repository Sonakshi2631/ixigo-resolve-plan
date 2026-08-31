import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Gauge, IndianRupee, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { alternatives, type Alternative } from "@/lib/ixigo-data";
import { AlternativeCard } from "./AlternativeCard";
import { HonestyNote } from "./HonestyNote";
import { cn } from "@/lib/utils";

type SortKey = "speed" | "value" | "certainty";

const sorts: { key: SortKey; label: string; icon: typeof Gauge }[] = [
  { key: "speed", label: "Speed", icon: Gauge },
  { key: "value", label: "Best Value", icon: IndianRupee },
  { key: "certainty", label: "Highest Certainty", icon: ShieldCheck },
];

export function SmartAlternativesSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [sort, setSort] = useState<SortKey>("certainty");
  const navigate = useNavigate();

  const list = useMemo(() => {
    const copy = [...alternatives];
    if (sort === "speed") return copy.sort((a, b) => a.arrivalMinutes - b.arrivalMinutes);
    if (sort === "value")
      return copy.sort(
        (a, b) => a.price + (a.extraFee?.amount ?? 0) - (b.price + (b.extraFee?.amount ?? 0)),
      );
    return copy.sort((a, b) => b.certaintyScore - a.certaintyScore);
  }, [sort]);

  const onSelect = (alt: Alternative) =>
    navigate({ to: "/checkout/$optionId", params: { optionId: alt.id } });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-2xl">
        <DialogHeader className="space-y-1 border-b border-border/70 px-4 py-4 text-left">
          <DialogTitle className="text-lg font-extrabold">Smart Alternate Travel Plan</DialogTitle>
          <DialogDescription className="text-xs">
            Three realistic ways to still travel on {""}
            <span className="font-semibold text-foreground">Fri, 18 Sep</span> — compare the
            trade-offs, then pick what fits you.
          </DialogDescription>
        </DialogHeader>

        <div className="sticky top-0 z-10 bg-card/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5 rounded-full bg-secondary p-1">
              {sorts.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                    sort === s.key
                      ? "bg-card text-primary shadow-card"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <s.icon className="size-3.5" />
                  {s.label}
                </button>
              ))}
            </div>
            <HonestyNote label="Honesty" />
          </div>
        </div>

        <div key={sort} className="space-y-3 px-4 pb-6">
          {list.map((alt, i) => (
            <AlternativeCard key={alt.id} alt={alt} index={i} onSelect={onSelect} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
