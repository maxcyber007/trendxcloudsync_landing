import Image from "next/image";
import { Activity, Bot, Gauge, ShieldCheck } from "lucide-react";
import { CandlestickChart } from "./candlestick-chart";
import { getDictionary } from "@/lib/i18n/server";
import { dashboardPreview } from "@/lib/config";
import { fetchLanding } from "@/lib/plans";

/**
 * The hero's product visual.
 *
 * The figures come from the platform's own record once there is enough of one
 * to mean anything — a median drawn from a handful of trades is noise wearing
 * the clothes of a measurement. Until then the cards carry illustrative ones
 * and say so underneath.
 *
 * Illustrative is not the same as invented. The card used to read 142 ms
 * against a measured 700-850 ms: a page understating its own latency by five
 * to ten times, to people deciding whether to trust it with a trading account.
 * The stand-in figures now sit where the measurements do, so the page is never
 * promising something the platform cannot do.
 *
 * The feed beneath them shows real copies once there are any old enough to
 * publish, and a drawing labelled as one until then. Old enough matters: what
 * the platform is copying right now is the signal itself, and publishing it
 * live would hand a provider's product out on their own shopfront.
 */

/**
 * Stands in until the platform has copies old enough to publish.
 *
 * Shapes, not evidence: no figure here claims to have happened, and the panel
 * says so on the page when it is what is being shown.
 */
const drawn = [
  { symbol: "XAUUSD", side: "BUY", lot: "0.05" },
  { symbol: "EURUSD", side: "SELL", lot: "0.10" },
  { symbol: "US30", side: "BUY", lot: "0.02" },
  { symbol: "GBPJPY", side: "SELL", lot: "0.04" },
];

/**
 * What the cards show before the platform has a record of its own.
 *
 * Illustrative, and the panel says so — but chosen to match what was actually
 * measured rather than invented to flatter. The card it replaces read 142 ms
 * against a measured 700-850 ms, which is a performance claim to prospective
 * customers that the platform could not meet.
 */
const EXAMPLE_LATENCY_MS = 820;
const EXAMPLE_COPIES = "1,240";

export async function AiConsole() {
  // Both reads are cached for five minutes by the same fetch, so asking here
  // rather than threading props through the hero costs nothing.
  const [t, { stats, recentCopies, market }] = await Promise.all([getDictionary(), fetchLanding()]);
  const preview = dashboardPreview();

  const metrics = [
    {
      icon: Gauge,
      label: t.console.latency,
      value: `${stats ? stats.medianLatencyMs : EXAMPLE_LATENCY_MS} ms`,
      hint: stats ? t.console.latencyHint : t.console.latencyPending,
    },
    {
      icon: Activity,
      label: t.console.copies,
      value: stats ? stats.copiedTrades.toLocaleString() : EXAMPLE_COPIES,
      hint: stats ? t.console.copiesHint : t.console.copiesPending,
    },
    { icon: ShieldCheck, label: t.console.risk, value: t.console.riskValue, hint: t.console.riskHint },
  ];

  // Real copies when the platform has any old enough to publish, the drawing
  // otherwise. The trailing figure differs on purpose: a real row can say how
  // long it took, a drawn one has no business quoting a number.
  const real = recentCopies.length > 0;
  const rows = real
    ? recentCopies.map((copy) => ({
        symbol: copy.symbol,
        side: copy.side,
        trailing: `${copy.latencyMs} ms`,
      }))
    : drawn.map((row) => ({ symbol: row.symbol, side: row.side, trailing: row.lot }));

  return (
    <div className="glass-panel hud-frame overflow-hidden rounded-2xl">
      {/* console chrome */}
      <div
        className="flex flex-wrap items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--panel-border)", background: "color-mix(in srgb, var(--bg-deep) 70%, transparent)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />

        <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-muted">
          <Bot className="h-3.5 w-3.5" style={{ color: "var(--ai-cyan)" }} />
          {/* Only the drawing calls itself an example. A real screenshot beside
              real figures is not one, and should not apologise for itself. */}
          {preview && stats ? t.console.title : t.console.titleIllustrative}
        </span>

        <span
          className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ background: "color-mix(in srgb, var(--candle-up) 14%, transparent)", color: "var(--candle-up)" }}
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
          {t.console.copying}
        </span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.5fr_1fr]">
        {preview ? (
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ border: "1px solid var(--panel-border)" }}
          >
            {/* Intrinsic size unknown — it is whatever was dropped in — so the
                frame sets the aspect and the image covers it. */}
            <Image
              src={preview}
              alt={t.console.previewAlt}
              width={1600}
              height={1000}
              className="h-full w-full object-cover object-left-top"
              // The first thing a visitor sees, so it is not lazily loaded.
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>
        ) : (
          <CandlestickChart
            labels={{ live: t.console.live, still: t.console.still, chartLabel: t.console.chartLabel }}
            series={market?.candles}
          />
        )}

        <div className="flex flex-col gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl px-3.5 py-3"
              style={{ background: "var(--bg)", border: "1px solid var(--panel-border)" }}
            >
              <div className="flex items-center gap-2">
                <m.icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--gold)" }} />
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{m.label}</p>
                <p className="ml-auto text-right text-sm font-semibold tabular-nums">{m.value}</p>
              </div>
              <p className="mt-1 text-[11px] text-muted">{m.hint}</p>
            </div>
          ))}

          <div
            className="flex-1 rounded-xl px-3.5 py-3"
            style={{ background: "var(--bg)", border: "1px solid var(--panel-border)" }}
          >
            <div className="flex items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{t.console.feed}</p>
              {/* Said out loud rather than left to a code comment nobody reads,
                  and only while there is nothing real to show. */}
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                style={{ border: "1px solid var(--panel-border)", color: "var(--text-muted)" }}
              >
                {real ? t.console.feedDelayed : t.console.feedIllustrative}
              </span>
            </div>

            <ul className="mt-2.5 space-y-2.5">
              {rows.map((row, index) => {
                const buy = row.side.startsWith("BUY");
                return (
                  <li key={`${row.symbol}-${index}`} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--candle-up)" }}
                    />
                    <span className="font-medium">{row.symbol}</span>
                    <span
                      className="font-medium"
                      style={{ color: buy ? "var(--candle-up)" : "var(--candle-down)" }}
                    >
                      {row.side}
                    </span>
                    <span className="ml-auto text-muted tabular-nums">{row.trailing}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
