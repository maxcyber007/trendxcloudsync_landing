import type { NextConfig } from "next";

/**
 * The marketing site.
 *
 * It reads one public endpoint on the server and links onward to the dashboard
 * and the API. Nothing here runs a fetch from the browser, so `connect-src` can
 * stay closed — there is no cross-origin request for it to permit.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";

    // Next injects inline bootstrap scripts and styles, so those two sources
    // are unavoidable without nonce plumbing; everything else is locked to the
    // origin. No third-party script, frame or connection is permitted.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      // The sign-in and register buttons post nowhere — they are links — but a
      // form on this origin should still only ever submit to this origin.
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      ...(isProduction ? ["upgrade-insecure-requests"] : []),
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          ...(isProduction
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
