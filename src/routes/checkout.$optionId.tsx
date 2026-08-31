import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Bus,
  CheckCircle2,
  Plane,
  ShieldCheck,
  TrainFront,
  Lock,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/ixigo/Header";
import { Pill } from "@/components/ixigo/pills";
import { HonestyNote } from "@/components/ixigo/HonestyNote";
import { alternatives, inr } from "@/lib/ixigo-data";

const modeIcon = { train: TrainFront, bus: Bus, plane: Plane } as const;

export const Route = createFileRoute("/checkout/$optionId")({
  loader: ({ params }) => {
    const alt = alternatives.find((a) => a.id === params.optionId);
    if (!alt) throw notFound();
    return { alt };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    const title = `Checkout · ${loaderData.alt.kind} — ixigo Trains`;
    const description = `Review and pay for your resolved travel plan: ${loaderData.alt.title}, ${loaderData.alt.subtitle}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Checkout,
});

function Checkout() {
  const { alt } = Route.useLoaderData();
  const [zeroCancel, setZeroCancel] = useState(true);
  const [paid, setPaid] = useState(false);

  const fare = alt.price;
  const taxes = Math.round(fare * 0.05);
  const protection = alt.extraFee?.amount ?? 0;
  const zc = zeroCancel ? 99 : 0;
  const total = fare + taxes + protection + zc;

  return (
    <div className="min-h-screen pb-28">
      <Header back />

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-4">
        <section className="card-surface rise-in border border-border/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Pill tone={alt.certainty === "guaranteed" ? "success" : "info"}>
                <ShieldCheck className="size-3.5" />
                {alt.certainty === "guaranteed" ? "100% Guaranteed" : "ixigo Assured Protection"}
              </Pill>
              <h1 className="mt-2 text-base font-extrabold leading-tight">{alt.title}</h1>
              <p className="text-xs text-muted-foreground">{alt.subtitle}</p>
            </div>
          </div>

          <ol className="mt-4 space-y-3">
            {alt.legs.map((leg) => {
              const Icon = modeIcon[leg.mode];
              return (
                <li key={leg.title} className="flex gap-3 rounded-xl bg-secondary/70 p-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-card text-primary">
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

          <div className="mt-4 flex flex-wrap gap-1.5">
            {alt.tradeoffs.map((t) => (
              <Pill key={t.label} tone={t.tone}>
                {t.label}
              </Pill>
            ))}
          </div>
          {alt.certainty === "protected" && (
            <div className="mt-3 rounded-xl bg-caution p-3 text-xs leading-relaxed text-caution-foreground">
              {alt.valueNote}
              <div className="mt-2">
                <HonestyNote />
              </div>
            </div>
          )}
        </section>

        <section className="card-surface rise-in stagger-1 border border-border/70 p-4">
          <h2 className="text-sm font-bold">Price breakdown</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Base fare" value={inr(fare)} />
            <Row label="Taxes & convenience" value={inr(taxes)} />
            {protection > 0 && <Row label={alt.extraFee!.label} value={inr(protection)} />}
            {zeroCancel && <Row label="Zero Cancellation add-on" value={inr(99)} />}
            <div className="border-t border-border pt-2">
              <Row label="Total payable" value={inr(total)} bold />
            </div>
          </dl>

          <label className="mt-4 flex items-start justify-between gap-3 rounded-xl bg-secondary/70 p-3">
            <span>
              <span className="block text-sm font-semibold">Zero Cancellation</span>
              <span className="block text-xs text-muted-foreground">
                Full refund of fare if you cancel before departure. Optional.
              </span>
            </span>
            <Switch checked={zeroCancel} onCheckedChange={setZeroCancel} />
          </label>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-lg font-extrabold leading-none">{inr(total)}</p>
            <p className="text-[11px] text-muted-foreground">incl. all taxes & add-ons</p>
          </div>
          <Button
            size="lg"
            className="h-12 flex-1 rounded-xl text-sm font-bold shadow-cta"
            onClick={() => setPaid(true)}
          >
            <Lock className="size-4" /> Proceed to Pay
          </Button>
        </div>
      </div>

      {paid && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm">
          <div className="rise-in w-full max-w-sm rounded-2xl bg-card p-6 text-center shadow-float">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-success text-success-foreground">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-4 text-lg font-extrabold">Travel Plan Resolved!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You're 100% set to travel. Booking details and both leg tickets are on their way to
              your ixigo trips.
            </p>
            <Pill tone="success" className="mt-3">
              <PartyPopper className="size-3.5" /> {alt.kind} confirmed
            </Pill>
            <div className="mt-5 space-y-2">
              <Button asChild size="lg" className="h-11 w-full rounded-xl shadow-cta">
                <Link to="/">Back to trains</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-xl"
                onClick={() => setPaid(false)}
              >
                Review plan again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? "font-bold" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "font-extrabold" : "font-semibold"}>{value}</dd>
    </div>
  );
}
