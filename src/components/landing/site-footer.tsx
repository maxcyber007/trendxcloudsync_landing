import Link from "next/link";
import { Layers, Radio, TriangleAlert, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/i18n/server";
import { appUrl } from "@/lib/config";

export async function SiteFooter() {
  const t = await getDictionary();

  const columns = [
    {
      title: t.footer.platform,
      icon: Layers,
      links: [
        { href: "#how", label: t.footer.linkHow },
        { href: "#features", label: t.footer.linkFeatures },
        { href: "#pricing", label: t.footer.linkPricing },
      ],
    },
    {
      title: t.footer.providers,
      icon: Radio,
      links: [
        { href: "#providers", label: t.footer.linkProgram },
        { href: appUrl("/provider/apply"), label: t.footer.linkApply },
        { href: appUrl("/login"), label: t.footer.linkProviderSignIn },
      ],
    },
    {
      title: t.footer.account,
      icon: UserRound,
      links: [
        { href: appUrl("/register"), label: t.footer.linkCreate },
        { href: appUrl("/login"), label: t.footer.linkSignIn },
      ],
    },
  ];

  return (
    <footer className="border-t" style={{ borderColor: "var(--panel-border)", background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-[15px] font-semibold tracking-tight">
                {BRAND.wordmark.lead} <span className="text-gold">{BRAND.wordmark.accent}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.blurb}
            </p>
          </div>

          {columns.map((column) => {
            const Icon = column.icon;
            return (
              <div key={column.title}>
                {/* Wide-tracked uppercase is a Latin device: it does nothing to Thai
                    but pull the glyphs apart, and Thai reads as one connected shape.
                    Left plain, Prompt renders the way it was drawn. */}
                <p className="flex items-center gap-2 text-sm font-semibold text-gold">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted transition-colors hover:text-gold">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--panel-border)" }}
        >
          <p>© {new Date().getFullYear()} {BRAND.name}. {t.footer.rights}</p>
          <p className="flex max-w-xl items-start gap-2 leading-relaxed">
            {/* aria-hidden: the sentence beside it already carries the warning,
                and a screen reader announcing "alert" first would only delay it. */}
            <TriangleAlert
              className="animate-risk mt-0.5 h-4 w-4 shrink-0"
              style={{ color: "var(--candle-down)" }}
              aria-hidden="true"
            />
            <span>{t.footer.risk}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
