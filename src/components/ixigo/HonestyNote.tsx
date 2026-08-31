import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HONESTY_NOTE } from "@/lib/ixigo-data";

export function HonestyNote({ label = "How we predict" }: { label?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline decoration-dotted underline-offset-4"
        >
          <Info className="size-3.5" />
          {label}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 text-xs leading-relaxed">{HONESTY_NOTE}</TooltipContent>
    </Tooltip>
  );
}
