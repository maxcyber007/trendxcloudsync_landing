import { fetchLanding } from "@/lib/plans";

export const dynamic = "force-dynamic";

/**
 * The price series, for the browser to refresh from.
 *
 * It exists so the chart can poll without knowing where the API lives. The
 * backend's address is server-side configuration and stays that way; this
 * origin is the only one the browser ever talks to.
 *
 * The work behind it is cached twice over — thirty seconds in this fetch and
 * thirty more in the backend — so polling costs the broker nothing per visitor.
 */
export async function GET() {
  const { market } = await fetchLanding();

  return Response.json(
    { symbol: market?.symbol ?? null, candles: market?.candles ?? [] },
    // Whatever a CDN in front of this might otherwise decide.
    { headers: { "Cache-Control": "public, max-age=15, s-maxage=15" } },
  );
}
