import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Audiences } from "@/components/landing/audiences";
import { ProviderJourney } from "@/components/landing/provider-journey";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { fetchPlans } from "@/lib/plans";

/**
 * The marketing page.
 *
 * It does not read the session, and deliberately so: the dashboard lives on a
 * separate hostname, which browsers treat as a separate site, so its cookie
 * never reaches here. Rather than always rendering a signed-out header while
 * pretending to know better, the header simply offers the way in.
 *
 * Rendered per request because the language is a cookie; the plan list it shows
 * is cached separately, in `fetchPlans`.
 */
export default async function HomePage() {
  const [plans, locale, t] = await Promise.all([fetchPlans(), getLocale(), getDictionary()]);

  return (
    <>
      <SiteHeader locale={locale} t={t.nav} />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Audiences />
        <ProviderJourney />
        <Features />
        <Pricing plans={plans} />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
