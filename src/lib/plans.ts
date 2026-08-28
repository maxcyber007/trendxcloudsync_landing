import "server-only";
import { apiBaseUrl } from "./config";
import type { PublicPlan } from "@/components/landing/pricing";

/** What the platform has done, when there is enough of it to quote. */
export type PlatformStats = {
  copiedTrades: number;
  medianLatencyMs: number;
  activeStrategies: number;
};

/** One real copy, delayed a day before the API will show it. */
export type PublicCopy = { symbol: string; side: string; latencyMs: number };

/** A live price series from the broker feed the platform trades on. */
export type MarketPreview = {
  symbol: string;
  candles: { time: number; open: number; high: number; low: number; close: number }[];
};

/** The API's envelope, as far as this page cares about it. */
type LandingResponse =
  | {
      ok: true;
      data: {
        plans: PublicPlan[];
        stats: PlatformStats | null;
        recentCopies: PublicCopy[];
        market: MarketPreview | null;
      };
    }
  | { ok: false };

/**
 * The plans advertised on the pricing section.
 *
 * They come from the API rather than a constant here so the page can never
 * advertise a plan that does not exist, or a price that has since changed.
 *
 * Two deliberate choices:
 *
 *  - Cached for five minutes. Plans change rarely, and a marketing page that
 *    called across the internet on every visit would put its traffic straight
 *    onto the trading backend.
 *  - An unreachable API returns an empty list rather than throwing. The rest of
 *    the page is worth showing on its own; a pricing table that is briefly
 *    empty is better than a marketing site that is down because a backend is.
 */
type Landing = {
  plans: PublicPlan[];
  stats: PlatformStats | null;
  recentCopies: PublicCopy[];
  market: MarketPreview | null;
};

const NOTHING: Landing = { plans: [], stats: null, recentCopies: [], market: null };

export async function fetchLanding(): Promise<Landing> {
  try {
    const response = await fetch(`${apiBaseUrl()}/api/page-data/landing`, {
      // Short, because the price series inside this response is the point of
      // the chart. Plans change rarely and are happy to be this fresh.
      next: { revalidate: 30 },
    });
    if (!response.ok) return NOTHING;

    const body = (await response.json()) as LandingResponse;
    if (!body.ok) return NOTHING;

    return {
      plans: body.data.plans,
      stats: body.data.stats,
      // An older API that does not send them yet is not an error here.
      recentCopies: body.data.recentCopies ?? [],
      market: body.data.market ?? null,
    };
  } catch {
    return NOTHING;
  }
}

export async function fetchPlans(): Promise<PublicPlan[]> {
  return (await fetchLanding()).plans;
}
