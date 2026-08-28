# TrendX Synex — marketing site

The public site at `trendxcloudsync.com`. The dashboard is a separate
application in its own repository (`copytrade_dashboard`), deployed to its own
hostname.

## What this holds, and what it does not

It holds no session, no database connection and no secrets. It renders the
marketing page, reads one public endpoint for the plan list, and links people
onward to the dashboard.

If a value in `.env` here ever looks like a credential, it is in the wrong
repository.

## The header always offers "Sign in"

It does not check whether the visitor already has a session, and shows the same
two buttons either way.

That began as a necessity: the dashboard was on a separate site, so its cookie
never reached here and there was nothing to read. Under one domain it now
would — `app.trendxcloudsync.com` and this site are same-site, and the session
cookie is scoped to `.trendxcloudsync.com`.

So this is now a choice rather than a limit. Reading the session would mean a
call to the API on every page render, on a page that is otherwise cached and
has no other reason to know who is looking. Worth adding when the header should
greet a returning member by name; not worth it to relabel one button.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_DASHBOARD_URL` | Where "Sign in", "Get started" and "Apply as a provider" point |
| `NEXT_PUBLIC_API_BASE_URL` | The API, as a visitor's browser reaches it — only for the footer's status link |
| `API_BASE_URL` | The API, as this server reaches it while rendering. Defaults to the public one; never inlined into the browser bundle |

`NEXT_PUBLIC_*` values are compiled into the bundle, so changing one requires a
rebuild, not just a restart.

## The plan list

`fetchPlans` reads `/api/page-data/landing` on the API. Two things are
deliberate there:

- **Cached for five minutes.** Plans change rarely, and a marketing page that
  called across the internet on every visit would put its traffic straight onto
  the trading backend.
- **An unreachable API yields an empty list rather than an error.** The rest of
  the page is worth showing on its own; a pricing table that is briefly empty is
  better than a marketing site that is down because a backend is.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

With the variables left empty, links stay relative and the plan list falls back
to empty — enough to work on layout and copy without any backend running.

## Deployment

Vercel, as its own project. `regions` is `sin1` (Singapore), the closest region
to the API host in Thailand — the plan fetch is the only thing that crosses the
network during a render.
