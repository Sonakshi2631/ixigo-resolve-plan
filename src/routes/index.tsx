import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Sparkles, TrainFront, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/ixigo/Header";
import { Pill } from "@/components/ixigo/pills";
import { HonestyNote } from "@/components/ixigo/HonestyNote";
import { SmartAlternativesSheet } from "@/components/ixigo/SmartAlternativesSheet";
import { inr, preferredTrain } from "@/lib/ixigo-data";

const title = "ixigo Trains — Waitlisted? Get an Instant Travel Plan B";
const description =
  "New Delhi to Mumbai Central sold out? Compare confirmed trains, train+bus combos and protected waitlist options with honest confirmation predictions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen pb-10">
      <Header />

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold text-muted-foreground">
            1 train matches your search
          </h1>
          <Pill tone="caution">Peak date demand</Pill>
        </div>

        {/* Preferred train — the problem state */}
        <section className="card-surface rise-in border border-border/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-base font-bold">
                <TrainFront className="size-4 text-primary" />
                {preferredTrain.name}
              </p>
              <p className="text-xs text-muted-foreground">
                #{preferredTrain.number} · Runs today · {preferredTrain.cls}
              </p>
            </div>
            <p className="shrink-0 text-lg font-extrabold">{inr(preferredTrain.fare)}</p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div>
              <p className="text-xl font-extrabold leading-none">{preferredTrain.departure}</p>
              <p className="mt-1 text-xs text-muted-foreground">NDLS · New Delhi</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-[11px] font-semibold text-muted-foreground">
                {preferredTrain.duration}
              </p>
              <div className="my-1 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="h-px flex-1 bg-border" />
                <ArrowRight className="size-3 text-muted-foreground" />
              </div>
              <p className="text-[11px] text-muted-foreground">Next day arrival</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-extrabold leading-none">{preferredTrain.arrival}</p>
              <p className="mt-1 text-xs text-muted-foreground">MMCT · Mumbai Central</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-caution-foreground/20 bg-caution p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-caution-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-caution-foreground">
                  No confirmed seats · {preferredTrain.status}
                </p>
                <p className="mt-0.5 text-xs text-caution-foreground/80">
                  3A is fully waitlisted for this date.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <Pill tone="caution">
                    <Sparkles className="size-3.5" />
                    ixigo Prediction: {preferredTrain.chance}% Confirmation Chance (Low)
                  </Pill>
                </div>
                <Progress value={preferredTrain.chance} className="mt-2 h-1.5" />
                <div className="mt-2">
                  <HonestyNote />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero friction resolver */}
        <section className="rise-in stagger-1 overflow-hidden rounded-2xl border border-primary/25 bg-card shadow-float">
          <div className="bg-accent px-4 py-3">
            <p className="inline-flex items-center gap-2 text-base font-extrabold text-accent-foreground">
              <Zap className="size-4" />
              Instant Travel Plan B — Don't risk your trip!
            </p>
          </div>
          <div className="space-y-3 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Compare realistic alternatives with guaranteed seats or multi-modal options. No
              pressure — just what's actually available for your date.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Pill tone="success">Confirmed train nearby</Pill>
              <Pill tone="info">Train + bus combo</Pill>
              <Pill tone="caution">Protected waitlist</Pill>
            </div>
            <Button
              size="lg"
              className="h-12 w-full rounded-xl text-sm font-bold shadow-cta"
              onClick={() => setOpen(true)}
            >
              View Smart Alternatives (3 Ready Options)
            </Button>
          </div>
        </section>
      </main>

      <SmartAlternativesSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
