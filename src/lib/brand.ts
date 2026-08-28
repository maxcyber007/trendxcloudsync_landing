/**
 * The product's name, in one place.
 *
 * It was spelled out in eight files — three wordmarks, two layouts, the page
 * metadata and two email templates — so renaming it meant finding all eight and
 * missing one. Everything user-facing reads it from here instead.
 */
export const BRAND = {
  /** Full name, for titles, emails and anywhere prose refers to the product. */
  name: "TrendX CloudSync",
  /** The wordmark, split so the second half can carry the gold accent. */
  wordmark: { lead: "TrendX", accent: "CloudSync" },
  tagline: "Cloud copy trading for MetaTrader 4 and MetaTrader 5. No VPS, no EA installation.",
} as const;
