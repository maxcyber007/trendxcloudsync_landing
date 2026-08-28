/**
 * Where the other two halves of the product live.
 *
 * This deployment is the marketing site and nothing else. It holds no session,
 * no database and no secrets: it reads the public plan list on the server and
 * links people onward to the dashboard, which is deployed separately.
 *
 * Nothing here is fetched from the browser — the only address the browser needs
 * is the dashboard's, and it needs it to follow a link, not to make a request.
 * That one is read as a literal `process.env.NEXT_PUBLIC_…` expression, the
 * only form Next.js substitutes into a client bundle.
 */

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

/** Blank counts as unset: a platform passes an empty field through as `""`. */
const set = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

/**
 * A link into the dashboard — signing in, registering, applying as a provider.
 *
 * Falls back to a relative path when unset, so the whole site still works when
 * both halves are served from one origin during development.
 */
export function appUrl(path: string): string {
  const base = set(process.env.NEXT_PUBLIC_DASHBOARD_URL);
  return base ? `${stripTrailingSlash(base)}${path}` : path;
}

/**
 * A screenshot of the real dashboard, if one has been supplied.
 *
 * Set `NEXT_PUBLIC_DASHBOARD_PREVIEW` to a path under `public/` — for example
 * `/dashboard-preview.png` — and the product section shows it in place of the
 * schematic chart. Unset, the schematic stands, which is the honest default:
 * an image referenced but missing would render as a broken frame on the first
 * thing a visitor sees.
 *
 * Whatever is put there is public forever. Account numbers and balances have to
 * be out of the frame before it goes in.
 */
export function dashboardPreview(): string | undefined {
  const value = set(process.env.NEXT_PUBLIC_DASHBOARD_PREVIEW);

  // A path under `public/`, nothing else. An address on another host would need
  // `images.remotePatterns` and would otherwise fail at request time, on the
  // hero, in production — a misconfiguration should not be able to do that.
  return value?.startsWith("/") ? value : undefined;
}

/**
 * Where this server reaches the API when rendering.
 *
 * Server-side only, so it may point somewhere the public cannot — and it is
 * read without the `NEXT_PUBLIC_` prefix so it never reaches the browser.
 */
export function apiBaseUrl(): string {
  return stripTrailingSlash(
    set(process.env.API_BASE_URL) ?? set(process.env.NEXT_PUBLIC_API_BASE_URL) ?? "http://localhost:3000",
  );
}
