import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Users, Ticket } from "lucide-react";
import { journey } from "@/lib/ixigo-data";

export function Header({ back }: { back?: boolean }) {
  return (
    <header className="sticky top-0 z-30 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 pt-3 pb-2">
        {back ? (
          <Link to="/" aria-label="Back to search results" className="-ml-1 p-1">
            <ArrowLeft className="size-5" />
          </Link>
        ) : (
          <span className="text-lg font-extrabold tracking-tight lowercase">ixigo</span>
        )}
        <span className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Trains
        </span>
      </div>
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold">
          <span>
            {journey.fromCity} <span className="opacity-70">({journey.fromCode})</span>
          </span>
          <ArrowRight className="size-4 opacity-80" />
          <span>
            {journey.toCity} <span className="opacity-70">({journey.toCode})</span>
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs opacity-90">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" /> {journey.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" /> {journey.travellers}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="size-3.5" /> Tatkal / {journey.quota}
          </span>
        </div>
      </div>
    </header>
  );
}
